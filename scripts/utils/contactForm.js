function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

let modalTitleName = document.getElementById("photographer_name");
//gestion du formulaire
getPhotographers().then(data => {
//console.log(photographers);
    let params = new URL(document.location).searchParams;
    let id = Number(params.get('id'));

    const photographer = data["photographers"].find(photographer => photographer.id === id);
    //console.log(photographer);
    modalTitleName.textContent = photographer.name;
});


// gestion du formulaire

const form = document.getElementById("contact_form");
const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const button = document.getElementById("submit_button");

//console.log(form);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
});

function validateForm() {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const error = document.getElementById("error_message");

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
        console.log("Formulaire envoyé");
        console.log(firstNameValue);
        console.log(lastNameValue);
        console.log(emailValue);
        console.log(messageValue);

    }
}
