const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { DateTime } = require('luxon');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

// Pour servir les images et autres contenus statiques:
app.use(express.static(path.join(__dirname, 'public')));

// *** DONNÉES ***

// La liste des produits, chargée depuis un module
const products = require('./Produits');

// Les paniers des clients, sous forme d'un objet
// (les propriétés de l'objet sont les identifiants d'utilisateurs,
// et les valeurs sont un tableau avec les items du panier)
const carts = {
  'josbleau': [
    {
      productId: 'plante',
      quantity: 1
    },
    {
      productId: 'panier',
      quantity: 2
    }
  ]
};

// Le numéro de commande actuel
let orderNumber = 1;

// La liste des commandes
const orders = [
  {
    id: orderNumber++,
    userId: 'marcarcand',
    cart: [
      {
        productId: 'plante',
        price: 45.99,
        quantity: 3
      },
      {
        productId: 'panier',
        price: 7.95,
        quantity: 5
      }
    ],
    paiement: {
      nomCarteCredit: 'Marc Arcand',
      noCarteCredit: '4555 5555 5555 5555',
      expCarteCredit: '2024/01'
    },
    modeExp: 'purolator',
    adresse: {
      nom: 'Marc Arcand',
      adresse: '123 rue Nunchaku',
      ville: 'Montréal',
      province: 'QC',
      codePostal: '1H1 H1H'
    },
    orderDateTime: '2023-05-10T20:45:15-04:00'
  }
];

// *** AUTRES FONCTIONS, CLASSES ET OBJETS UTILES ***

// Classe utilitaire pour générer un message d'erreur à passer à la méthode next(...)
// Le gestionnaire d'erreur traitera tout objet qui est une instance de cette classe
// de manière spéciale, en appelant la méthode getJsonMessage() afin de créer une réponse
// contenant un objet JSON décritant l'erreur avec les champs status et message.
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }

  getJsonMessage() {
    return {status: this.status, message: this.message};
  }
}

// *** MÉTHODES DE ROUTES ***

// GET de la liste des produits
app.get('/products', (req, res) => {
  // on transforme le chemin de l'image pour y ajouter le préfixe '/images/products/'
  const productsResp = products.items.map(product => products.addImagePathToProduct(product));
  res.json(productsResp);
});


// ** Exercice 1.1 : implémenter le GET d'un seul produit **
// (p.ex. /products/pomme pour obtenir les données du produit "pomme")
//
// Explications :
// 1. Vous pouvez utiliser la méthode products.findById(productId) (dans le module Produits.js)
//    afin d'obtenir l'objet pour un produit selon son identifiant.
// 2. L'objet retourné pour un produit ne contiendra pas la propriété image, qui donne le chemin
//    de téléchargement de l'image du produit. Pour obtenir celle-ci, utiliser la méthode
//    products.addImagePathToProduct(product) comme dans le GET de la liste des produits ci-haut ;
//    cette méthode retournera un objet contenant la propriété image correcte pour le produit.
//    Cet objet aura donc exactement la structure attendue pour la réponse en JSON.
// 3. Dans le cas d'un produit introuvable (s'il n'en existe aucun avec l'identifiant spécifié
//    dans le chemin), on devrait retourner une réponse avec un statut 404 (Not found).
//    Vous pouvez vous servir du gestionnaire d'erreur qui sera appelé si on appelle la fonction next
//    avec un objet HttpError en paramètre, p.ex. :
//     next(new HttpError(404, `Produit ${id} introuvable`));

// app.get(...); // À COMPLÉTER


