<script setup>
    import { FilterMatchMode } from 'primevue/api';
    import { ref, onMounted, watch, onBeforeMount } from 'vue'
    import { useRoute } from 'vue-router';
    import axios from 'axios'

    const localAddress = 'http://192.168.0.117:8000' 
    const route = useRoute()
    const selectedRows = ref(null)
    const items = ref(null)
    const columns = ref(null)
    const filters = ref(null)
    const itemDialog = ref(false)
    const deleteItemDialog = ref(false)
    const deleteItemsDialog = ref(false)
    const item = ref({})
    const submitted = ref(false)
    const editing = ref(false)
    const options = ref({})

    onBeforeMount(() => {
        initFilters()
    })
    onMounted(async () => {
        await getTableData()
        await getDropdownOptions()
    })
    const initFilters = () => {
        filters.value = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS }
        };
    };
    const getTableData = async () => {
        const res = await axios.get(`${localAddress}/api/table_metadata/direct/${route.params.table}`)
        const response = res.data.content.db_rows[0].get_customized_data_with_metadata
        console.log(route.params.table, response)
        columns.value = response.columns
        items.value = response.items
    }
    watch(
        () => route.path,
        () => {
            getTableData();
        }
    );
    const openNew = () => {
        itemDialog.value = true
        item.value = {}
    }
    const editItem = (editItem) => {
        editing.value = true
        item.value = {...editItem}
        itemDialog.value = true
    }
    const confirmDeleteItem = (itemDelete) => {
        item.value = {...itemDelete}
        deleteItemDialog.value = true
    }
    const confirmDeleteSelected = () => {
        deleteItemsDialog.value = true
    }
    const deleteItem = () => {

    }
    const saveItem = async () => {
        submitted.value = true
        let valid = true
        for(let i = 0; i < columns.value.length; i++) {
            if(!item.value[columns.value[i].field]) {
                valid = false
                break
            }
        }
        if(valid) {
            if(editing.value) {

            }
            else {
                const res = await axios.post(`http://91.147.91.163:8888/api/${route.params.table}`, item.value)
                console.log(res)
                items.value.push(item)
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Item Created', life: 3000 });
            }
            submitted.value = false
            itemDialog.value = false
            item.value = {}
        }
    }
    const getDropdownOptions = async () => {
        for(let i = 0; i < columns.value.length; i++) {
            if(columns.value[i].references) {
                let res = await axios.get(`${localAddress}/api/table_metadata/direct/${columns.value[i].references}`)
                let x = res.data.content.db_rows[0].get_customized_data_with_metadata.items
                options.value[columns.value[i].field] = x
            }
        }
    }
</script>
<script>
import PvToolbar from 'primevue/toolbar';
import PvButton from 'primevue/button';
import PvDataTable from 'primevue/datatable';
import PvColumn from 'primevue/column';
import PvDialog from 'primevue/dialog';
import PvInputText from 'primevue/inputtext';
import PvDropdown from 'primevue/dropdown';
import PvCalendar from 'primevue/calendar';
import PvInputNumber from 'primevue/inputnumber';
import PvCheckbox from 'primevue/checkbox';

export default {
  components: {
    PvToolbar,
    PvButton,
    PvDataTable,
    PvColumn,
    PvDialog,
    PvInputText,
    PvDropdown,
    PvCalendar,
    PvInputNumber,
    PvCheckbox
  },
}
</script>
<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
                            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedRows || !selectedRows.length" />
                        </div>
                    </template>
                </Toolbar>
                <DataTable
                    v-model:selection="selectedRows"
                    :filters="filters"
                    :value="items"
                    :paginator="true"
                    :rows="10"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Manage Table</h5>
                            <IconField iconPosition="left" class="block mt-2 md:mt-0">
                                <InputIcon class="pi pi-search" />
                                <InputText class="w-full sm:w-auto" v-model="filters['global'].value" placeholder="Search..." />
                            </IconField>
                        </div>
                    </template>
                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column v-for="column in columns" :key="column.field" :field="column.field" :header="column.header" sortable class="item">
                        <template v-if="column.is_pk" #body="slotProps" class="item">
                            {{ slotProps.data['id'] }}
                        </template>
                        <template v-else #body="slotProps" class="item">
                            {{ slotProps.data[column.field] }}
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="editItem(slotProps.data)" />
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded @click="confirmDeleteItem(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
                <Dialog v-model:visible="itemDialog" header="Item Details" :modal="true" class="p-fluid">
                    <div class="p-fluid">
                        <div v-for="column in columns" :key="column.field" class="p-field">
                            <div v-if="!column.is_pk">
                                <label :for="column.field">{{ column.header }}</label>
                                <component
                                    v-if="!column.is_fk"
                                    :is="column.component"
                                    :id="column.field"
                                    v-model="item[column.field]"
                                    :type="column.type"
                                    :invalid="submitted && !item[column.field]"
                                    required
                                />
                                <component
                                    v-else
                                    :is="PvDropdown"
                                    :id="column.field"
                                    v-model="item[column.field]"
                                    :options="options[column.field]"
                                    optionLabel="id"
                                    optionValue="id"
                                    :invalid="submitted && !item[column.field]"
                                    required
                                />
                                <small class="p-invalid" v-if="submitted && !item[column.field]">{{ column.field }} is required.</small>
                            </div>
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text="" @click="itemDialog = false"></Button>
                        <Button label="Save" icon="pi pi-check" text="" @click="saveItem()"></Button>
                    </template>
                </Dialog>
                <Dialog v-model:visible="deleteItemDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="item">Are you sure you want to delete?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteItemDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteItem" />
                    </template>
                </Dialog>
                <Dialog v-model:visible="deleteItemsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="item">Are you sure you want to delete the selected items?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteItemsDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedItems" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<style>

</style>