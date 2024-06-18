<template>
    <div class="container">
        <CatalogueProduits />
        <PanierProduits />
    </div>
</template>

<script>
import CatalogueProduits from './catalogue/CatalogueProduits.vue';
import PanierProduits from './panier/PanierProduits.vue';

export default {
    components: {
        CatalogueProduits,
        PanierProduits
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}
</style>
