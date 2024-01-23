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
    let header = document.createElement('header');
    header.classList.add('photographer_header');
    let title = document.createElement('h1');
    title.textContent = photographer.name;
    title.classList.add('photographer_name');
    let city = document.createElement('h2');
    city.textContent = photographer.city + ', ' + photographer.country;
    city.classList.add('photographer_location');
    let tagline = document.createElement('p');
    tagline.textContent = photographer.tagline;
    tagline.classList.add('photographer_tagline');
    photographerProfile.appendChild(header);
    header.appendChild(title);
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
    img.setAttribute('alt', photographer.name);
    photographerPhoto.appendChild(img);
    photographersSection.appendChild(photographerPhoto);

    //Sort
    const sortButton = document.querySelector('.sort_button');
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
                ' alt="flèche" aria-label="flèche"/>';
        });
        buttons.forEach(button => {
            button.style.borderTop = "1px solid white";
        });
    });

    function updateMediaGallery(sortedMedia) {

        //little box with likes and price per day on the bottom right of the page
        const likes = document.querySelector('.likes');
        const price = document.querySelector('.price_jour');
        let totalLikes = mediaPhotographer.reduce((total, media) => total + media["likes"], 0);
        let total = photographer.price;
        likes.textContent = totalLikes;
        price.textContent = total;
        //console.log(totalLikes);
        //console.log(total);

        function totalLike() {
            likes.textContent = mediaPhotographer.reduce((total, media) => total + media["likes"], 0);
        }

        mediaGallery.innerHTML = '';
        sortedMedia.forEach((mediaPhotographer) => {
                mediaGallery.classList.add('media_gallery');
                const mediaCard = document.createElement('div');
                mediaCard.classList.add('media_card');
                mediaCard.classList.add('modal_button');
                mediaCard.setAttribute('aria-label', mediaPhotographer.title);
                mediaCard.setAttribute('tabindex', '0');
                let mediaImg = document.createElement('img');
                mediaImg.classList.add('media_img');
                mediaImg.setAttribute('alt', mediaPhotographer.title);
                const mediaHeader = document.createElement('div');
                mediaHeader.classList.add('media_header');
                const mediaTitle = document.createElement('h2');
                mediaTitle.classList.add('media_title');

                const mediaLikesContainer = document.createElement('div');
                mediaLikesContainer.classList.add('media_likes_container');
                const mediaLikes = document.createElement('p');
                mediaLikes.classList.add('media_likes');

                const mediaHeart = document.createElement('a');

                mediaHeart.addEventListener('click', () => {
                    if (!mediaPhotographer.liked) {
                        mediaPhotographer.liked = true;
                        mediaPhotographer["likes"]++;
                        mediaLikes.textContent = mediaPhotographer["likes"];
                        totalLike();
                    } else {
                        mediaPhotographer.liked = false;
                        mediaPhotographer["likes"]--;
                        mediaLikes.textContent = mediaPhotographer["likes"];
                        totalLike();
                    }
                });
                const mediaHeartImg = document.createElement('img');

                mediaHeartImg.src = 'assets/icons/heart.svg';
                mediaHeartImg.alt = 'likes';
                mediaHeart.appendChild(mediaHeartImg);
                mediaHeart.setAttribute('aria-label', 'likes');
                mediaHeart.classList.add('media_heart');

                if (mediaPhotographer.video) {

                    mediaImg = document.createElement('video');
                    mediaImg.classList.add('media_video');
                    mediaImg.src = `assets/photographers/${photographer.name.split(' ')[0]}/${mediaPhotographer.video}`;
                    mediaImg.setAttribute('type', 'video/mp4');
                    mediaImg.setAttribute('preload', 'metadata');
                    mediaImg.setAttribute('alt', mediaPhotographer.title);
                    mediaImg.setAttribute('aria-label', mediaPhotographer.title);
                    mediaPhotographer.image = mediaPhotographer.video;
                } else {
                    mediaImg.src = `assets/photographers/${photographer.name.split(' ')[0]}/${mediaPhotographer.image}`;
                }
                //console.log(mediaImg);
                mediaTitle.textContent = mediaPhotographer.title;
                mediaLikes.textContent = mediaPhotographer["likes"];
                // if video
                mediaCard.appendChild(mediaImg);
                mediaCard.appendChild(mediaHeader);
                mediaHeader.appendChild(mediaTitle);
                mediaHeader.appendChild(mediaLikesContainer);
                mediaLikesContainer.appendChild(mediaLikes);
                mediaLikesContainer.appendChild(mediaHeart);
                mediaGallery.appendChild(mediaCard);
                mediaSection.appendChild(mediaGallery);

                addEventListenersToGalleryItems();

                // console.error('mediaPhotographer.image is undefined');


                //   console.log(mediaPhotographer)
            }
        )
    }

    sortByLikes();
    updateMediaGallery(mediaPhotographer);

    // Modal
    const modal = document.createElement('div');
    modal.style.display = 'none';
    modal.classList.add('modalGallery');
    document.body.appendChild(modal);

    const modalPrev = document.createElement('a');
    modalPrev.classList.add('modal_prev');
    modalPrev.setAttribute('aria-label', 'précédent');
    const modalPrevImg = document.createElement('img');
    modalPrevImg.src = 'assets/icons/prev.svg';
    modalPrevImg.alt = 'prev';
    modalPrev.appendChild(modalPrevImg);
    modal.appendChild(modalPrev);

    let ObjectDiv = document.createElement('div');
    ObjectDiv.classList.add('object_div');
    modal.appendChild(ObjectDiv);

    let ObjectContainer = document.createElement('div');
    ObjectContainer.classList.add('object_container');
    ObjectDiv.appendChild(ObjectContainer);
    let ObjectModal = document.createElement('object');
    ObjectContainer.appendChild(ObjectModal);
    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('modal_title');
    modalTitle.textContent = "empty"
    ObjectDiv.appendChild(modalTitle);


    let currentIndex = 0; // Ajoutez cette ligne en haut de votre script

    addEventListenersToGalleryItems();


    const modalNext = document.createElement('a');
    modalNext.classList.add('modal_next');
    modalNext.setAttribute('aria-label', 'suivant');
    const modalNextImg = document.createElement('img');
    modalNextImg.src = 'assets/icons/next.svg';
    modalNextImg.alt = 'next';
    modalNext.appendChild(modalNextImg);
    modal.appendChild(modalNext);

    const closeButton = document.createElement('a');
    closeButton.classList.add('modal_close');
    closeButton.setAttribute('aria-label', 'fermer');
    const closeImg = document.createElement('img');
    closeImg.src = 'assets/icons/close_modal.svg';
    closeImg.alt = 'close';
    closeButton.appendChild(closeImg);
    modal.appendChild(closeButton);


    function createMediaElement(index) {
        let mediaElement;
        let mediaSource = "assets/photographers/" + photographer.name.split(' ')[0] + "/";
        if (mediaPhotographer[index].video) {
            mediaElement = document.createElement('video');
            mediaSource += mediaPhotographer[index].video;
            mediaElement.setAttribute('controls', '');
            mediaElement.classList.add('modal_video');
            mediaElement.src = mediaSource; // Utilisez la propriété 'src' pour les éléments 'video'
        } else {
            mediaElement = document.createElement('img');
            mediaSource += mediaPhotographer[index].image;
            mediaElement.classList.add('modal_img');
            mediaElement.src = mediaSource; // Utilisez la propriété 'data' pour les éléments 'object'
        }
        ObjectModal.replaceWith(mediaElement);
        ObjectModal = mediaElement;
        ObjectModal.tabIndex = -1;
    }


    function addEventListenersToGalleryItems() {
        const mediaElements = document.querySelectorAll('.media_card');
        mediaElements.forEach((mediaElement, index) => {
            mediaElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    modal.style.display = 'flex';
                    currentIndex = index; // Mettez à jour l’index ici
                    createMediaElement(currentIndex);
                    modalTitle.textContent = mediaPhotographer[currentIndex].title;
                }
            });
            const mediaImgOrVideo = mediaElement.querySelector('.media_img') || mediaElement.querySelector('.media_video');
            mediaImgOrVideo.addEventListener('click', () => {
                modal.style.display = 'flex';
                currentIndex = index; // Mettez à jour l’index ici
                createMediaElement(currentIndex);
                modalTitle.textContent = mediaPhotographer[currentIndex].title;
            });
        });
    }

    modalPrev.addEventListener('click', () => {
        currentIndex = currentIndex === 0 ? mediaPhotographer.length - 1 : currentIndex - 1;
        if (currentIndex >= 0 && currentIndex < mediaPhotographer.length) {
            createMediaElement(currentIndex);
            modalTitle.textContent = mediaPhotographer[currentIndex].title;
        }
    });


    modalNext.addEventListener('click', () => {
        currentIndex = currentIndex === mediaPhotographer.length - 1 ? 0 : currentIndex + 1;
        if (currentIndex >= 0 && currentIndex < mediaPhotographer.length) {
            createMediaElement(currentIndex);
            modalTitle.textContent = mediaPhotographer[currentIndex].title;
        }
    });

    ObjectModal.addEventListener('mousedown', function (event) {
        event.preventDefault();
        document.body.focus();
    });

    document.addEventListener('keydown', (e) => {
        if (document.activeElement === ObjectModal) {
            if ([' ', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
        }

        if (e.key === 'Escape') {
            modal.style.display = 'none';
        } else if (e.key === ' ') {
            e.preventDefault();
            modal.style.display = 'none';
        } else if (e.key === 'ArrowLeft') {
            console.log('left');
            modalPrev.click();
        } else if (e.key === 'ArrowRight') {
            modalNext.click();
            console.log('right');
        }
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });


});
