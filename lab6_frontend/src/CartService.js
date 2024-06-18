import { reactive } from 'vue';

/**
 * Construit une instance d'un objet "cart" représentant un panier d'achats.
 * Le contenu du panier est récupéré grâce au REST API du back-end.
 * Les données sont synchronisées avec le back-end lors de toute action qui modifie le panier.
 * 
 * @param {String} userId L'identifiant de l'utilisateur présentement connecté
 * @returns Un objet représentant le panier
 */
export function createCart(userId) {
    const cart = reactive({
        userId: userId,
        initialLoadInvoked: false,
        loading: false,
        itemsLoaded: false,
        loadError: false,
        items: [],
        /**
         * Cette méthode fait la récupération initiale des données du panier depuis l'API back-end.
         * Puisque celle-ci peut être appelée à partir de plus d'un composant (avec sa méthode de cycle de vie mounted()),
         * on garde un trace de si elle a déjà été appelée grâce au champ initialLoadInvoked. Si c'est le cas,
         * on ne l'appellera pas une deuxième fois, afin d'éviter de charger les données à nouveau pour rien.
         */
        initialFetch() {
            if (!this.initialLoadInvoked) {
                this.initialLoadInvoked = true;
                this.fetchCart();
            }
        },
        /**
         * Récupère les données du panier depuis le REST API (back-end). Le tableau items de l'objet courant sera
         * peuplé avec les items du panier lorsque le téléchargement est complété. Le champs itemsLoaded sera mis à true
         * également, afin d'indiquer que le chargement est terminé. Si une erreur quelconque survient, le champ
         * loadError sera mis à true afin d'indiquer qu'il y a un problème.
         * 
         * @return Promesse avec les données du panier chargées
         */
        fetchCart() {
            this.loading = true;

            fetch(`/api/cart/${this.userId}`).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Impossible de récupérer la liste des produits");
                }
            }).then(respJson => {
                this.items = respJson;
                this.itemsLoaded = true;
                this.loading = false;
                this.loadError = false;
                return respJson;
            }).catch(err => {
                console.err(err);
                this.loadError = true;
            });
        },
        /**
         * Ajoute un produit (selon son productId) au panier. L'ajout est géré côté back-end, on fait
         * un appel PUT au chemin /api/cart/:userId/:productId sans spécifier la quantité dans l'objet JSON
         * de la requête. Si le produit existe déjà dans le panier, le back-end s'occupera d'incrémenter
         * sa quantité de 1.
         * 
         * @param {String} productId L'identifiant du produit à ajouter
         */
        addToCart(productId) {
            // Ceci désactivera les actions qui modifient les données du panier (ajout, changement de quantité, retrait)
            // en attendant que le rechargement des données du panier soit complété.
            this.loading = true;

            fetch(`/api/cart/${this.userId}/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            }).then((response) => {
                if (response.ok) {
                    // On recharge le cart à partir du back-end afin que tout se mette à jour dans la page
                    return this.fetchCart();
                } else {
                    throw new Error(`Erreur ${response.status}`);
                }
            }).catch((error) => {
                console.err("Erreur", error);
            });
        },
        /**
         * Retire un produit du panier selon son productId. Si aucun produit avec ce productId n'existe,
         * la méthode n'a aucun effet. La suppression se fait depuis le back-end.
         * @param {String} productId L'identifiant du produit à retirer
         */
        removeFromCart: function (productId) {
            // Ceci désactivera les actions qui modifient les données du panier (ajout, changement de quantité, retrait)
            // en attendant que le rechargement des données du panier soit complété.
            this.loading = true;

            fetch(`/api/cart/${this.userId}/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                if (response.ok) {
                    // On recharge le cart à partir du back-end afin que tout se mette à jour dans la page
                    this.fetchCart();
                } else {
                    throw new Error(`Erreur ${response.status}`);
                }
            }).catch((error) => {
                console.err("Erreur", error);
            });
        },
        /**
         * Change la quantité d'un produit dans le panier.
         * @param {String} productId L'identifiant du produit dont on veut changer la quantité
         * @param {Number} newQuantity La nouvelle quantité
         */
        changeQuantity: function (productId, newQuantity) {
            // Ceci désactivera les actions qui modifient les données du panier (ajout, changement de quantité, retrait)
            // en attendant que le rechargement des données du panier soit complété.
            this.loading = true;

            const reqBody = {
                quantity: newQuantity
            };

            fetch(`/api/cart/${this.userId}/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reqBody)
            }).then((response) => {
                if (response.ok) {
                    // On recharge le cart à partir du back-end afin que tout se mette à jour dans la page
                    this.fetchCart();
                } else if (response.status >= 400 && response.status < 500) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes("application/json")) {
                        response.json().then((body) => {
                            alert("Erreur: " + body.message);
                        });
                    } else {
                        throw new Error(`Erreur ${response.status}`);
                    }
                }
            }).catch((error) => {
                console.err("Erreur", error);
            });
        },
        /**
         * Calcule et retourne le prix total de tous les produits dans le panier
         * @returns Le prix total des produits dans le panier
         */
        calculateTotal() {
            let total = 0;
            this.items.forEach((item) => {
                total = total + item.quantity * item.product.price;
            });

            return total;
        },
        /**
         * Retourne le nombre total d'articles dans le panier
         * @returns Le nombre d'articles dans le panier
         */
        calculateTotalItems() {
            let total = 0;
            this.items.forEach((item) => {
                total = total + item.quantity;
            });

            return total;
        }
    });
    return cart;
}
