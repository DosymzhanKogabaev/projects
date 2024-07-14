<script>
import axios from "axios"
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { TestService2 } from "../../service/TestService2";
import { MenuService } from "../../service/MenuService";
export default {

}
</script>
<script setup>
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const product = ref({});
const products = ref(null);
const statuses = ref(null);
const filters = ref({});
const testService2 = new TestService2;
const selectedProducts = ref(null);
const productDialog = ref(false);
const submitted = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const chosenStatus = ref("");
const menuService = new MenuService;
onBeforeMount(() => {
    initFilters();
});
onMounted(() => {
    testService2.getProducts().then((data) => {products.value = data});
    testService2.getStatuses().then((data) => {statuses.value = data});
});
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
}
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
}
const saveProduct = (id, name, email, age, status) => {
    submitted.value = true;
    if (product.value.name && product.value.name.trim() && 
    product.value.email && product.value.email.trim() &&
    product.value.age && chosenStatus.value) {
        if(product.value.id) {
            product.value["status_name"] = status.status_name
            products.value[findIndexById(product.value.id)] = product.value;
            testService2.putProduct(id, name, email, age, status.status_id)
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }
        else {
            product.value["id"] = products.value[products.value.length - 1]["id"] + 1
            product.value["status_name"] = status.status_name
            products.value.push(product.value)
            testService2.postProduct(name, email, age, status.status_id)
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        productDialog.value = false;
        product.value = {};
    }
}
const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};
const deleteProduct = () => {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    testService2.deleteProduct(product.value["id"])
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};
const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
}
const deleteSelectedProducts = () => {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    for(let i = 0; i < selectedProducts.value.length; i++) {
        testService2.deleteProduct(selectedProducts.value[i]["id"])
    }
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
}
const editProduct = (editProduct) => {
    product.value = { ...editProduct };
    productDialog.value = true;
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};
const getBadgeSeverity = (status) => {
    switch (status) {
        case 'Active':
            return 'success';
        case 'Pending':
            return 'warning';
        case 'Suspended':
            return 'danger';
        default:
            return 'info';
    }
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
                            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                    </template>
                </Toolbar>
                <DataTable
                v-model:selection="selectedProducts"
                :filters="filters"
                :value="products"
                :paginator="true"
                :rows="10"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Manage Test</h5>
                            <IconField iconPosition="left" class="block mt-2 md:mt-0">
                                <InputIcon class="pi pi-search" />
                                <InputText class="w-full sm:w-auto" v-model="filters['global'].value" placeholder="Search..." />
                            </IconField>
                        </div>
                    </template>
                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="id" header="Id" :sortable="true" headerStyle="width:16%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.id }}
                        </template>
                    </Column>
                    <Column field="name" header="Name" :sortable="true" headerStyle="width:16%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="email" header="Email" :sortable="true" headerStyle="width:16%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.email }}
                        </template>
                    </Column>
                    <Column field="age" header="Age" :sortable="true" headerStyle="width:16%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.age }}
                        </template>
                    </Column>
                    <Column field="status_name" header="Status" :sortable="true" headerStyle="width:16%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Status</span>
                            <Tag :severity="getBadgeSeverity(slotProps.data.status_name)">{{ slotProps.data.status_name }}</Tag>
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true" class="p-fluid">
                    <div class="field">
                        <label for="name">Name</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" />
                        <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="name">Email</label>
                        <InputText id="email" v-model.trim="product.email" required="true" :invalid="submitted && !product.email" />
                        <small class="p-invalid" v-if="submitted && !product.email">Email is required.</small>
                    </div>
                    <div class="field">
                        <label for="name">Age</label>
                        <input class="p-inputtext p-component" min="0" type="number" id="age" v-model.trim="product.age" required="true" :invalid="submitted && !product.age" />
                        <small class="p-invalid" v-if="submitted && !product.age">Age is required.</small>
                    </div>
                    <div class="field">
                        <label for="status_name" class="mb-3">Status</label>
                        <Dropdown id="status_name" v-model="chosenStatus" :options="statuses" optionLabel="status_name" placeholder="Select a Status" required="true" :invalid="submitted && !chosenStatus">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.status_name">
                                    <span :class="'product-badge status-' + slotProps.value.status_id">{{ slotProps.value.status_name }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                        <small class="p-invalid" v-if="submitted && !chosenStatus">Status is required.</small>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text="" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" text="" @click="saveProduct(product.id, product.name, product.email, product.age, chosenStatus)" />
                    </template>
                </Dialog>
                <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product"
                            >Are you sure you want to delete <b>{{ product.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
                    </template>
                </Dialog>
                <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Are you sure you want to delete the selected products?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<style>

</style>