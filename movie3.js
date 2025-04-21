const API_URL="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1",IMG_PATH="https://image.tmdb.org/t/p/w1280",SEARCH_API='https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="',main=document.getElementById("main"),form=document.getElementById("form"),search=document.getElementById("search");async function getMovies(e){let a=await fetch(e),t=await a.json();showMovies(t.results)}function showMovies(e){main.innerHTML="",e.forEach(e=>{let{title:a,poster_path:t,vote_average:i,overview:s}=e,o=document.createElement("div");o.classList.add("movie"),o.innerHTML=`
            <img src="${"https://image.tmdb.org/t/p/w1280"+t}" alt="${a}">
            <div class="movie-info">
          <h3>${a}</h3>
          <span class="${getClassByRate(i)}">${i}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${s}
        </div>
        `,main.appendChild(o)})}function getClassByRate(e){return e>=8?"green":e>=5?"orange":"red"}getMovies("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1"),form.addEventListener("submit",e=>{e.preventDefault();let a=search.value;a&&""!==a?(getMovies('https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'+a),search.value=""):window.location.reload()});
