<script setup>
import { ref, computed, reactive, onBeforeMount, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode } from 'primevue/api';
import { useFetchStore } from '@/store/fetch.js';

const route = useRoute();
const fetchStore = useFetchStore();
const toast = useToast();

const product = ref({});
const products = ref([]);
const filters = ref({});
const selectedProducts = ref(null);
const productDialog = ref(false);
const submitted = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const endpointApiData = ref(null);
const errors = reactive({});
const tableApiData = ref(null);
const sqlParamsApi = ref('');
const sqlQuery = ref('');
const dynamicId = ref('');
const emptyColumnName = ref(null);
const referencedTableId = ref(null);
const lookupID = ref(null);
const isForeignKey = ref([]);
const sortOptions = ref([]);

onBeforeMount(() => {
    initFilters();
});

async function fetchReferencedTableId() {
    try {
        const response = await axios.get(`/api/meta_lookup/table_id/${route.params.table}`);
        const dbRows = response.data.content.db_rows;
        if (dbRows && dbRows.length > 0) {
            referencedTableId.value = dbRows[0].referenced_table_id;

        } else {
            referencedTableId.value = null;
        }
    } catch (error) {
        console.error('Ошибка при получении данных meta lookup:', error);
        referencedTableId.value = null;
    }
}

async function fetchLookupID() {
    if (referencedTableId.value) {
        try {
            const response = await axios.get(`/api/crud/menu-items/${referencedTableId.value}/api_endpoints`);
            lookupID.value = response.data.content.db_rows.length > 0 ? response.data.content.db_rows[0].endpoint : null;
        } catch (error) {
            console.error('Ошибка при получении lookupID:', error);
            lookupID.value = null;
        }
        try {
            const response = await axios.get('/api/meta_columns/table_id/119');
            isForeignKey.value = response.data.content.db_rows.map(item => ({
                isforeign: item.is_foreign_key,
                isprimary: item.is_primary_key,
                columnName: item.column_name,
            }));
        } catch (error) {
            console.error('Ошибка при получении данных isForeignKey:', error);
        }
    }
}

async function fetchDynamicId() {
    try {
        const response = await axios.get(`/api/dev/getpk/${route.params.table}`);
        dynamicId.value = response.data.rows[0].column_name;
        console.log('dynamicId: ', dynamicId)
    } catch (error) {
        console.error('Ошибка при получении динамического ID:', error);
    }
}

async function fetchTableApiData() {
    try {
        const response = await axios.get(`/api/crud/menu-items/${route.params.table}/api_endpoints`);
        const dbRows = response.data.content.db_rows;
        if (dbRows.length > 0) {
            tableApiData.value = dbRows;
            endpointApiData.value = dbRows[0].endpoint;
        } else {
            const columnsResponse = await axios.get(`/api/meta_columns/${route.params.table}`);
            emptyColumnName.value = columnsResponse.data.content.db_rows;
        }
    } catch (error) {
        console.error('Ошибка при получении данных API таблицы:', error);
    }
}

async function fetchProducts() {
    if (endpointApiData.value) {
        try {
            const response = await axios.get(endpointApiData.value);
            console.log(response, 55);
            products.value = response.data.content.db_rows.length > 0 ? response.data.content.db_rows : [];
        } catch (error) {
            console.error('Ошибка при получении продуктов:', error);
        }
    } else if (emptyColumnName.value) {
        products.value = [emptyColumnName.value.reduce((acc, column) => {
                acc[column.column_name] = null;
                ;
                return acc;
            },
            {})];
    }
}

async function getTableData() {
    await fetchDynamicId();
    await fetchTableApiData();
    await fetchProducts();
    await fetchReferencedTableId();
    await fetchLookupID();

    // Получение сортировочных опций
    if (lookupID.value) {
        try {
            const response = await axios.get(lookupID.value);
            sortOptions.value = response.data.content.db_rows.map(item => ({
                label: item.type_name,
                value: item.activity_type_id
            }));
        } catch (error) {
            console.error('Ошибка при получении типов активности:', error);
        }
    }
}

onMounted(() => {
    getTableData();
});

watch(
    () => route.path,
    () => {
        getTableData();
    }
);

const productKeys = computed(() => {
    return products.value.length ? Object.keys(products.value[0]) : [];

});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

const openNew = () => {
    product.value = { ...products.value[0] };
    console.log(product.value, 66);
    for (let key in product.value) {
        product.value[key] = typeof product.value[key] === 'number' ? 0 : '';
    }
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const validateProduct = (product) => {
    for (let key in product) {
        const value = product[key];
        if (!value && key !== dynamicId.value) {
            errors[key] = `This ${key} is required`;
        } else {
            delete errors[key];
        }
    }
};

const saveProduct = async () => {
    submitted.value = true;
    validateProduct(product.value);
    if (Object.keys(errors).length > 0) {
        console.log('Validation errors:', errors);
        return;
    }

    const index = products.value.findIndex((p) => p[dynamicId.value] === product.value[dynamicId.value]);
    try {
        if (product.value[dynamicId.value] > 0) {
            if (index !== -1) {
                await axios.put(`${endpointApiData.value}/${product.value[dynamicId.value]}`, {
                    ...product.value
                });
                products.value[index] = { ...product.value };
                toast.add({ severity: 'success', summary: 'Успешно', detail: 'Продукт обновлён', life: 3000 });
            }
        } else {
            await axios.post(endpointApiData.value, {
                ...product.value
            });
            getTableData();
            toast.add({ severity: 'success', summary: 'Успешно', detail: 'Продукт создан', life: 3000 });
        }
    } catch (error) {
        console.error(error);
        toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось сохранить продукт', life: 3000 });
    }

    productDialog.value = false;
};

const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};

