/**
 * Les produits en vente. Il s'agit désormais d'un objet, qui comporte des propriétés et des méthodes. Le
 * tableau avec les produits est dans la propriété items. La méthode findById peut être utilisée pour trouver
 * un produit dans la liste selon son identifiant.
 * L'objet exposé est rendu réactif par l'appel de la fonction reactive de Vue.js (cela l'enveloppera dans
 * un Proxy réactif, comme le sont les objets dans l'option data() d'un composant.)
 */
module.exports = {
    items: [
        {
            id: 'chaise',
            name: 'Chaise verte',
            price: 29.99,
            desc: 'Une chaise en plastique, de couleur verte.',
            image: 'chaise.jpg',
            longDesc: `
        Nous sommes fiers de vous présenter notre chaise verte, qui allie style, confort et durabilité.
        
        Cette chaise est dotée d'un design élégant et moderne qui la distingue des autres chaises. Sa couleur verte vif apportera une touche de fraîcheur et d'énergie à votre espace. Le revêtement en tissu doux est agréable au toucher et résistant aux taches et à l'usure, ce qui en fait un choix pratique pour une utilisation quotidienne.
        
        Fabriquée avec des matériaux de qualité supérieure et une attention méticuleuse aux détails, cette chaise est un choix parfait pour votre maison ou votre bureau. Que vous l'utilisiez comme chaise de bureau, chaise de lecture ou simplement comme pièce de décoration, cette chaise verte sera certainement un ajout remarquable à votre intérieur.
        
        N'attendez plus pour commander cette chaise verte magnifique et pratique sur notre boutique en ligne. Nous sommes convaincus que vous l'aimerez autant que nous !
        `
        },
        {
            id: 'plante',
            name: 'Plante verte',
            price: 45.99,
            desc: 'Une plante avec un feuillage vert.',
            image: 'plante.jpg',
            longDesc: `
        Notre plante verte est une beauté naturelle, avec des feuilles épaisses et luxuriantes qui se développent en cascade gracieuse. Ses feuilles vertes vibrantes ajoutent de la couleur et de la vie à n'importe quelle pièce, tout en créant une atmosphère détendue et paisible. Cette plante est également facile à entretenir, ce qui la rend idéale pour les débutants en jardinage.

        Notre plante verte est une variété tropicale qui aime la lumière indirecte et les environnements chauds et humides. Elle est originaire des régions tropicales d'Amérique du Sud, où elle prospère dans des conditions de forte humidité. En raison de sa tolérance aux conditions de faible luminosité, cette plante est également parfaite pour les environnements d'intérieur où la lumière naturelle peut être limitée.

        Cette plante est également facile à entretenir, ne nécessitant qu'un arrosage régulier et un apport en nutriments occasionnel. Elle est résistante aux ravageurs et maladies courantes, ce qui la rend idéale pour ceux qui cherchent une plante faible entretien qui peut ajouter de la vie et de la couleur à leur espace.

        Notre plante verte est livrée dans un pot élégant et minimaliste qui met en valeur sa beauté naturelle. Ce pot est parfaitement dimensionné pour la plante, lui permettant de croître et de se développer sans entraves. Il est également facilement transportable, ce qui facilite son déplacement d'une pièce à l'autre.

        Nous sommes fiers de proposer cette plante verte à nos clients, en sachant qu'elle ajoutera de la vie, de la couleur et de la paix à leur maison ou leur bureau. Commandez dès maintenant votre plante verte sur notre boutique en ligne et profitez de la beauté naturelle qu'elle apportera à votre vie quotidienne.
        `
        },
        {
            id: 'bonhomme',
            name: 'Petit bonhomme vert',
            price: 3.99,
            desc: 'Ils viennent en paix.',
            image: 'bonhomme.jpg',
            longDesc: `
        Le jour a commencé comme n'importe quel autre jour. Les gens vaquaient à leurs occupations quotidiennes sans se douter que quelque chose d'extraordinaire allait se produire. Soudain, sans avertissement, une flotte de vaisseaux spatiaux a émergé de nulle part dans le ciel. Les vaisseaux étaient de petite taille et semblaient avoir été conçus pour des voyages de courte durée.
        
        Les vaisseaux ont commencé à se déplacer rapidement, zigzaguant à travers les nuages et effectuant des manœuvres acrobatiques incroyables. Les gens ont commencé à s'arrêter pour les regarder, se demandant qui pouvait bien être à bord de ces vaisseaux. Soudain, les vaisseaux se sont stabilisés et ont commencé à se diriger vers le sol.
        
        Lorsque les vaisseaux ont touché le sol, des portes ont commencé à s'ouvrir et des petits bonhommes verts sont sortis. Les petits bonhommes verts étaient petits, mesurant environ un mètre de hauteur. Ils étaient minces, avec des bras et des jambes grêles et des têtes disproportionnées. Ils étaient vêtus de combinaisons vertes ajustées qui semblaient être intégrées à leur peau.
        
        Les petits bonhommes verts se sont rapidement mis en mouvement, se déplaçant dans toutes les directions. Ils ont commencé à explorer leur nouvel environnement, semblant curieux et émerveillés par tout ce qu'ils voyaient. Ils ont visité des parcs, des centres commerciaux, des restaurants et des maisons, explorant chaque recoin de la ville.
        
        Au début, les gens ont été surpris et un peu effrayés par ces petits bonhommes verts. Mais rapidement, ils ont réalisé qu'ils étaient inoffensifs et curieux. Les petits bonhommes verts semblaient fascinés par les choses les plus simples, comme les arbres et les oiseaux, et semblaient heureux de simplement être là.
        
        Au fil des jours, les petits bonhommes verts sont devenus une attraction locale, avec des foules de gens qui se pressaient pour les voir. Les gens ont commencé à les nourrir et à leur offrir des cadeaux, ravis d'avoir des visiteurs si inhabituels.
        
        Finalement, les petits bonhommes verts ont repris leur voyage, quittant la ville aussi soudainement qu'ils étaient venus. Mais ils ont laissé une impression durable sur la ville et ses habitants, qui ont été émerveillés par leur visite. Les petits bonhommes verts étaient peut-être étranges, mais ils étaient aussi une source de joie et d'émerveillement, une preuve qu'il y a toujours des choses à découvrir dans ce monde vaste et merveilleux.
        `
        },
        {
            id: 'pomme',
            name: 'Pomme verte',
            price: 0.99,
            desc: 'Un fruit qui vient du pommier.',
            image: 'pomme.jpg',
            longDesc: `
        Les pommes vertes sont non seulement délicieuses, mais elles offrent également de nombreux bienfaits pour la santé. Voici quelques-uns des avantages les plus importants des pommes vertes :

        Riches en nutriments : Les pommes vertes sont riches en vitamines et en minéraux essentiels, comme la vitamine C, la vitamine K, le potassium et le magnésium. Ces nutriments sont importants pour maintenir une bonne santé globale, renforcer le système immunitaire et favoriser une bonne digestion.
        
        Faibles en calories : Les pommes vertes sont une excellente collation faible en calories, ce qui en fait un choix idéal pour ceux qui cherchent à perdre du poids ou à maintenir un poids santé. Une pomme verte moyenne ne contient qu'environ 95 calories.
        
        Fibre alimentaire : Les pommes vertes sont riches en fibres alimentaires, ce qui en fait un excellent choix pour améliorer la digestion et réduire le risque de maladies cardiovasculaires et de diabète. La fibre aide également à maintenir une sensation de satiété plus longtemps, ce qui peut aider à éviter les fringales.
        
        Antioxydants : Les pommes vertes sont riches en antioxydants, qui aident à protéger les cellules contre les dommages causés par les radicaux libres. Les antioxydants peuvent également aider à réduire le risque de maladies chroniques, comme le cancer et les maladies cardiaques.
        
        Bonnes pour les dents : Les pommes vertes sont croquantes et juteuses, ce qui peut aider à nettoyer les dents et à stimuler la production de salive. La salive est importante pour neutraliser les acides qui causent des caries dentaires et des maladies des gencives.
        
        En résumé, les pommes vertes sont non seulement délicieuses, mais elles offrent également de nombreux bienfaits pour la santé. Incorporer des pommes vertes dans votre alimentation peut aider à maintenir une bonne santé globale et à réduire le risque de maladies chroniques. Alors la prochaine fois que vous cherchez une collation saine et savoureuse, pensez aux pommes vertes !
        `
        },
        {
            id: 'tshirt',
            name: 'T-shirt vert',
            price: 23.99,
            desc: 'Un gaminet dans notre couleur préférée.',
            image: 'tshirt.jpg',
            longDesc: `
        Ce t-shirt vert est le choix parfait pour un look décontracté mais élégant. Fabriqué à partir de coton doux de qualité supérieure, il est léger et confortable à porter tout au long de la journée. Sa couleur verte vibrante est à la fois audacieuse et élégante, ajoutant une touche de fraîcheur à votre garde-robe.

        Le t-shirt est doté d'une coupe classique qui convient à toutes les morphologies, avec des manches courtes et un col rond. Sa silhouette ajustée flatteur mettra en valeur votre silhouette tout en restant confortable. Le tissu respirant assure une bonne circulation de l'air, ce qui vous gardera au frais et à l'aise même par temps chaud.

        Le t-shirt vert est parfait pour toutes les occasions décontractées. Vous pouvez le porter avec un jean et des baskets pour un look décontracté, ou le combiner avec une jupe élégante et des talons pour une tenue plus sophistiquée. Avec sa polyvalence et son style intemporel, ce t-shirt deviendra sûrement l'un de vos articles préférés de la garde-robe.

        Fabriqué avec des matériaux de qualité supérieure, ce t-shirt vert est résistant et facile à entretenir. Vous pouvez le laver en machine sans souci de perdre sa couleur vibrante ou sa forme. Il est également résistant aux froissements, ce qui vous permet de le porter sans avoir besoin de le repasser.

        Avec sa couleur verte vibrante, sa coupe flatteuse et sa qualité supérieure, ce t-shirt vert est un choix parfait pour une garde-robe décontractée mais élégante. Achetez-le dès maintenant et ajoutez une touche de fraîcheur à votre garde-robe !
        `
        },
        {
            id: 'voiture',
            name: 'Voiture verte',
            price: 20995.00,
            desc: 'Elle est littéralement verte mais émet tout de même des GES.',
            image: 'voiture.jpg',
            longDesc: `
        La Mazda 2 est une petite voiture sous-compacte qui offre une excellente maniabilité et une bonne économie de carburant. Elle dispose également d'un intérieur spacieux et bien équipé, avec des fonctionnalités modernes telles qu'un écran tactile, une caméra de recul et des systèmes d'assistance à la conduite.

        La Mazda 2 verte a été conçue pour offrir une expérience de conduite agréable et confortable. Elle est équipée d'un moteur efficace et d'une suspension qui assure une tenue de route solide, ce qui la rend idéale pour les déplacements en ville. En outre, la couleur verte peut être considérée comme un choix écologique, car elle est souvent associée à la nature et à l'environnement.
        `
        },
        {
            id: 'panier',
            name: 'Panier vert',
            price: 7.95,
            desc: 'Toute est dans toute.',
            image: 'panier.jpg',
            longDesc: `
        Il était une fois, dans une contrée lointaine, une petite fille nommée Élodie. Élodie vivait dans un petit village niché au milieu d'une forêt dense. Un jour, alors qu'elle se promenait dans la forêt, elle trouva un panier vert tressé avec une plante magique.

        Émerveillée par sa découverte, Élodie ramassa le panier et examina la plante. Elle remarqua que chaque brin de la plante avait une couleur différente et qu'ils semblaient changer de teinte en fonction de la lumière. Intriguée, elle décida de ramener le panier chez elle pour l'étudier de plus près.

        Une fois chez elle, Élodie commença à examiner le panier et la plante avec soin. Elle passa des heures à étudier chaque brin de la plante, à essayer de comprendre son origine et son pouvoir. Soudain, elle eut une idée. Elle décida de tresser un autre panier avec les brins de la plante magique, dans l'espoir de découvrir son pouvoir secret.

        Elle passa des jours à tresser le panier, travaillant sans relâche jusqu'à ce qu'il soit terminé. Lorsqu'elle eut fini, elle posa le panier à côté de l'autre et s'assit pour les contempler. Soudain, quelque chose d'incroyable se produisit. Les deux paniers commencèrent à briller et à émettre une lumière étincelante.

        Élodie se retrouva alors transportée dans un monde fantastique rempli de magie et de créatures étranges. Elle avait l'impression d'être entrée dans un rêve éveillé. Elle rencontra des elfes, des fées et des dragons, tous émerveillés par le pouvoir des paniers magiques.

        Élodie comprit alors que la plante magique qui avait été utilisée pour tresser les paniers avait le pouvoir de transporter les gens dans un monde fantastique. Elle décida de partager son pouvoir avec les autres, en offrant les paniers verts tressés à tous ceux qui voulaient vivre une aventure magique.

        Ainsi, le panier vert tressé avec la plante magique devint célèbre dans tout le pays, et Élodie devint une héroïne pour avoir découvert son pouvoir secret. Et depuis ce jour, les paniers verts tressés avec la plante magique sont devenus des symboles de magie et d'aventure, transportant les gens dans des mondes fantastiques et émerveillant les esprits de tous ceux qui les voient.
        `
        }
    ],
    /**
     * Trouve un produit selon son id parmi le tableau items. Si le produit est trouvé, il est retourné.
     * Sinon, la valeur undefined est retournée.
     * @param {String} productId L'identifiant du produit
     */
    findById(productId) {
        return this.items.find(p => p.id === productId);
    },
    add(id, product) {
        if (this.findById(id)) {
            throw new Error(`Produit avec id ${id} existe déjà`);
        }
        this.items.push(product);
    },
    modify(product) {
        const existingProduct = this.findById(product.id);
        if (!existingProduct) {
            throw new Error(`Produit avec id ${product.id} introuvable`);
        }
        existingProduct.name = product.name;
        existingProduct.price = product.price;
        existingProduct.desc = product.desc;
        existingProduct.image = product.image;
        existingProduct.longDesc = product.longDesc;
    },
    delete(productId) {
        const index = this.items.findIndex(p => p.id === productId);
        if (index != -1) {
            this.items.splice(index, 1);
        }
    },
    addImagePathToProduct(product) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            desc: product.desc,
            image: this.addImagePath(product.image),
            longDesc: product.longDesc
        };
    },
    addImagePath(image) {
        return '/images/products/' + image;
    }
};
