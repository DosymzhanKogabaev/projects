<script setup>
    import { useProductStore } from '../stores/productStore';
    import { useRouter } from 'vue-router';
    import '@fortawesome/fontawesome-free/css/all.css';

    const router = useRouter();
    const props = defineProps({
        item: Object
    })

    const productStore = useProductStore();

    const addToCart = (product) => {
        productStore.addToCart(product);
    };

    const handleCartAction = (product) => {
        if (isInCart(product)) {
            router.push({ name: 'cart' });
        } else {
            addToCart(product);
        }
    };

    const isInCart = (product) => {
        return productStore.isInCart(product.id);
    };

    const isFavorite = (product) => {
        return productStore.favorites.some(fav => fav.id === product.id);
    };

    const toggleFavorite = (product) => {
        if (isFavorite(product)) {
            productStore.removeFromFavorites(product.id);
        } else {
            productStore.addToFavorites(product);
        }
    };
</script>

<template>
    <div class="item-card">
        <img class="item-image" :src="item.image">
        <div class="line"></div>
        <div class="item-name mb-2">{{ item.name }}</div>
        <div class="grid mb-10">
            <div class="item-price">
                <div class="gray mb-2">
                    Цена
                </div>
                <div>
                    {{ item.price }}&#8376;
                </div>
            </div>
            <div class="item-quantity">
                <div class="gray mb-2">
                    В наличии
                </div>
                <div>
                    {{ item.quantity }}
                </div>
            </div>
            <div class="item-sales">
                <div class="gray mb-2">
                    Продаж
                </div>
                <div>
                    {{ item.sales }}
                </div>
            </div>
        </div>
        <div class="buttons">
            <button class="add-button" @click="handleCartAction(item)">
                {{ isInCart(item) ? 'Перейти в корзину' : 'Добавить в корзину' }}
            </button>
            <button @click="toggleFavorite(item)" class="fav-button">
                <i :class="isFavorite(item) ? 'fas fa-heart' : 'far fa-heart'"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>
    .gray {
        color: #999;
    }
    .mb-2 {
        margin-bottom: 2px;
    }
    .mb-10 {
        margin-bottom: 10px;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
    .item-card {
        border: 1px #e5e5e5 solid;
        padding: 15px 10px 15px 10px;
        height: calc(100% - 30px);
    }
    .item-image {
        height: 20vh;
        display:block;
        margin: 0 auto;
        margin-bottom: 15px;
    }
    .line {
        height: 1px;
        width: 100%;
        background-color: #e5e5e5;
        margin-bottom: 15px;
    }
    .buttons {
        display: flex;
        justify-content: space-between;
    }
    .fav-button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
    }
    
</style>
<style>
    .add-button {
        appearance: none;
        background-color: #FAFBFC;
        border: 1px solid rgba(27, 31, 35, 0.15);
        border-radius: 6px;
        box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
        box-sizing: border-box;
        color: #24292E;
        cursor: pointer;
        display: inline-block;
        font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        list-style: none;
        padding: 6px 16px;
        position: relative;
        transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: middle;
        white-space: nowrap;
        word-wrap: break-word;
    }

    .add-button:hover {
        background-color: #F3F4F6;
        text-decoration: none;
        transition-duration: 0.1s;
    }

    .add-button:disabled {
        background-color: #FAFBFC;
        border-color: rgba(27, 31, 35, 0.15);
        color: #959DA5;
        cursor: default;
    }

    .add-button:active {
        background-color: #EDEFF2;
        box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
        transition: none 0s;
    }

    .add-button:focus {
        outline: 1px transparent;
    }

    .add-button:before {
        display: none;
    }

    .add-button:-webkit-details-marker {
        display: none;
    }
</style>
