function photographerTemplate(data) {
    const {name, portrait, city, country, tagline, price, id} = data;

    const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

    // Définition de la fonction getUserCardDOM
    function getUserCardDOM() {
        // Création d’un élément 'a' (lien hypertexte)
        const a = document.createElement('a');
        // Ajout de l’attribut 'href' à l’élément 'a' avec une URL qui contient l’ID du photographe
        a.setAttribute("href", `photographer.html?id=${id}`);

        // Création d’un élément 'article'
        const article = document.createElement('article');
        // Ajout de l’attribut 'aria-label' à l’élément 'article' avec le nom du photographe
        article.setAttribute('aria-label', name);

        // Création d’un élément 'img' (image)
        const img = document.createElement('img');
        // Ajout des attributs 'src' et 'alt' à l’élément 'img' avec le chemin de l’image et le nom du photographe
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)

        // Création d’un élément 'h2' (titre de niveau 2)
        const h2 = document.createElement('h2');
        // Ajout du nom du photographe comme contenu textuel de l’élément 'h2'
        h2.textContent = name;

        // Ajout des éléments 'img' et 'h2' à l’élément 'article'
        article.appendChild(img);
        article.appendChild(h2);

        // Création d'un élément 'p.' (paragraphe)
        const p = document.createElement('p');
        // Ajout de la ville et du pays du photographe comme contenu textuel de l’élément 'p.'
        p.textContent = city + ', ' + country;
        // Ajout de la classe 'location' à l’élément 'p.'
        p.classList.add('location');

        // Ajout de l’élément 'p' à l’élément 'article'
        article.appendChild(p);

        // Création d’un autre élément 'p' pour la tagline du photographe
        const taglineP = document.createElement('p');
        // Ajout de la tagline du photographe comme contenu textuel de l’élément 'p.'
        taglineP.textContent = tagline;
        // Ajout de la classe 'tagline' à l’élément 'p.'
        taglineP.classList.add('tagline');

        // Ajout de l'élément 'p' avec la tagline à l’élément 'article'
        article.appendChild(taglineP);

        // Création d'un autre élément 'p' pour le prix du photographe
        const priceP = document.createElement('p');
        // Ajout du prix du photographe comme contenu textuel de l'élément 'p'
        priceP.textContent = price + '€/jour';
        // Ajout de la classe 'price' à l'élément 'p'
        priceP.classList.add('price');

        // Ajout de l'élément 'p' avec le prix à l'élément 'article'
        article.appendChild(priceP);

        // Ajout de l'élément 'article' à l'élément 'a'
        a.appendChild(article);

        // Retour de l’élément 'a' comme résultat de la fonction
        return (a)
    }

    return {name, picture, getUserCardDOM}
    // Retourne un objet avec le nom, le chemin de l’image (url) et la fonction getUserCardDOM
}
