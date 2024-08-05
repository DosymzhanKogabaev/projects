<script setup>
    import ProductCard from '../components/ProductCard.vue';
    import BrandsList from '../components/BrandsList.vue';
    import { useProductStore } from '@/stores/productStore';
    import { watch } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute()
    const productStore = useProductStore();
</script>

<template>
    <div>
        <div class="grid item-list" v-if="productStore.favorites.length">
            <div v-for="item in productStore.favorites" class="card">
                <ProductCard :item="item"/>
            </div>
        </div>
        <div v-else class="no-items">
            Вы ничего не добавили в Избранное!
        </div>
    </div>
</template>

<style scoped>
    .no-items {
        font-size: 32px;
        font-weight: 400;
        margin-bottom: 20px;
    }
    .card {
        width: 100%;
    }
    .flex {
        display: flex;
    }
    .grid {
        justify-items: center;
        display: grid;
        grid-template-columns: repeat(4, 25%);
        grid-auto-rows: 1fr;
    }
    .item-list {
        width: 100%;
    }
</style>
