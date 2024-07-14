<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';

const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    },
    index: {
        type: Number,
        default: 0
    },
    root: {
        type: Boolean,
        default: true
    },
});
const name = ref("");
const menuItemRef = ref(null);
onMounted(() => {
    name.value = props.item.name ? props.item.name : props.item.table_name
})
</script>

<template>
    <li ref="menuItemRef" :class="{ 'layout-root-menuitem': root, 'active-menuitem': true }">
        <router-link
            :to="{ name: 'dynamic-table', params: { table: item.table_name } }">
            <span class="layout-menuitem-text">{{ name }}</span>
        </router-link>
    </li>
</template>
<style>
a {
    text-decoration: none;
    color: inherit;
}
.link {
    padding: 5px 15px;
}
</style>