// POST pour ajout d'un nouveau produit (pas utilisé par le front-end actuel)
app.post('/products', (req, res, next) => {
  const id = req.body.id;
  if (!id || id === '') {
    // Le return fait en sorte qu'on n'exécutera pas le reste de la fonction
    // après l'appel à next(...).
    return next(new HttpError(400, 'Le champ id est requis'));
  } else if (products.findById(id)) {
    return next(new HttpError(400, `Un produit avec l'id ${id} existe déjà`));
  }

  const newProduct = {
    id: "" + id,
    name: "" + req.body.name,
    price: + req.body.price,
    desc: "" + req.body.desc,
    image: "" + req.body.image,
    longDesc: "" + req.body.longDesc
  };

  products.add(id, newProduct);

  res.json({});
});


// PUT pour la modification d'un produit (pas utilisé par le front-end actuel)
app.put('/products/:id', (req, res, next) => {
  const id = req.params.id;
  if (!id || id === '') {
    return next(new HttpError(400, 'Le paramètre id est requis'));
  }

  const product = products.findById(id);
  if (!product) {
    return next(new HttpError(404, `Produit ${id} introuvable`));
  }

  if (id !== req.body.id) {
    return next(new HttpError(400, `Le paramètre spécifie l'id ${id} alors que le produit fourni a l'id ${req.body.id}`));
  }

  const newProduct = {
    id: "" + id,
    name: "" + req.body.name,
    price: + req.body.price,
    desc: "" + req.body.desc,
    image: "" + req.body.image,
    longDesc: "" + req.body.longDesc
  };

  products.modify(newProduct);

  res.json({});
});


// DELETE pour le retrait d'un produit (pas utilisé par le front-end actuel)
app.delete('/products/:id', (req, res, next) => {
  const id = req.params.id;
  if (!id || id === '') {
    return next(new HttpError(400, 'Le paramètre id est requis'));
  }

  const product = products.findById(id);
  if (!product) {
    return next(new HttpError(404, `Produit ${id} introuvable`));
  }

  products.delete(id);

  res.json({});
});


// ** Exercice 1.2 - Implémenter le GET pour le panier d'un client **
// (p.ex. /products/josbleau pour obtenir les données panier de Jos Bleau)
//
// Explications :
// 1. L'objet cart défini plus haut contient les paniers des clients. On peut
// se servir d'un objet JavaScript comme s'il s'agissait d'un tableau associatif ;
// p.ex., pour obtenir dynamiquement le panier de Jos Bleau, on peut faire :
// const userId = 'josbleau';
// const cart = carts[userId];
// ATTENTION : il ne faut pas coder en dur le userId, ceci est seulement un exemple !
//             Vous devez obtenir le bon userId depuis un paramètre de route.
//             Donc, sion a le chemin d'URL /cart/johnny , le userId est "johnny".
//
// 2. La réponse doit être un tableau d'objets tel que spécifié dans l'énoncé. Notez
// que les objets dans le tableau d'un panier définis dans carts ne contiennent que
// deux propriétés, soit productId et quantity. La réponse doit cependant contenir
// les propriétés product et quantity. La propriété product doit avoir pour valeur
// un objet avec certaines propriétés d'un produit : id, name, price, desc et image.
// Vous devez donc faire la transformation suivante :
// Pour chaque item dans le tableau d'un panier
//   - Obtenir le bon produit (via l'objet products) selon le productId
//   - Construire un nouvel objet avec les propriétés product (objet avec les propriétés d'un produit)
//     et quantity (quantité telle qu'on retrouve dans un item du panier).
//   - Mettre ce nouvel objet dans un tableau pour construire la réponse.
// Vous pouvez utiliser la fonction JavaScript Array.map(...) afin de transformer chaque
// item dans un tableau, ou encore utiliser une boucle
// (fonction Array.forEach(...) ou instruction for(... of ...)).
//
// 3. Si aucun panier n'existe pour le userId spécifié, retourner un tableau vide dans
// la réponse.

// app.get(...) // À COMPLÉTER


