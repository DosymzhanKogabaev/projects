<script setup>
    import products from '../assets/products.json'
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    const categoryList = ref([]);
    const route = useRoute()
    const active = ref(false)
    onMounted(() => {
        for(let i in products.data) {
            let x = false
            for(let j in categoryList.value) {
                let key = Object.keys(categoryList.value[j])[0]
                if(key == products.data[i].category) {
                    x = true
                    break
                }
            }
            if(!x) {
                categoryList.value.push({
                    [products.data[i].category]: products.data[i].categoryEn
                })
            }
        }
    })
    const getActiveCategory = (category) => {
        if(route.params.category == category || (!route.params.category && category == '')) {
            return true
        }
        return false
    }
</script>
<template>
    <div class="brands-list">
        <div class="all-brands" v-bind:class="{active: getActiveCategory('')}">
            <router-link to="/">
                Все бренды
            </router-link>
        </div>
        <div class="pt-5" v-for="item in categoryList">
            <router-link :to="{name: 'category', params: {category: item[Object.keys(item)[0]]}}"  v-bind:class="{active: getActiveCategory(item[Object.keys(item)[0]])}">
                {{ Object.keys(item)[0] }}
            </router-link>
        </div>
    </div>
</template>
<style scoped>
    .active {
        text-decoration: underline;
    }
    .deactive {
        text-decoration: none;
    }
    .pt-5 {
        padding-top: 5px;
    }
    .brands-list {
        width: 30%;
    }
    a {
        color: #000;
        text-decoration: none;
    }
    .all-brands {
        font-size: larger;
    }
</style>