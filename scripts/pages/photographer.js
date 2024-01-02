async function getPhotographers() {
    const response = await fetch("./data/photographers.json");
    return await response.json();
}


getPhotographers().then((data) => {
    const photographersSection = document.querySelector(".photograph-header");

    const button = document.querySelector(".contact_button");

    let params = new URL(document.location).searchParams;
    let id = Number(params.get("id")); // Convert the id to a number
//console.log(id);
    const media = data.media;
//console.log(media);
    const mediaSection = document.querySelector(".photographer_section");
    const mediaGallery = document.createElement('div');
    const mediaPhotographer = media.filter((media) => media["photographerId"] === id);

//console.log(data);

    const photographers = data["photographers"];
    //console.log(photographers);
    //   console.log(data);
    //find photographer by id
    const defaultPhotographer = {
        city: "",
        country: "",
        id: id,
        name: "",
        portrait: "",
        price: "",
        tagline: ""
    };

    const photographer = photographers.find((photographer) => photographer.id === id) || defaultPhotographer;
    // console.log(photographer);
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
    let img = document.createElement('div');
    img.style.backgroundImage = `url(assets/photographers/Photographers_ID_Photos/${photographer.portrait})`;
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

    // sort by popularity
    // Trier par popularité (nombre de likes)
    // Sort by popularity
    const sortByLikes = () => {
        const sortedMedia = mediaPhotographer.sort((a, b) => b["likes"] - a["likes"]);
        updateMediaGallery(sortedMedia);
    };

// Sort by date
    const sortByDate = () => {
        const sortedMedia = mediaPhotographer.sort((a, b) => new Date(b.date) - new Date(a.date));
        updateMediaGallery(sortedMedia);
    };

// Sort by title
    const sortByTitle = () => {
        const sortedMedia = mediaPhotographer.sort((a, b) => a.title.localeCompare(b.title));
        updateMediaGallery(sortedMedia);
    };
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            let sortFunction;

            if (this.name === 'date') {
                sortFunction = sortByDate;
            } else if (this.name === 'titre') {
                sortFunction = sortByTitle;
            } else {
                sortFunction = sortByLikes;
            }

            sortFunction();
            console.log(sortFunction);


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

    function updateMediaGallery(sortedMedia) {
        mediaGallery.innerHTML = '';
        sortedMedia.forEach((mediaPhotographer) => {
                mediaGallery.classList.add('media_gallery');
                const mediaCard = document.createElement('div');
                mediaCard.classList.add('media_card');
                let mediaImg = document.createElement('img');
                mediaImg.classList.add('media_img');
                const mediaTitle = document.createElement('h2');
                mediaTitle.classList.add('media_title');
                const mediaPrice = document.createElement('p');
                mediaPrice.classList.add('media_price');
                const mediaLikes = document.createElement('p');
                mediaLikes.classList.add('media_likes');
                const mediaHeart = document.createElement('img');
                mediaHeart.classList.add('media_heart');

                mediaImg.src = `assets/photographers/${photographer.name.split(' ')[0]}/${mediaPhotographer.image}`;
                mediaTitle.textContent = mediaPhotographer.title;
                mediaPrice.textContent = mediaPhotographer.price + '€';
                mediaLikes.textContent = mediaPhotographer.likes;
                mediaHeart.src = 'assets/icons/heart.svg';
                mediaHeart.alt = 'likes';
                mediaHeart.setAttribute('aria-label', 'likes');
                // if video
                if (mediaPhotographer.video) {

                    mediaImg = document.createElement('video');
                    mediaImg.classList.add('media_video');
                    mediaImg.src = `assets/photographers/${photographer.name.split(' ')[0]}/${mediaPhotographer.video}`;
                    mediaImg.setAttribute('controls', '');
                    mediaImg.setAttribute('type', 'video/mp4');
                    mediaImg.setAttribute('preload', 'metadata');
                    mediaImg.setAttribute('alt', mediaPhotographer.title);
                    mediaImg.setAttribute('aria-label', mediaPhotographer.title);
                    mediaPhotographer.image = mediaPhotographer.video;
                }
                mediaCard.appendChild(mediaImg);
                mediaCard.appendChild(mediaTitle);
                mediaCard.appendChild(mediaPrice);
                mediaCard.appendChild(mediaLikes);
                mediaCard.appendChild(mediaHeart);
                mediaGallery.appendChild(mediaCard);
                mediaSection.appendChild(mediaGallery);
                if (mediaPhotographer.image) {
                    mediaImg.src = `assets/photographers/${photographer.name.split(' ')[0]}/${mediaPhotographer.image}`;
                } else {
                    // console.error('mediaPhotographer.image is undefined');

                }
                //   console.log(mediaPhotographer)

            }
        )
    }

    updateMediaGallery(mediaPhotographer);

});
