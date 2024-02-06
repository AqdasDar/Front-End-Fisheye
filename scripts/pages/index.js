// Fonction asynchrone nommée getPhotographers. Elle récupère des données d’un fichier JSON et les renvoie sous forme d’objet JavaScript.
async function getPhotographers() {
    const response = await fetch("./data/photographers.json"); //
    // Récupère les données du fichier JSON situé à "./data/photographers.json".
    return await response.json();
    // Attend que la réponse soit lue en JSON et la renvoie.
}

// Fonction asynchrone nommée displayData. Elle prend un tableau de photographes en argument et les affiche sur la page web.
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        // Appelle la fonction photographerTemplate avec le photographe actuel en argument et stocke la valeur renvoyée dans photographerModel.
        const userCardDOM = photographerModel.getUserCardDOM();
        // Appelle la méthode getUserCardDOM sur l’objet photographerModel et stocke la valeur renvoyée dans userCardDOM.
        photographersSection.appendChild(userCardDOM);
        // Ajoute l’élément userCardDOM à l’élément photographersSection.
    });
}


async function init() {
    const {photographers} = await getPhotographers();
    await displayData(photographers);
}

init().then(() => console.log(""));
