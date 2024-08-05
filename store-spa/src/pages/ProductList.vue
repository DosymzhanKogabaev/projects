<script setup>
    import ProductCard from '../components/ProductCard.vue';
    import BrandsList from '../components/BrandsList.vue';
    import { useProductStore } from '@/stores/productStore';
    import { onMounted, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute()
    const productsList = ref([])
    const productStore = useProductStore();

    onMounted(() => {
        getProductsList()
    })
    watch(
        () => route.params,
        () => {
            getProductsList()
        }
    );
    const getProductsList = () => {
        productsList.value = []
        if(!route.params.category) {
            for(let i in productStore.products) {
                productsList.value.push(productStore.products[i])
            }
        }
        else {
            for(let i in productStore.products) {
                if(productStore.products[i].categoryEn == route.params.category) {
                    productsList.value.push(productStore.products[i])
                }
            }
        }
    }
</script>

<template>
    <div class="flex">
        <BrandsList></BrandsList>
        <div class="grid item-list">
            <div v-for="item in productsList">
                <ProductCard :item="item"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .flex {
        display: flex;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 1fr;
    }
    .item-list {
        width: 70%;
    }
</style>
