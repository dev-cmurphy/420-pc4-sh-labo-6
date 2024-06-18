/**
 * Formate un nombre monétaire avec 2 décimales, en format canadien français, p.ex. 19,99$
 * @param {*} amount Montant à formater
 */
export const formatCurrency = function(amount) {
    if (amount != null && !isNaN(amount)) {
        return amount.toLocaleString('fr-CA', {
            minimumFractionDigits: 2
        }) + "$";
    }
    return null;
};
