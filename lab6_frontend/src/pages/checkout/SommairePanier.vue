<template>
    <div class="boxed">
        <h2>Panier</h2>
        <div v-if="calculatedTotalItems > 0">
            <table class="carttable">
                <thead>
                    <tr>
                        <th>Article</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <RangeeItemCart v-for="cartitem in cart.items" :key="cartitem.product.id" :name="cartitem.product.name"
                        :price="cartitem.product.price" :quantity="cartitem.quantity" />
                </tbody>
                <tfoot class="carttable">
                    <tr>
                        <td colspan="2">Grand total: </td>
                        <td class="nombre">{{ calculatedTotalItems }}</td>
                        <td class="nombre">{{ calculatedTotal }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div v-else>Le panier est vide !</div>
    </div>
</template>

<script>
import { formatCurrency } from '../../text_format';
import RangeeItemCart from './RangeeItemCart.vue';

export default {
    components: {
        RangeeItemCart
    },
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

<style>
table.carttable {
    border-collapse: collapse;
    width: 70%;
}

table.carttable th,
table.carttable td {
    padding: 8px;
    border-bottom: 1px solid #666;
    border-top: 1px solid #666;
    border-right: 1px solid #666;
    border-left: 1px solid #666;
}

table.carttable th {
    background-color: #666;
    color: white;
}

table.carttable .nombre {
    text-align: right;
}

tfoot.carttable {
    font-weight: bold;
}

.boxed {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 1rem auto;
    border-radius: 10px;
    padding: 1rem;
    width: 90%;
    max-width: 80rem;
}
</style>
