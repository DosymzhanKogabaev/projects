<template>
    <div>
        <div class="cart" v-if="cartProducts.length">
            <div class="cart-title">
                Корзина
            </div>
            <table>
                <thead>
                    <tr>
                        <th style="width: 40vw;"></th>
                        <th>Номинал</th>
                        <th>Количество</th>
                        <th>Сумма</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in cartProducts" :key="product.id">
                        <td class="flex">
                            <div class="img-block"><img :src="product.image" alt="product.name" class="product-image" /></div> 
                            <div style="width: 15vw; margin: auto 0;">
                                <div class="name">{{ product.name }}</div>  
                                <div class="desc">{{ product.description }}</div>
                            </div>
                        </td>
                        <td>{{ product.price }}&#8376;</td>
                        <td>
                            <input type="number" v-model.number="product.quantity" min="1" @input="updateQuantity(product.id, product.quantity)" />
                        </td>
                        <td>{{ product.price * product.quantity }}&#8376;</td>
                        <td class="ta-right">
                            <button @click="removeFromCart(product.id)" class="add-button">Удалить</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="cart-summary">
                <div class="total-price">К оплате: {{ totalPrice }}&#8376;</div>
                <button @click="proceedToPayment" class="add-button pay-button">Оплатить</button>
            </div>
        </div>
        <div v-else class="cart-title">
            Вы ничего не добавили в Корзину!
        </div>
        <div v-if="productStore.paid.length">
            <div class="cart">
                <div class="cart-title">
                    История покупок
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style="width: 40vw;"></th>
                            <th>Номинал</th>
                            <th>Количество</th>
                            <th>Сумма</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in productStore.paid" :key="product.id">
                            <td class="flex">
                                <div class="img-block"><img :src="product.image" alt="product.name" class="product-image" /></div> 
                                <div style="width: 15vw; margin: auto 0;">
                                    <div class="name">{{ product.name }}</div>  
                                    <div class="desc">{{ product.description }}</div>
                                </div>
                            </td>
                            <td>{{ product.price }}&#8376;</td>
                            <td>
                                {{ product.quantity }}
                            </td>
                            <td>{{ product.price * product.quantity }}&#8376;</td>
                        </tr>
                    </tbody>
                </table>
                <div class="cart-summary">
                    <div class="total-price">Оплачено: {{ totalPaidPrice }}&#8376;</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useProductStore } from '@/stores/productStore';
    import { computed } from 'vue';
    import { useRouter } from 'vue-router';

    const productStore = useProductStore();
    const router = useRouter();
    
    const cartProducts = computed(() => {
      return productStore.cart.map(product => ({
        ...product,
        quantity: product.quantity || 1
      }));
    });

    const removeFromCart = (productId) => {
      productStore.removeFromCart(productId);
    };

    const totalPrice = computed(() => {
      return cartProducts.value.reduce((sum, product) => sum + product.price * product.quantity, 0);
    });

    const totalPaidPrice = computed(() => {
      return productStore.paid.reduce((sum, product) => sum + product.price * product.quantity, 0);
    });

    const proceedToPayment = () => {
        productStore.purchaseItems();
        router.push({ name: 'paymentSuccessful' });
    };

    const updateQuantity = (productId, quantity) => {
      productStore.updateCartQuantity(productId, quantity);
    };
</script>

<style scoped>
    .cart {
        padding-bottom: 12px;
    }
    .ta-right {
        text-align: right;
    }
    .flex {
        display: flex;
    }
    .cart-title {
        font-size: 32px;
        font-weight: 400;
        margin-bottom: 20px;
    }
    .name {
        font-size: 20px;
        margin-bottom: 12px;
    }
    .desc {
        color: #474747;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: none;
        padding: 8px;
        text-align: center;
    }

    .img-block {
        width: 25vw;
    }
    .product-image {
        margin: 0 auto;
        height: 20vh;
        display: block;
    }

    .cart-summary {
        display: flex;
        margin-top: 20px;
        justify-content: end;
        padding-right: 8px;
    }
    .total-price {
        font-size: 20px;
        margin: auto 0;
        margin-right: 25px;
    }
    .pay-button {
        padding: 12px 20px;
        font-size: 20px;
    }
</style>