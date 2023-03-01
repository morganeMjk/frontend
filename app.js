class Carrousel {
    constructor(articles, htmlId) {
        this.articles = articles;
        this.htmlId = htmlId;
        this.carrouselArticleContainer = document.getElementById(htmlId)
        this.indexActuel = 0;
        this.CarrouselElement = document.createElement('p');
        this.display();
    }

    display = () => {

        this.carrouselArticleContainer.innerHTML = "";

        const article = this.articles[this.indexActuel] ;     

        const articleContainer = document.createElement('article');
        articleContainer.classList.add('articles__box');

        const articleIcone = document.createElement('i');

        articleIcone.classList.add('fa-sharp');
        articleIcone.classList.add('fa-solid');
        articleIcone.classList.add(article.icone);
        articleIcone.classList.add('articles__box__logo');

        const articleContent = document.createElement('div');
        articleContent.classList.add('articles__box__texte');

        const articleTitle = document.createElement('h2');
        articleTitle.classList.add('articles__box__texte__titre');
        articleTitle.textContent = article.titre;

        const articleP = document.createElement('p');
        articleP.classList.add('articles__box__texte__p');
        articleP.textContent = article.contenu;

        this.carrouselArticleContainer.appendChild(articleContainer);

        articleContainer.appendChild(articleIcone);
        articleContainer.appendChild(articleContent);
        articleContent.appendChild(articleTitle);
        articleContent.appendChild(articleP);

    }

    suivant = () => {
        if (!this.articles[this.indexActuel + 1]) {
            this.indexActuel = 0;
        } else {
            this.indexActuel += 1;
        }
        this.display();
    }

    precedent = () => {
        if (!this.articles[this.indexActuel - 1]) {
            this.indexActuel = this.articles.length - 1;
        } else {
            this.indexActuel -= 1 ;
        }
        this.display()
    }
}

const articlesArray = [
    {
        icone: "fa-puzzle-piece",
        titre: "Article A",
        contenu: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima repellendus itaque nesciunt repellat dolores."
    },
    {
        icone: "fa-puzzle-piece",
        titre: "Article B",
        contenu: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima repellendus itaque nesciunt repellat dolores."
    },
    {
        icone: "fa-puzzle-piece",
        titre: "Article C",
        contenu: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima repellendus itaque nesciunt repellat dolores."
    },

]

const carrousel1 = new Carrousel(articlesArray, "carrouselContent");

const previousArrow = document.getElementById('precedent');
const nextArrow = document.getElementById('suivant');

previousArrow.addEventListener('click', () => carrousel1.precedent());
nextArrow.addEventListener('click', () => carrousel1.suivant())


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


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