// ** Exercice 1.3 - Implémenter le PUT pour ajouter/modifier la quantité d'un article au panier d'un client **
// (p.ex. PUT /cart/josbleau/pomme pour ajouter/modifier la quantité d'une pomme pour le panier de Jos Bleau)
//
// Explications
// 1. Cette méthode de route utilisera deux paramètres de chemin, soit userId et productId. Assurez-vous
//    de bien définir le chemin avec le bon ordre pour les paramètres !
// 2. Il importe de bien valider les paramètres de route pour s'assurer de leur présence. Si userId
//    ou productId sont absents ou vides (chaîne vide), on doit retourner une réponse avec un statut
//    400 (Bad request) et un message d'erreur significatif (p.ex. "Le paramètre userId doit être spécifié").
//    Aussi, si aucun produit n'est trouvé avec le productId spécifié, on devrait donner un statut 404 (Not found)
//    avec le message "Le produit {productId} est introuvable".
//    Indice: utiliser la fonction next(...) avec la classe HttpError, comme à l'exercice 1.1, et s'assurer que
//    l'exécution de la méthode de route ne continue pas après l'appel de next(...).
// 3. Vous pouvez vous inspirer de la méthode de route app.delete('/cart/:userId/:productId', ...) définie
//    plus bas afin de savoir comment récupérer le panier d'un client selon le userId. Noter que s'il s'agit d'un
//    nouveau client, l'objet carts ne contiendra aucune propriété avec le userId spécifié. Il faut alors
//    créer un nouveau tableau pour ce panier et l'ajouter à l'objet carts. Cela peut être fait comme ceci:
//      let nouvCart = [];
//      carts[userId] = nouvCart;
// 4. Une fois le tableau du panier du client obtenu, voici l'algorithme pour gérer l'ajout ou la modification de l'article
//    dans le panier:
//     - On doit rechercher si le produit (selon le productId) existe dans le panier.
//        - Si non, il doit être ajouté au tableau du panier avec la quantité spécifiée dans le corps de la requête PUT (propriété "quantity")
//          ou bien la quantité 1 si la requête n'a pas de corps ou n'a pas de propriété "quantity".
//        - Si oui, l'action à prendre dépend si on a un corps de requête avec une propriété "quantity" :
//         - Si la propriété "quantity" existe, remplacer la quantité pour l'item existant dans le panier par la nouvelle quantité spécifiée
//         - Si la propriété "quantity" n'existe pas dans le corps de la requête, incrémenter la quantité existante de 1.
// 5. Fournir dans la réponse un objet JSON avec les propriétés productId et quantity pour l'item du panier actuel (après modification), p.ex. :
//      {
//        "productId": "pomme",
//        "quantity": 3
//      }

// app.put(...) // À COMPLÉTER


// DELETE pour enlever un article d'un panier d'un client
app.delete('/cart/:userId/:productId', (req, res, next) => {
  try {
    if (!req.params.userId || req.params.userId === '') {
      next(new HttpError(400, "Le paramètre userId doit être spécifié"));
    }
    if (!req.params.productId || req.params.productId === '') {
      next(new HttpError(400, "Le paramètre productId doit être spécifié"));
    }

    const userId = "" + req.params.userId;

    let currCart = carts[userId];
    if (!currCart) {
      next(new HttpError(404, `Le cart pour l'usager ${userId} est introuvable`));
    }

    let itemIndex = currCart.findIndex((item) => item.productId === req.params.productId);
    if (itemIndex != -1) {
      currCart.splice(itemIndex, 1);
    }

    return res.json({});
  } catch (error) {
    return next(error);
  }
});


// DELETE pour supprimer le panier au complet pour un client
app.delete('/cart/:userId', (req, res, next) => {
  try {
    if (!req.params.userId || req.params.userId === '') {
      next(new HttpError(400, "Le paramètre userId doit être spécifié"));
    }

    const userId = "" + req.params.userId;

    let currCart = carts[userId];
    if (currCart) {
      delete carts[userId];
    }

    return res.json({});
  } catch (error) {
    return next(error);
  }
});


// GET pour obtenir toutes les commandes
app.get('/orders', (req, res, next) => {
  res.json(orders);
});


