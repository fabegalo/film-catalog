var obj = {
    film: []
};

function greet() {
    return {
        message: 'Hello Alpine.js',
        messageDisplay: '',
        showMessage() {
            console.log(this.message)
        }
    }
}

function register() {
    return {
        message: 'Hello Alpine.js',
        messageDisplay: '',

        warning: false,

        uploadImage: false,

        imgSrc: "",

        filmName: "",
        data: "",
        autor: "",


        showMessage() {
            console.log(this.message)
        },

        getImage() {

            if (this.checkURL(this.imgSrc)) {
                this.uploadImage = true
            } else {
                this.warning = true;
                this.message = 'URL da Imagem Invalida !!'
                return false;
            }
        },

        checkURL(url) {
            return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
        },

        validaCampos() {
            this.warning = false;

            if (this.filmName.length <= 1) {
                this.warning = true;
                this.message = 'Escolha o Nome do Filme !'
                return false;
            }

            if (this.data.length <= 1) {
                this.warning = true;
                this.message = 'Escolha a Data do Filme !'
                return false;
            }

            if (this.uploadImage != true) {
                this.warning = true;
                this.message = 'Escolha uma Imagem de Capa !'
                return false;
            }

            return true;
        },

        saveFilm() {

            if (this.validaCampos()) {
                obj.film.push({ nome: this.filmName, data: this.data, url: this.imgSrc })

                json = JSON.stringify(obj); //convert it back to json

                this.createFilm(json);
            }

        },

        async createFilm(json) {
            var post = await (await fetch('http://localhost:3000/register', {
                method: 'POST',
                body: json,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }));

            console.log(post);

            window.location.href = "/public";
        },
    }
}