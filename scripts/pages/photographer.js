async function getPhotographers() {
    const response = await fetch("./data/photographers.json");
    return await response.json();
}

const photographersSection = document.querySelector(".photograph-header");

const button = document.querySelector(".contact_button");


let params = new URL(document.location).searchParams;
let id = Number(params.get("id")); // Convert the id to a number
console.log(id);

getPhotographers().then((data) => {
    const photographers = data.photographers;
    //console.log(photographers);
    //   console.log(data);
    //find photographer by id
    const photographer = photographers.find((photographer) => photographer.id === id);
    //console.log(photographer.name);
    const photographerProfile = document.createElement('div');
    photographerProfile.classList.add('photographer_profile');
    let title = document.createElement('h1');
    title.textContent = photographer.name;
    title.classList.add('photographer_name');
    let city = document.createElement('p');
    city.textContent = photographer.city + ', ' + photographer.country;
    city.classList.add('photographer_location');
    let tagline = document.createElement('p');
    tagline.textContent = photographer.tagline;
    tagline.classList.add('photographer_tagline');
    photographerProfile.appendChild(title);
    photographerProfile.appendChild(city);
    photographerProfile.appendChild(tagline);
    photographersSection.appendChild(photographerProfile);

    photographerProfile.parentNode.insertBefore(button, photographerProfile.nextSibling);

    //photo
    const photographerPhoto = document.createElement('div');
    photographerPhoto.classList.add('photographer_photo');
    let img = document.createElement('img');
    img.setAttribute("src", `assets/photographers/Photographers_ID_Photos/${photographer.portrait}`);
    img.setAttribute("alt", photographer.name);
    img.classList.add('photographer_img');
    photographerPhoto.appendChild(img);
    photographersSection.appendChild(photographerPhoto);

    //Sort
    const sortButton = document.querySelector('.sort_button');
    const option = document.querySelectorAll('.option');
    const options = document.querySelector('.sort_button .options');

    sortButton.addEventListener('click', function () {
        options.style.display = options.style.display === 'none' ? 'block' : 'none';
        if (options.style.display === 'block') {
            this.style.borderBottomLeftRadius = '0';
            this.style.borderBottomRightRadius = '0';
        } else {
            this.style.borderBottomLeftRadius = '';
            this.style.borderBottomRightRadius = '';
        }
    });

    const buttons = document.querySelectorAll('.sort_button .options button');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Get the previously selected option
            const previousSelected = document.querySelector('.sort_button .options button[aria-selected="true"]');

            // Show the previously selected option
            previousSelected.style.display = 'block';

            // Remove aria-selected from previously selected option
            previousSelected.setAttribute('aria-selected', 'false');

            // Add aria-selected to clicked option
            this.setAttribute('aria-selected', 'true');

            // Hide the clicked option
            this.style.display = 'none';

            // Update the text and SVG in the span
            sortButton.querySelector('span').innerHTML = this.textContent + '<img src="../assets/icons/arrow.svg"' +
                ' alt="arrow" aria-label="flèche"/>';
        });
        buttons.forEach(button => {
            button.style.borderTop = "1px solid white";
        });
    });

    //media
    const media = data.media;
    //console.log(media);
    const mediaSection = document.querySelector(".photographer_section");
    const mediaGallery = document.createElement('div');
    mediaGallery.classList.add('media_gallery');
    mediaSection.appendChild(mediaGallery);
    const mediaPhotographer = media.filter((media) => media.photographerId === id);
    //console.log(mediaPhotographer);
    mediaPhotographer.forEach((media) => {
        const mediaCard = document.createElement('div');
        mediaCard.classList.add('media_card');
        mediaGallery.appendChild(mediaCard);
        if (media.image) {
            const mediaImage = document.createElement('img');
            mediaImage.setAttribute("src", `assets/photographers/${photographer.name.split(' ')[0]}/${media.image}`);
            mediaImage.setAttribute("alt", media.alt);
            mediaImage.classList.add('media_img');
            mediaCard.appendChild(mediaImage);
        } else {
            const mediaVideo = document.createElement('video');
            mediaVideo.setAttribute("src", `assets/photographers/${photographer.name.split(' ').join('')}/${media.video}`);
            mediaVideo.setAttribute("alt", media.alt);
            mediaVideo.classList.add('media_video');
            mediaCard.appendChild(mediaVideo);
        }
        const mediaTitle = document.createElement('h2');
        mediaTitle.textContent = media.title;
        mediaTitle.classList.add('media_title');
        mediaCard.appendChild(mediaTitle);
        const mediaLikes = document.createElement('p');
        mediaLikes.textContent = media.likes;
        mediaLikes.classList.add('media_likes');
        mediaCard.appendChild(mediaLikes);
        const mediaPrice = document.createElement('p');
        mediaPrice.textContent = media.price + '€';
        mediaPrice.classList.add('media_price');
        mediaCard.appendChild(mediaPrice);
        const mediaHeart = document.createElement('i');
        mediaHeart.classList.add('fas', 'fa-heart');
        mediaCard.appendChild(mediaHeart);
    });


});
