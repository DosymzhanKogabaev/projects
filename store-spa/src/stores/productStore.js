import { defineStore } from 'pinia';
import products from '../assets/products.json'

export const useProductStore = defineStore('product', {
  state: () => ({
        products: [...products.data],
        cart: [],
        favorites: [],
        paid: [],
  }),
  actions: {
    addToCart(product) {
        const existingProduct = this.cart.find(item => item.id === product.id);
        if (existingProduct) {
            if (product.quantity >= existingProduct.quantity + 1) {
                existingProduct.quantity += 1;
            } else {
                alert('Недостаточно товара на складе');
            }
        } else {
            if (product.quantity >= 1) {
                this.cart.push({ ...product, quantity: 1 });
            } else {
                alert('Недостаточно товара на складе');
            }
        }
    },
    addToFavorites(product) {
        if (!this.favorites.some(fav => fav.id === product.id)) {
            this.favorites.push(product);
        }
    },
    removeFromCart(productId) {
        this.cart = this.cart.filter(product => product.id !== productId);
    },
    removeFromFavorites(productId) {
        this.favorites = this.favorites.filter(product => product.id !== productId);
    },
    isInCart(productId) {
        return this.cart.some(product => product.id === productId);
    },
    isFavorite(productId) {
        return this.favorites.some(product => product.id === productId);
    },
    updateCartQuantity(productId, quantity) {
        const product = this.cart.find(item => item.id === productId);
        if (product) {
            const availableProduct = this.products.find(p => p.id === productId);
            if (availableProduct.quantity >= quantity) {
                product.quantity = quantity;
            } else {
                alert('Недостаточно товара на складе');
            }
        }
    },
    purchaseItems() {
        this.cart.forEach(cartProduct => {
            const product = this.products.find(p => p.id === cartProduct.id);
            if (product) {
                product.quantity -= cartProduct.quantity;
                product.sales += cartProduct.quantity;
            }
        });
        this.paid.push(...this.cart);
        this.cart = [];
      }
  }
});
