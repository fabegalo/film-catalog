function home() {
    return {

        films: [],

        async deleteFilm(index) {

            var post = await (await fetch('/delete', {
                method: 'POST',
                body: JSON.stringify({ id: index }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }));

            window.location.href = "/public";
        },

        async getFilms() {

            this.films = await (await fetch('/films')).json();

            console.log(this.films);
        },
    }
}