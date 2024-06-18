<template>
    <LoadingSpinner :loading="loading" :error="loadError" :errorMessage="errorMessage" />
    <div v-if="product" class="product">
        <img v-bind:src="imageSrc" />
        <div class="product-info">
            <div class="product-name">{{ product.name }}</div>
            <div class="product-price">{{ formattedPrice }}</div>
            <div class="product-description">{{ product.desc }}</div>
            <div class="product-long-desc">{{ product.longDesc }}</div>
        </div>
    </div>
</template>

<script>
import { formatCurrency } from '../text_format';
import { fetchProduct } from '../ProductService';
import { addApiPrefixToPath } from '../api_utils';
import LoadingSpinner from '../components/LoadingSpinner.vue';

export default {
    components: {
        LoadingSpinner
    },
    props: {
        id: String
    },
    data() {
        return {
            loading: true,
            loadError: false,
            errorMessage: null,
            product: null
        };
    },
    methods: {
        refreshProduct(id) {
            this.loadError = false;
            this.loading = true;
            this.errorMessage = null;
            this.product = null;

            fetchProduct(id).then(product => {
                this.product = product;
                this.loading = false;
            }).catch(err => {
                this.product = null;
                this.loadError = true;
                this.loading = false;
                this.errorMessage = err.message;
            });
        }
    },
    computed: {
        formattedPrice() {
            return formatCurrency(this.product.price);
        },
        imageSrc() {
            return addApiPrefixToPath(this.product.image);
        }
    },
    watch: {
        id(newId) {
            this.refreshProduct(newId);
        }
    },
    mounted() {
        this.refreshProduct(this.id);
    }
}
</script>

<style scoped>
.product {
    margin-bottom: 20px;
    border: 1px solid black;
    padding: 10px;
    overflow: hidden;
    clear: both;
}

.product img {
    float: left;
    margin-right: 10px;
    width: 15rem;
    object-fit: cover;
}

.product-info {
    float: left;
    width: 60%;
}

.product-name {
    font-weight: bold;
    font-size: 1.2em;
    margin-bottom: 5px;
}

.product-price {
    font-weight: bold;
    font-size: 1.2em;
    color: green;
}

.product-description {
    margin-top: 5px;
    font-size: 0.9em;
    font-weight: bold;
    color: #666;
}

.product-long-desc {
    margin-top: 5px;
    font-size: 0.9em;
    color: #666;
    white-space: pre-wrap;
}

.product-add-to-cart {
    float: right;
    width: 40%;
    text-align: right;
    font-size: 1.2em;
    line-height: 2em;
}
</style>
