<script setup>
    import { computed } from 'vue';
    import { useProductStore } from '@/stores/productStore';
    import '@fortawesome/fontawesome-free/css/all.css';
    const productStore = useProductStore();
    const cartItemCount = computed(() => {
      return productStore.cart.length;
    });
    const favoritesItemCount = computed(() => {
      return productStore.favorites.length;
    });
</script>
<template>
    <div class="header">
        <div class="flex">
            <div>
                <router-link to="/"><img class="logo" src="../assets/logo-transparent.png"></router-link>
            </div>
            <div class="flex">
                <div class="flex">
                    <div class="cart-count">
                        {{ cartItemCount }}
                    </div><router-link to="/cart">
                        <img class="cart" src="../assets/cart.png">
                    </router-link>
                </div>
                <div class="flex">
                    <div class="favorites-count">
                        {{ favoritesItemCount }}
                    </div>
                    <router-link to="/favorites">
                        <i class="far fa-heart heart"></i>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .heart {
        color: #000;
        font-size: 50px;
    }
    .cart-count {
        margin: auto 0;
        font-size: x-large;
        margin-right: 10px;
    }
    .favorites-count {
        margin: auto 0;
        font-size: x-large;
        margin-right: 10px;
    }
    .header {
        padding: 20px 0;
    }
    .logo  {
        height: 50px;
    }
    .cart  {
        height: 50px;
        margin-right: 20px;
    }
    .flex {
        display: flex;
        justify-content: space-between;
    }
</style>