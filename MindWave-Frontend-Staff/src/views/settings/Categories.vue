<script setup>
    import { onMounted, ref, toRaw } from 'vue';
    import { CategoriesService } from '../../service/CategoriesService.js';
    import { useToast } from 'primevue/usetoast';
    const toast = useToast();
    const categoriesService = new CategoriesService();
    const selectedTreeValue = ref({});
    const category = ref({});
    const submitted = ref(false);
    const categoriesDialog = ref(false);
    const edit = ref(false);
    const treeValue = ref(null);
    const selectedSingleTreeValue = ref(null)
    const treeNodes = ref(null)
    onMounted(() => {
        categoriesService.getNewCategories().then((data) => {treeValue.value = data})
        categoriesService.getNewCategoriesNodes().then((data) => {
            treeNodes.value = data
            let obj = {
                "key": -1,
                "label": "null",
                "data": "null",
                "children": []
            }
            treeNodes.value.unshift(obj)
        })
    })
    const test = () => {
        // console.log(Object.keys(selectedSingleTreeValue.value)[0])
        console.log(treeValue.value)
    }
    const openNew = () => {
        selectedSingleTreeValue.value = null;
        category.value = {};
        submitted.value = false;
        categoriesDialog.value = true;
    }
    const hideDialog = () => {
        edit.value = false;
        categoriesDialog.value = false;
        submitted.value = false;
    }
    const editCategory = (editCategory) => {
        edit.value = true;
        let x
        if(editCategory.data.parent_id == null) {
            x = -1
        }
        else {
            let obj = findCategoryById(treeValue.value, 0, editCategory.data.parent_id)
            console.log(obj)
            x = obj.key
        }
        category.value = { ...editCategory.data };
        selectedSingleTreeValue.value = {
            [x]: true
        }
        categoriesDialog.value = true;
    };
    const saveCategory = (name, info) => {
        submitted.value = true;
        // console.log(Object.keys(selectedSingleTreeValue.value)[0], Object.keys(selectedSingleTreeValue.value)[0].length)
        if (category.value.category_name && category.value.category_name.trim() && 
        category.value.category_info && category.value.category_info.trim() &&
        selectedSingleTreeValue.value) {
            const key = Object.keys(selectedSingleTreeValue.value)[0]
            let cat = findCategoryById(treeValue.value, 0, category.value.category_id)
            console.log(cat)
            if(category.value.category_id) {
                if(category.value.parent_id == cat.data.parent_id) {
                    cat.data.category_info = info
                    cat.data.category_name = name
                    categoriesService.putCategories(category.value.category_id, 1, cat.data.parent_id, info, name, category.value.categories_trans_id)
                }
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 3000 });
            }
            else {
                if(key == -1) {
                    treeValue.value.push(
                    {
                        key: `${treeValue.value.length}`,
                        data: {
                            category_id: category.value["category_id"],
                            category_name: name,
                            category_info: info,
                            parent_id: null,
                            type: "Category",
                            categories_trans_id: null
                        },
                        children: []
                    })
                    categoriesService.postCategories(1, name, info, null)
                } 
                else {
                    let obj = findCategoryByKey(treeValue.value, 0, key)
                    let id = obj.data.category_id;
                    obj.children.push(
                        {
                            key: `${obj.key}-${obj.children.length}`,
                            data: {
                                category_name: name,
                                category_info: info,
                                parent_id: id,
                                type: "Category",
                                categories_trans_id: obj.data.categories_trans_id
                            },
                            children: []
                        }
                    )
                    categoriesService.postCategories(1, name, info, id)
                }
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 3000 });
            }
            categoriesDialog.value = false;
            category.value = {};
        }
    }
    const confirmDeleteSelected = () => {
        console.log("confirmDeleteSelected")
    }
    const findCategoryByKey = (array, index, key) => {
        if(array.length == 0) {
            return null
        }
        if(array[index]) {
            if(array[index].key == key) {
                return array[index]
            }
            return findCategoryByKey(array[index].children, 0, key) || findCategoryByKey(array, index + 1, key)
        }
        return null
    }
    const findCategoryById = (array, index, id) => {
        if(array.length == 0) {
            return null
        }
        if(array[index]) {
            if(array[index].data.category_id == id) {
                return array[index]
            }
            return findCategoryById(array[index].children, 0, id) || findCategoryById(array, index + 1, id)
        }
        return null
    }
</script>
<template>
    <TabView>
        <TabPanel header="Русский">
            <Toolbar class="mb-4">
                <template v-slot:start>
                    <div class="my-2">
                        <button @click="test">Click</button>
                        <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
                        <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!Object.keys(toRaw(selectedTreeValue)).map((key) => [key, toRaw(selectedTreeValue)[key]]).length" />
                    </div>
                </template>
            </Toolbar>
            <TreeTable :value="treeValue" selectionMode="checkbox" v-model:selectionKeys="selectedTreeValue">
                <template #header>
                    <h5 class="m-0">
                        Manage Categories
                    </h5>
                </template>
                <Column field="category_name" header="Category Name" :expander="true" headerStyle="width:40%; min-width:10rem;"></Column>
                <Column field="category_info" header="Category Info" headerStyle="width:40%; min-width:10rem;"></Column>
                <Column headerStyle="min-width:10rem;">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="editCategory(slotProps.node)" />
                        <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </TreeTable>
            <Dialog v-model:visible="categoriesDialog" :style="{ width: '450px' }" header="Category Details" :modal="true" class="p-fluid">
                <div class="field">
                    <label for="parent">Parent</label>
                    <TreeSelect v-model="selectedSingleTreeValue" :options="treeNodes" placeholder="Select Parent" :invalid="submitted && !selectedSingleTreeValue"></TreeSelect>
                    <small class="p-invalid" v-if="submitted && !selectedSingleTreeValue">Parent is required.</small>
                </div>
                <div class="field">
                    <label for="name">Name</label>
                    <InputText id="name" v-model.trim="category.category_name" required="true" :invalid="submitted && !category.category_name" />
                    <small class="p-invalid" v-if="submitted && !category.category_name">Name is required.</small>
                </div>
                <div class="field">
                    <label for="info">Info</label>
                    <InputText id="info" v-model.trim="category.category_info" required="true" :invalid="submitted && !category.category_info" />
                    <small class="p-invalid" v-if="submitted && !category.category_info">Info is required.</small>
                </div>
                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" text="" @click="hideDialog" />
                    <Button label="Save" icon="pi pi-check" text="" @click="saveCategory(category.category_name, category.category_info)" />
                </template>
            </Dialog>
        </TabPanel>
    </TabView>
</template>
<style>
</style>