// POST pour soumettre une nouvelle commande
app.post('/orders', (req, res, next) => {
  try {
    if (!req.body.userId) {
      throw new HttpError(400, 'Le champ userId est requis');
    }
    
    const userId = "" + req.body.userId;

    const userCart = carts[userId];
    if (!userCart || userCart.length < 1) {
      throw new HttpError(400, `Le cart de l'usager ${userId} est vide`);
    }

    // On ajoute le prix actuel aux items du cart (on veut que la commande contienne les prix
    // au moment où l'achat a été fait)
    const orderCart = userCart.map(item => {
      const itemPrice = products.findById(item.productId).price;
      const orderItem = {
        productId: item.productId,
        price: itemPrice,
        quantity: item.quantity
      };
      return orderItem;
    });

    if (!req.body.paiement) {
      throw new HttpError(400, 'Le champ paiement est requis');
    }
    if (!req.body.paiement.nomCarteCredit) {
      throw new HttpError(400, 'Le champ paiement.nomCarteCredit est requis');
    }
    if (!req.body.paiement.noCarteCredit) {
      throw new HttpError(400, 'Le champ paiement.noCarteCredit est requis');
    }
    if (!req.body.paiement.noCarteCredit) {
      throw new HttpError(400, 'Le champ paiement.expCarteCredit est requis');
    }
    const paiement = {
      nomCarteCredit: "" + req.body.paiement.nomCarteCredit,
      noCarteCredit: "" + req.body.paiement.noCarteCredit,
      expCarteCredit: "" + req.body.paiement.expCarteCredit
    };

    if (!req.body.modeExp) {
      throw new HttpError(400, 'Le champ modeExp est requis');
    }
    const modesExpPermis = ['postescanada', 'purolator', 'fedex'];
    if (!modesExpPermis.includes(req.body.modeExp)) {
      throw new HttpError(400, 'Le champ modeExp doit avoir une des valeurs suivantes: ' + modesExpPermis);
    }

    const modeExp = "" + req.body.modeExp;

    if (!req.body.adresse) {
      throw new HttpError(400, 'Le champ adresse est requis');
    }
    if (!req.body.adresse.nom) {
      throw new HttpError(400, 'Le champ adresse.nom est requis');
    }
    if (!req.body.adresse.adresse) {
      throw new HttpError(400, 'Le champ adresse.adresse est requis');
    }
    if (!req.body.adresse.ville) {
      throw new HttpError(400, 'Le champ adresse.ville est requis');
    }
    if (!req.body.adresse.province) {
      throw new HttpError(400, 'Le champ adresse.province est requis');
    }
    if (!req.body.adresse.codePostal) {
      throw new HttpError(400, 'Le champ adresse.codePostal est requis');
    }

    const adresse = {
      nom: "" + req.body.adresse.nom,
      adresse: "" + req.body.adresse.adresse,
      ville: "" + req.body.adresse.ville,
      province: "" + req.body.adresse.province,
      codePostal: "" + req.body.adresse.codePostal
    };

    const newOrder = {
      id: orderNumber++,
      userId: userId,
      cart: orderCart,
      paiement: paiement,
      modeExp: modeExp,
      adresse: adresse,
      orderDateTime: DateTime.now().toString() // fournit la date et heure actuelle en format ISO 8601 (p.ex. "2023-05-11T14:15:30.012-04:00")
    };

    orders.push(newOrder);

    // On vide le cart du client
    delete carts[userId];

    res.json(newOrder);
  } catch (error) {
    return next(error);
  }
});


// *** GESTION DES ERREURS ***

// Gestionnaire d'erreur, sera invoqué si on appelle next(...) en passant
// un objet d'erreur.
app.use((err, req, res, next) => {
  console.log("error handler: ", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500)
  if (err instanceof HttpError) {
    res.json(err.getJsonMessage());
  } else {
    res.json(err);
  }
});

module.exports = app;
