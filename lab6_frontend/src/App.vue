<template>
    <EnteteNavigation />
    <router-view></router-view>
</template>

<script>
import { computed } from 'vue';

import EnteteNavigation from './components/EnteteNavigation.vue';

import { createCart } from './CartService';

export default {
    components: {
        EnteteNavigation
    },
    data: function () {
        return {
            // Le panier d'items choisis (depuis l'import d'un autre module):
            // Actuellement on code en dur le userId à la valeur 'josbleau', dans un
            // futur laboratoire on aura la possibilité de s'authentifier avec un id différent.
            cart: createCart('josbleau')
        };
    },
    methods: {
    },
    provide() {
        return {
            cart: this.cart
        };
    },
    mounted() {
        this.cart.initialFetch();
    }
}
</script>

<style>
* {
    box-sizing: border-box;
}

html {
    font-family: sans-serif;
}
</style>