const deleteProduct = async (id) => {
    try {
        await axios.delete(`/api/course_activities/${id}`);
        fetchStore.postDataApi({ ...product.value }, sqlQuery.value, sqlParamsApi.value);
        getTableData();
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Продукт удалён', life: 3000 });
    } catch (error) {
        console.error(error);
        toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось удалить продукт', life: 3000 });
    }
    deleteProductDialog.value = false;
    product.value = {};
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};

const deleteSelectedProducts = async () => {
    for (let selectedProduct of selectedProducts.value) {
        try {
            await axios.delete(`/api/course_activities/${selectedProduct[dynamicId.value]}`);
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
            toast.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: `Не удалось удалить продукт ${selectedProduct[dynamicId.value]}`,
                life: 3000
            });
        }
    }
    getTableData();
    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Продукты удалены', life: 3000 });
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
};

const editProduct = (editProduct) => {
    product.value = { ...editProduct };
    productDialog.value = true;
};
</script>

<template>
    <div class="grid" :key="route.path">
        <div class="col-12">
            <div class="card">
                <!-- Кнопки создания и удаления -->
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="Новый" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
                            <Button label="Удалить" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                                    :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                    </template>
                </Toolbar>

                <!-- Таблица данных -->
                <DataTable
                    v-if="products || emptyColumnName"
                    v-model:selection="selectedProducts"
                    :filters="filters"
                    :value="products"
                    paginator
                    :rows="10"
                    :rowsPerPageOptions="[5, 10, 25]"
                    :globalFilterFields="productKeys"
                    tableStyle="min-width: 75rem"
                >
                    <template v-slot:header>
                        <div class="flex justify-content-between align-items-center">
                            <h4 class="m-0">Данные таблицы</h4>
                            <div>
                                <span class="block mt-2 md:mt-0 p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters.global.value" placeholder="Поиск..." />
                                </span>
                            </div>
                        </div>
                    </template>
                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

                    <!-- Генерация столбцов таблицы динамически -->
                    <Column v-for="key in productKeys" :key="key" :field="key" :header="key" sortable></Column>
                    <Column v-if="products.length > 0" field="actions" header="Действия" bodyClass="text-center"
                            style="width: 200px">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" class="mr-2" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>

                </DataTable>

                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details"
                        :modal="true" class="p-fluid">
                    <div v-for="(value, index) in product" :key="index" class="field">
                        <label v-if="index !== dynamicId" :for="index">{{ index }}</label>
                        <template v-if="index !== dynamicId">
                            {{}}
                            <Dropdown v-if="product[index] == 8"
                                      :options="sortOptions" optionLabel="label"
                                      optionValue="value" v-model.trim="product[index]" />
                            <InputText v-else :id="index" v-model.trim="product[index]" required="true" autofocus
                                       :invalid="submitted && !product[index]" />
                        </template>

                        <small class="p-invalid" v-if="submitted && !product[index] && index !== dynamicId">
                            <b>"{{ index }}"</b> is required.
                        </small>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text="" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" text="" @click="saveProduct()" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductDialog" header="Подтверждение" modal class="p-fluid"
                        :breakpoints="{ '960px': '75vw', '640px': '100vw' }" style="width: 30vw">
                    <template #footer>
                        <Button label="Отменить" icon="pi pi-times" class="p-button-text"
                                @click="deleteProductDialog = false" />
                        <Button label="Удалить" icon="pi pi-check" class="p-button-text"
                                @click="deleteProduct(product[dynamicId])" />
                    </template>
                    <span>Вы уверены, что хотите удалить {{ product[dynamicId] }}?</span>
                </Dialog>

                <!-- Диалоговое окно подтверждения удаления выбранных продуктов -->
                <Dialog v-model:visible="deleteProductsDialog" header="Подтверждение" modal class="p-fluid"
                        :breakpoints="{ '960px': '75vw', '640px': '100vw' }" style="width: 30vw">
                    <template #footer>
                        <Button label="Отменить" icon="pi pi-times" class="p-button-text"
                                @click="deleteProductsDialog = false" />
                        <Button label="Удалить" icon="pi pi-check" class="p-button-text"
                                @click="deleteSelectedProducts" />
                    </template>
                    <span>Вы уверены, что хотите удалить выбранные продукты?</span>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
