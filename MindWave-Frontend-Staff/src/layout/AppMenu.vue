<script setup>
import { ref, onMounted } from 'vue';
import AppMenuItem2 from './AppMenuItem2.vue';
import AppMenuItem from './AppMenuItem.vue';
import axios from 'axios';

const menu = ref(null);

// onMounted(() => {
//     axios
//         .get('/api/crud/menu-items/1', {
//             params: {
//                 language_id: 1
//             }
//         })
//         .then((response) => {
//             menu.value = response.data.content.db_rows;
//             let parentItems = {};

//             // Добавляем все родительские элементы
//             menu.value.forEach((item) => {
//                 if (!item.parent_id) {
//                     item.subItem = [];
//                     parentItems[item.menu_item_id] = item;
//                 }
//             });

//             // Добавляем дочерние элементы
//             menu.value.forEach((item) => {
//                 if (item.parent_id && parentItems[item.parent_id]) {
//                     parentItems[item.parent_id].subItem.push(item);
//                 }
//             });

//             // Фильтруем только родительские элементы для финального списка
//             menu.value = menu.value.filter((item) => !item.parent_id);
//         })
//         .catch((error) => {
//             console.error('Error fetching data:', error);
//         });
// });
onMounted(async () => {
    await axios.get('http://192.168.0.117:8000/api/menu_metadata').then((response) => {
        menu.value = response.data.content.db_rows[0].children
    })
})
</script>

<template>
    <!-- <ul class="layout-menu">
        <template v-for="(item, i) in menu" :key="item">
            <AppMenuItem2 :item="item" :index="i" :root="true"/>
            <li class="menu-separator"></li>
        </template>
    </ul> -->
    <Menu :model="menu">
        <template #item="{ item, props }">
            <router-link
                v-slot="{ href, navigate }"
                :to="{ name: 'dynamic-table', params: { table: item.table_name } }">
                <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                    <span v-if="item.name" class="ml-2">{{ item.name }}</span>
                    <span v-else class="ml-2">{{ item.table_name }}</span>
                </a>
            </router-link>
        </template>
    </Menu>
</template>

<style lang="scss" scoped></style>
