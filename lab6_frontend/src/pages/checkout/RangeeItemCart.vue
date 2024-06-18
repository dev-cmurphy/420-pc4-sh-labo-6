<template>
    <tr>
        <td>{{ name }}</td>
        <td class="nombre">{{ priceFormatted }}</td>
        <td class="nombre">{{ quantity }}</td>
        <td class="nombre">{{ totalFormatted }}</td>
    </tr>
</template>

<script>
import { formatCurrency } from '../../text_format';

export default {
    props: {
        name: String,
        price: Number,
        quantity: Number
    },
    computed: {
        priceFormatted() {
            return formatCurrency(this.price);
        },
        totalFormatted() {
            return formatCurrency(this.quantity * this.price);
        }
    }
}
</script>
