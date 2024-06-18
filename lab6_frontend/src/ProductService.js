/**
 * Récupère depuis l'API back-end la liste de tous les produits du catalogue
 * 
 * @returns Promesse permettant d'obtenir la liste des produits
 */
export async function fetchProducts() {
    const response = await fetch('/api/products');

    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Impossible de récupérer la liste des produits");
    }
}

/**
 * Récupère depuis l'API back-end un produit individuel du catalogue
 * 
 * @param {String} productId L'identifiant du produit à récupérer
 * @returns Promesse permettant d'obtenir le produit demandé
 */
export async function fetchProduct(productId) {
    const response = await fetch(`/api/products/${productId}`);

    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`Produit ${productId} introuvable`);
    }
};
