<template>
    <div id="product-list">
        <h2>Catalogue de produits</h2>
        <LoadingSpinner :loading="loading" :error="loadError" />
        <ItemCatalogue v-if="!loading" v-for="product in products" :key="product.id" :id="product.id"
            :name="product.name" :price="product.price" :desc="product.desc" :image="product.image" />
    </div>
</template>

<script>
import ItemCatalogue from './ItemCatalogue.vue';
import LoadingSpinner from '../../../components/LoadingSpinner.vue';
import { fetchProducts } from '../../../ProductService';

export default {
    components: {
        ItemCatalogue: ItemCatalogue,
        LoadingSpinner: LoadingSpinner
    },
    data() {
        return {
            products: [],
            loading: true,
            loadError: false
        };
    },
    mounted() {
        fetchProducts().then(products => {
            this.products = products;
            this.loading = false;
            this.loadError = false;
        }).catch(err => {
            console.err(err);
            this.loading = false;
            this.loadError = true;
        });
    }
}
</script>

<style scoped>
#product-list {
    flex-basis: 70%;
    margin-right: 20px;
    border: 1px solid black;
    padding: 10px;
}
</style>
