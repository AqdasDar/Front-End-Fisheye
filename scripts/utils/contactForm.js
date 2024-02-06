// Définition de la fonction displayModal
function displayModal() {
    // Récupération de l’élément modal par son identifiant
    const modal = document.getElementById("contact_modal");
    // Affichage de l'élément modal
    modal.style.display = "block";

    // Récupération de tous les éléments pouvant recevoir le focus dans le modal
    const allFocusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    // Récupération du premier et du dernier élément pouvant recevoir le focus
    const firstFocusableElement = allFocusableElements[1];
    const lastFocusableElement = allFocusableElements[allFocusableElements.length - 1];

    // Ajout d'un écouteur d'événement pour gérer la navigation au clavier dans le modal
    modal.addEventListener('keydown', function (e) {
        let isTabPressed = (e.key === 'Tab');
        if (!isTabPressed) {
            return;
        }
        if (e.shiftKey) /* shift + tab */ {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else /* tab */ {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    });

    // Mise en avant du modal
    modal.style.zIndex = "1";
    // Focus sur le premier élément pouvant recevoir le focus
    firstFocusableElement.focus();
}

// Ajout d'un écouteur d'événement pour fermer le modal avec la touche E chap
document.addEventListener('keydown', (e) => {
        if (e.key === 'Esc' || e.key === 'Escape') {
            const contactModal = document.getElementById("contact_modal");
            if (contactModal.style.display === "block") {
                closeModal();
            }
        }
    }
);

// Définition de la fonction closeModal
function closeModal() {
    const modal = document.getElementById("contact_modal");
    // Masquage du modal
    modal.style.display = "none";
    // Mise en arrière du modal
    modal.style.zIndex = "-1";
}

// Récupération du nom du photographe pour le titre du modal
let modalTitleName = document.getElementById("photographer_name");
getPhotographers().then(data => {
    let params = new URL(document.location).searchParams;
    let id = Number(params.get('id'));

    const photographer = data["photographers"].find(photographer => photographer.id === id);
    modalTitleName.textContent = photographer.name;
});

// Gestion du formulaire de contact
const form = document.getElementById("contact_form");
const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const email = document.getElementById("email");
const message = document.getElementById("message");

// Ajout d'un écouteur d'événement pour gérer la soumission du formulaire
form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
});

// Définition de la fonction validateForm
function validateForm() {
    // Récupération des valeurs des champs du formulaire
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();
    // Expression régulière pour valider une adresse email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const error = document.getElementById("error_message");

    // Vérification des valeurs des champs et affichage d'un message d'erreur si nécessaire
    if (firstNameValue === "") {
        error.textContent = "Veuillez entrer votre prénom";
        firstName.focus();
        return false;
    } else if (lastNameValue === "") {
        error.textContent = "Veuillez entrer votre nom";
        lastName.focus();
        return false;
    } else if (emailValue === "") {
        error.textContent = "Veuillez entrer votre email";
        email.focus();
        return false;
    } else if (!emailRegex.test(emailValue)) {
        error.textContent = "Veuillez entrer une adresse email valide";
        email.focus();
        return false;
    } else if (messageValue === "") {
        error.textContent = "Veuillez entrer votre message";
        message.focus();
        return false;
    } else {
        // Si toutes les vérifications sont passées, le formulaire est considéré comme valide
        console.log("Formulaire envoyé");
        console.log(firstNameValue);
        console.log(lastNameValue);
        console.log(emailValue);
        console.log(messageValue);
    }
}
