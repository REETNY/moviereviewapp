const body = document.querySelector("main");
const movieCont = document.getElementById("movies-cont");
const form = document.querySelector("form");
const submit = document.querySelector("#submit");
const searchBox = document.querySelector("#search-box");

const APIKEY = `0d412a33f7dc6b6e4f1c8e4a2ab8ada4`;
const APIURL = `https://api.themoviedb.org/3/movie/popular?api_key=`;
const imgPath = `https://image.tmdb.org/t/p/w500`;

const APISEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=`;

async function getMoviesByRandom() {
    const serverResponse = await fetch(APIURL+APIKEY+`&language=en-US&page=1`);
    const resp = await serverResponse.json();
    const response = resp.results;
    return response;
}

async function showRandomMovies() {
    const movieDatas = await getMoviesByRandom();
    movieCont.innerHTML = "";
    movieDatas.forEach( (movie) => {
        const eachMovie = document.createElement("div");
        eachMovie.classList.add("eachMovie");
        eachMovie.setAttribute("id", "eachMovie");

        let num = movie.vote_average;

        eachMovie.innerHTML = `
            <div class="img-cont">
            <img src="${imgPath + movie.poster_path}" alt="${movie.title}" class="movie-poster" id="poster">
            </div>
            <div class="movie-details">
                <span class="movie-name">${movie.title}</span>
                <span class="movie-rating">${numberFormater(num)}</span>
            </div>
            <div class="description">
            <h4>Overview:</h4>
                ${movie.overview}
            </div>
        `

        function numberFormater(num){
            const data = num.toString();
            if(data.length === 1){
                return `${num}.0`;
            }else{
                return `${num}`;
            }
        }

        const img = eachMovie.querySelector(".movie-rating");
        if(movie.vote_average > 7.5){
            img.setAttribute("id", "green");
        }else if(movie.vote_average > 5.5){
            img.setAttribute("id", "yellow");
        }else{
            img.setAttribute("id", "red");
        }
        movieCont.appendChild(eachMovie);
    })
}

showRandomMovies();



async function getMoviesBySearch(text) {
    const serverResponse = await fetch(APISEARCH + text);
    const resp = await serverResponse.json();
    const response = resp;
    return response;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
})

submit.addEventListener("click", async() => {
    let userInput = searchBox.value;
    searchBox.value = "";
    movieCont.innerHTML = "";
    const reply = await getMoviesBySearch(userInput);
    const movieDatas = reply.results;

    if(userInput === ""){
        showRandomMovies();
    }
    
    movieDatas.forEach( (movie) => {
        const eachMovie = document.createElement("div");
        eachMovie.classList.add("eachMovie");
        eachMovie.setAttribute("id", "eachMovie");

        eachMovie.innerHTML = `
            <div class="img-cont">
            <img src="${imgPath + movie.poster_path}" alt="${movie.title}" class="movie-poster" id="poster">
            </div>
            <div class="movie-details">
                <span class="movie-name">${movie.title}</span>
                <span class="movie-rating">${numberFormater(movie.vote_average)}</span>
            </div>
            <div class="description">
                <h4>Overview:</h4>
                ${movie.overview}
            </div>
        `

        function numberFormater(num){
            const data = num.toString();
            if(data.length === 1){
                return `${num}.0`;
            }else{
                return `${num}`;
            }
        }

        const img = eachMovie.querySelector(".movie-rating");
        if(movie.vote_average > 7.5){
            img.setAttribute("id", "green");
        }else if(movie.vote_average > 5.5){
            img.setAttribute("id", "yellow");
        }else{
            img.setAttribute("id", "red");
        }
        movieCont.appendChild(eachMovie);
    })
})