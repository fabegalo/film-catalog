function home() {
    return {

        films: [],

        async getFilms() {

            this.films = await (await fetch('http://localhost:3000/films')).json();

            console.log(this.films);
        },
    }
}