// stores/counter.js
import axios from 'axios';
import { defineStore } from 'pinia'
import { reactive, ref, watch, computed, inject, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export const useRequestsStore = defineStore('requests', () => {
    const ApiKey = "11014907a552719550c04a15023b913d";
    const MoviesList = ref(null);
    const TopratedMovies = ref(null);
    //loading indicator
    const loading = false;
    const currentPage = ref(1);
    const watchList = ref();
    const genresList = ref();
    const LanguagesList = ref([]);
    //bookmark
    const bookmarkList = ref([]);
    const bookmarkMoviesList = ref({});

    // const getBookmarkList = computed(() => bookmarkList.value);
    const $cookies = inject("$cookies");
    function inializebookmarkList() {
        if ($cookies.isKey("bookmarkList"))
            bookmarkList.value = $cookies.get("bookmarkList");
        else $cookies.set("bookmarkList", [])
        console.log("bookmarkList initialized")
    }
    // bookmark movie clicked
    function bookmarkClicked(x) {
        // check if Movie exist in Bookmark and add it to bookmarkList 
        if (!bookmarkList.value.includes(x)) bookmarkList.value.push(x);
        // or remove it if doesn't exist
        else bookmarkList.value.splice(bookmarkList.value.indexOf(x), 1)
        //   Then set bookmarkList to the cookies
        $cookies.set("bookmarkList", bookmarkList.value)
    }

    // inialize bookmark Movies
    function inializebookmarkMovies() {
        // currentPage.value = 1
        inializebookmarkList()
        // initialize all requests to get movie details by id form bookmark list
        var requests = bookmarkList.value.map(movie_id => axios.get(` https://api.themoviedb.org/3/movie/${movie_id}?api_key=${ApiKey}&language=en-US`))
        // make request & initialize bookmarkMoviesList
        axios.all(requests).then(rep => {

            bookmarkMoviesList.value.results = rep.map(data => data.data)
            bookmarkMoviesList.value.total_results = bookmarkList.value.length
        });

    }

    //Movie search 
    //search by text 
    const searchText = ref('');
    const router = useRouter()
    const route = useRoute()


    watch(searchText, (val) => {
        resetSearchFilter()

        currentPage.value = 1
        if (route.name == "home") {
          
            if (val) {
                router.push({ path: "/", query: { search: val } });
            }
            else { router.push({ path: "/" }); }
        
            getMovies();
        }

    });


    //selected Filter
    var searchFilter = reactive({ genres: [], rating: "", language: "" });




    //List Infos

    //pages
    const pages = ref();
    const currentList = ref();

    //get watch list from cookies
    // function getWatchList() {


    // }
    // get List of Languages 
    async function getLanguages() {

        await axios.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${ApiKey}`)
            .then((rep) => LanguagesList.value = rep.data)
    }

    //Get List of  Movies Genres
    function getGenres() {

        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${ApiKey}&language=en-US`)
            .then((rep) => genresList.value = rep.data.genres);

    }

    function selectGenre(genre) {
        if (searchFilter.genres.includes(genre))
            searchFilter.genres.splice(searchFilter.genres.indexOf(genre), 1);
        else searchFilter.genres.push(genre);
    }

    function resetSearchFilter() {
        searchFilter.genres = [];
        searchFilter.rating = "";
        searchFilter.language = LanguagesList.value.find(
            (e) => e.iso_639_1 == "xx"
        );
    }
    function checkSearchFilter() {
        return (searchFilter.genres.length == 0 && (searchFilter.rating == "" || searchFilter.rating.length == 0) && (searchFilter.language == "" || searchFilter.language.iso_639_1 == "xx"))
    }
    //apply filter
    function applyFilters() {
        if (checkSearchFilter()) getTopRatedMovies();
        else TopratedMovies.value = null

        currentPage.value = 1;
        // console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${ApiKey}&with_original_language=${searchFilter.language.iso_639_1}&vote_average.lte=${searchFilter.rating}&vote_average.gte=${searchFilter.rating}&page=1&with_genres=${searchFilter.genres.toString()}`);
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${ApiKey}&with_original_language=${searchFilter.language.iso_639_1}&vote_average.lte=${searchFilter.rating}&vote_average.gte=${searchFilter.rating}&page=1&with_genres=${searchFilter.genres.map(g => g.id).toString()}`)
            .then((rep) => MoviesList.value = rep.data).finally(() => console.log(MoviesList.value));


    }

    // Get Top rated movies
    function getTopRatedMovies() {

        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${ApiKey}&language=en-US&page=1`)
            .then((rep) => TopratedMovies.value = rep.data);

    }

    //Get List of Latest Movies
    function getMovies(page = 1) {
        // currentPage.value = 1
        console.log(`poka =>${searchText.value}`);
        var urlRequest = ``;
        if (searchText.value != '') {
            TopratedMovies.value = null
            urlRequest = `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&page=${page}&query=${searchText.value}`;
        }

        else {
            console.log('d8lt');
            getTopRatedMovies()
            urlRequest = `https://api.themoviedb.org/3/movie/upcoming?api_key=${ApiKey}&language=en-US&page=${page}`;
        }


        axios.get(urlRequest)
            .then((rep) => MoviesList.value = rep.data).finally(() => console.log(MoviesList.value));


        // axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${ApiKey}&language=en-US&page=${page}`)
        //     .then((rep) => TopRatedMovies.value = rep.data).finally(() => console.log(TopRatedMovies.value));




    }

    //Search movies
    // function searchMovies() {

    // }

    //get full image url using path
    const getImage = (path, quality = "original") => path ?
        `https://image.tmdb.org/t/p/${quality}${path}` :
        `/not-found.png`;



    async function getMovieByid(movie_id) {
        var movie = null;
        // console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${ApiKey}&with_original_language=${searchFilter.language.iso_639_1}&vote_average.lte=${searchFilter.rating}&vote_average.gte=${searchFilter.rating}&page=1&with_genres=${searchFilter.genres.toString()}`);
        await axios.get(` https://api.themoviedb.org/3/movie/${movie_id}?api_key=${ApiKey}&language=en-US`)
            .then((rep) => movie = rep.data).catch((err) => movie = "error");

        return movie

    }

    return {
       getMovies, getTopRatedMovies, getGenres, selectGenre, getImage, getLanguages, inializebookmarkList, bookmarkClicked, applyFilters, inializebookmarkMovies,
        getMovieByid, checkSearchFilter,
        searchFilter, genresList, searchText, MoviesList, TopratedMovies, LanguagesList, bookmarkList, currentPage, bookmarkMoviesList,
    }
})
