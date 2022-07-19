function home() {
    return {

        films: [],

        async getFilms() {

            this.films = await (await fetch('/films')).json();

            console.log(this.films);
        },
    }
}