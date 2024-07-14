<script>
import axios from "axios"
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { TimezonesService } from "../../service/TimezonesService";
export default {

}
</script>
<script setup>
import { useToast } from 'primevue/usetoast';
const timezonesService = new TimezonesService;
const toast = useToast();
const timezone = ref({});
const timezones = ref(null);
const filters = ref({});
const selectedTimezones = ref(null);
const timezoneDialog = ref(false);
const submitted = ref(false);
const deleteTimezoneDialog = ref(false);
const deleteTimezonesDialog = ref(false);
onBeforeMount(() => {
    initFilters();
});
onMounted(() => {
    timezonesService.getTimezones().then((data) => {timezones.value = data});
});
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
const openNew = () => {
    timezone.value = {};
    submitted.value = false;
    timezoneDialog.value = true;
}
const hideDialog = () => {
    timezoneDialog.value = false;
    submitted.value = false;
}
const saveTimezone = (utc_id, utc_offset, description) => {
    submitted.value = true;
    if (timezone.value.utc_offset && timezone.value.utc_offset.trim() && 
    timezone.value.description && timezone.value.description.trim()) {
        if(timezone.value.utc_id) {
            timezones.value[findIndexById(timezone.value.utc_id)] = timezone.value;
            timezonesService.putTimezone(utc_id, utc_offset, description)
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Timezone Updated', life: 3000 });
        }
        else {
            timezone.value["utc_id"] = timezones.value[timezones.value.length - 1]["utc_id"] + 1
            timezones.value.push(timezone.value)
            timezonesService.postTimezone(utc_offset, description)
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Timezone Created', life: 3000 });
        }
        timezoneDialog.value = false;
        timezone.value = {};
    }
}
const confirmDeleteTimezone = (editTimezone) => {
    timezone.value = editTimezone;
    deleteTimezoneDialog.value = true;
};
const deleteTimezone = () => {
    timezones.value = timezones.value.filter((val) => val.utc_id !== timezone.value.utc_id);
    timezonesService.deleteTimezone(timezone.value["utc_id"])
    deleteTimezoneDialog.value = false;
    timezone.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Timezone Deleted', life: 3000 });
};
const confirmDeleteSelected = () => {
    deleteTimezonesDialog.value = true;
}
const deleteSelectedTimezones = () => {
    timezones.value = timezones.value.filter((val) => !selectedTimezones.value.includes(val));
    for(let i = 0; i < selectedTimezones.value.length; i++) {
        timezonesService.deleteTimezone(selectedTimezones.value[i]["utc_id"])
    }
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Timezones Deleted', life: 3000 });
    deleteTimezonesDialog.value = false;
    selectedTimezones.value = null;
}
const editTimezone = (editTimezone) => {
    timezone.value = { ...editTimezone };
    timezoneDialog.value = true;
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < timezones.value.length; i++) {
        if (timezones.value[i].utc_id === id) {
            index = i;
            break;
        }
    }
    return index;
};
</script>
<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
                            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedTimezones || !selectedTimezones.length" />
                        </div>
                    </template>
                </Toolbar>
                <DataTable
                v-model:selection="selectedTimezones"
                :filters="filters"
                :value="timezones"
                :paginator="true"
                :rows="10"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} timezones">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Manage Timezones</h5>
                            <IconField iconPosition="left" class="block mt-2 md:mt-0">
                                <InputIcon class="pi pi-search" />
                                <InputText class="w-full sm:w-auto" v-model="filters['global'].value" placeholder="Search..." />
                            </IconField>
                        </div>
                    </template>
                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="utc_id" header="Id" :sortable="true" headerStyle="width:10%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.utc_id }}
                        </template>
                    </Column>
                    <Column field="utc_offset" header="Offset" :sortable="true" headerStyle="width:35%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.utc_offset }}
                        </template>
                    </Column>
                    <Column field="description" header="Description" :sortable="true" headerStyle="width:35%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.description }}
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="editTimezone(slotProps.data)" />
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded @click="confirmDeleteTimezone(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
                <Dialog v-model:visible="timezoneDialog" :style="{ width: '450px' }" header="Timezone Details" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="offset">Offset</label>
                        <InputText id="offset" v-model.trim="timezone.utc_offset" required="true" autofocus :invalid="submitted && !timezone.utc_offset" />
                        <small class="p-invalid" v-if="submitted && !timezone.utc_offset">Offset is required.</small>
                    </div>
                    <div class="field">
                        <label for="description">Description</label>
                        <InputText id="description" v-model.trim="timezone.description" required="true" :invalid="submitted && !timezone.description" />
                        <small class="p-invalid" v-if="submitted && !timezone.description">Description is required.</small>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text="" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" text="" @click="saveTimezone(timezone.utc_id, timezone.utc_offset, timezone.description)" />
                    </template>
                </Dialog>
                <Dialog v-model:visible="deleteTimezoneDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="timezone"
                            >Are you sure you want to delete <b>{{ timezone.description }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteTimezoneDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteTimezone" />
                    </template>
                </Dialog>
                <Dialog v-model:visible="deleteTimezonesDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="timezone">Are you sure you want to delete the selected timezones?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteTimezonesDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedTimezones" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<style>

</style>