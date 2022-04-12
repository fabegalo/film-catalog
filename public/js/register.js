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

        uploadImage: false,

        imgSrc: "",

        filmName: "",
        data: "",


        showMessage() {
            console.log(this.message)
        },

        getImage() {
            this.uploadImage = true
            console.log(this.imgSrc)
        },

        saveFilm() {
            obj.film.push({ nome: this.filmName, data: this.data, url: this.imgSrc })

            json = JSON.stringify(obj); //convert it back to json

            this.createFilm(json);
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