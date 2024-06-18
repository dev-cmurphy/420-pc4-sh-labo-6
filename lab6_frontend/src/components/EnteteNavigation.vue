<template>
    <header>
        <div class="container">
            <div class="title">
                <h1 class="green-title">Le Panier Vert</h1>
                <p>La boutique en ligne des choses qui sont vertes.</p>
            </div>
            <div class="nav">
                <router-link to="/">Achats</router-link> | 
                <router-link to="/checkout">Caisse</router-link>
            </div>
            <div class="panier">
                <div>Panier : {{ calculatedTotalItems }} articles</div>
                <div>Total : {{ calculatedTotal }}</div>
            </div>
        </div>
    </header>
</template>

<script>
import { formatCurrency } from '../text_format';

export default {
    inject: ['cart'],
    computed: {
        calculatedTotal() {
            const total = this.cart.calculateTotal();
            return formatCurrency(total);
        },
        calculatedTotalItems() {
            return this.cart.calculateTotalItems();
        }
    }
}
</script>

<style scoped>
.green-title {
    color: green;
}

.container {
    display: flex;
    justify-content: space-between;
    padding: 0rem;
}

.title {
    flex-basis: 30%;
    padding: 0.3rem;
}

.nav {
    flex-basis: 55%;
    padding: 0.3rem;
}

.panier {
    flex-basis: 15%;
    padding: 0.3rem;
}
</style>
