<template>
    <div class="cart-item">
        <img v-bind:src="imageSrc">
        <div class="cart-item-info">
            <div class="cart-item-name">{{ product.name }}</div>
            <div class="cart-item-price">{{ formattedPrice }}</div>
            <div class="cart-item-quantity"><span>Quantité:</span>
                <!-- v-bind:disabled="cart.loading" désactive toute modification de quantité
                     pendant que les données du panier sont rechargées depuis le back-end, sinon on
                     peut avoir de drôles de comportement si on change rapidement la quantité à nouveau
                     alors que les nouvelles données du panier ne sont pas encore reçues et affichées: -->
                <input type="number" class="quantity" v-model.lazy="currQuantity" min="1"
                    v-bind:disabled="cart.loading" />
            </div>
            <div class="cart-item-total">Total: {{ formattedTotal }}</div>
        </div>
        <div class="cart-item-remove">
            <button v-on:click="cart.removeFromCart(product.id)" v-bind:disabled="cart.loading">Retirer</button>
        </div>
    </div>
</template>

<script>
import { formatCurrency } from '../../../text_format';
import { addApiPrefixToPath } from '../../../api_utils';

export default {
    props: {
        product: Object,
        quantity: Number
    },
    // On injecte le cart afin d'avoir accès à ses méthodes changeQuantity et removeFromCart
    inject: ['cart'],
    data() {
        return {
            currQuantity: this.quantity
        }
    },
    watch: {
        // watch sur le changement de la quantité actuelle via la liaison v-model,
        // la fonction sera appellée à chaque fois que le champ change
        currQuantity(newQty) {
            // Empêche la saisie d'une quantité < 1
            if (newQty < 1) {
                this.currQuantity = 1;
            }

            // Arrondit toute quantité à l'unité près (le champ de saisie permet d'entrer des nombres décimaux...)
            this.currQuantity = Math.round(this.currQuantity);

            // On empêche les appels inutiles à l'API si currQuantity est la même que la prop
            // quantity ; le watch est déclenché lorsque la prop change, alors qu'il est inutile dans
            // ce cas de refaire un appel à changeQuantity, car il ne s'agit pas d'une action de l'utilisateur
            // qui est à l'origine.
            if (this.currQuantity !== this.quantity) {
                this.cart.changeQuantity(this.product.id, this.currQuantity);
            }
        },
        // Ce watch permet de rafraîchir la quantité courante (celle qu'on voit
        // dans le champ <input>) lorsque la prop quantity change, ce qui sera le cas lorsque quelque
        // chose à l'extérieur du composant, p.ex. le bouton "Ajouter au panier", vient
        // modifier la quantité dans le cart.
        quantity(newQty) {
            this.currQuantity = newQty;
        }
    },
    computed: {
        formattedTotal() {
            return formatCurrency(this.quantity * this.product.price);
        },
        formattedPrice() {
            return formatCurrency(this.product.price);
        },
        imageSrc() {
            return addApiPrefixToPath(this.product.image);
        }
    }
}
</script>

<style scoped>
.cart-item {
    margin-bottom: 10px;
    border: 1px solid black;
    padding: 10px;
    overflow: hidden;
    clear: both;
}

.cart-item img {
    float: left;
    margin-right: 10px;
    width: 50px;
    object-fit: cover;
}

.cart-item-info {
    float: left;
    width: 60%;
}

.cart-item-name {
    font-weight: bold;
    font-size: 1.1em;
    margin-bottom: 5px;
}

.cart-item-price {
    font-weight: bold;
    font-size: 1.1em;
    color: green;
}

.cart-item-remove {
    float: right;
    width: 40%;
    text-align: right;
    font-size: 1.1em;
    line-height: 2em;
}

.quantity {
    width: 50px;
    text-align: center;
    margin-right: 10px;
}
</style>
