const contactFrom = document.getElementById('contactForm');

contactFrom.addEventListener('submit', (event) => {

    event.preventDefault();

    const firstNameInput = document.getElementById("firstNameInput");
    const lastNameInput = document.getElementById("lastNameInput");
    const emailInput = document.getElementById("emailInput");
    const phoneInput = document.getElementById("phoneInput");
    const messageInput = document.getElementById("messageInput");

    const formData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        message: messageInput.value
    }

    const errors = {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        message: false
    }

    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError')

    firstNameError.style.display = 'none';
    lastNameError.style.display = 'none';
    emailError.style.display = 'none';
    phoneError.style.display = 'none';
    messageError.style.display = 'none';

	const nameRegex = /^[a-zA-Z ]+$/;
	const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
	const telRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    const messageRegex = /^.{6,}$/;

    if (!formData.firstName || !nameRegex.test(formData.firstName)) {
        errors.firstName = true;
        firstNameError.style.display = 'block';
        firstNameInput.focus();
    }
    if (!formData.lastName || !nameRegex.test(formData.lastName)) {
        errors.lastName = true;
        lastNameError.style.display = 'block';
        lastNameInput.focus();
    }    
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = true;
        emailError.style.display = 'block';
        emailInput.focus();
    }
    if (!formData.phone || !telRegex.test(formData.phone)) {
        errors.phone = true;
        phoneError.style.display = 'block';
        phoneInput.focus();
    }
    if (!formData.message || !messageRegex.test(formData.message)) {
        errors.message = true;
        messageError.style.display = 'block';
        messageInput.focus();
    }

    if (!Object.values(errors).includes(true)) {
        console.log(formData);
        contactFrom.reset();

        axios.post("http://212.83.176.255:3030/contact", formData,{

        })
            .then(function (response) {
                console.log(response.data.message);
            })
    }
})