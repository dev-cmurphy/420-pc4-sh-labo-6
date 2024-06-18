<template>
    <div>
        <SommairePanier />
        <FormulaireCheckout v-if="!isCartEmpty"/>
    </div>
</template>

<script>
import SommairePanier from './SommairePanier.vue';
import FormulaireCheckout from './FormulaireCheckout.vue';

export default {
    components: {
        SommairePanier,
        FormulaireCheckout
    },
    inject: ['cart'],
    computed: {
        isCartEmpty() {
            return this.cart.items.length === 0;
        }
    }
}
</script>

<style scoped>

</style>
