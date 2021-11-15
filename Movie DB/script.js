const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=495929e07087fc60f588e4637b6e89ad&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=495929e07087fc60f588e4637b6e89ad&query=`;
const main = document.getElementById("main");
const form = document.getElementById("search-form");
const search = document.getElementById("search");
const swapSpaceReg = /\s/g;

getMovieData(API_URL);

async function getMovieData(url) {
    const res = await fetch(url);
    const data = await res.json();
    displayMovies(data.results);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let movieName = search.value;
    if (movieName && movieName != "") {
        getSeachData(SEARCH_API, movieName);
    } else {
        window.location.reload();
    }
});

async function getSeachData(url, name) {
    const nameQuery = name.replace(swapSpaceReg, "+");
    const res = await fetch(url + nameQuery);
    const data = await res.json();
    displayMovies(data.results);
}

function displayMovies(movies) {
    main.innerHTML = "";

    movies.forEach((movie) => {
        let {
            title,
            vote_average,
            overview,
            release_date,
            poster_path: image_url,
        } = movie;
        if (image_url === null) {
            image_url = "./img/unavailable.jpg";
        } else {
            image_url = IMG_PATH + image_url;
        }
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `           
        <img src="${image_url}" alt="" srcset="">
        <div class="info">
            <div class="general">
                <h3>${title}</h3>
                <p>${release_date}</p>
            </div>

            <span class="${
                vote_average > 8 ? "green" : vote_average > 5 ? "orange" : "red"
            }">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>${overview}</p>
        </div>
        `;

        main.appendChild(movieElement);
    });
}
