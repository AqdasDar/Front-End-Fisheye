function photographerTemplate(data) {
    const {name, portrait, city, country, tagline, price, id} = data;

    const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement('a');
        a.setAttribute("href", `photographer.html?id=${id}`);
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        const p = document.createElement('p');
        p.textContent = city + ', ' + country;
        p.classList.add('location');
        article.appendChild(p);
        const taglineP = document.createElement('p');
        taglineP.textContent = tagline;
        taglineP.classList.add('tagline'); // Add a class for styling if needed
        article.appendChild(taglineP);
        const priceP = document.createElement('p');
        priceP.textContent = price + '€/jour';
        priceP.classList.add('price'); // Add a class for styling if needed
        article.appendChild(priceP);

        a.appendChild(article);
        return (a)


    }
    return { name, picture, getUserCardDOM }
}
