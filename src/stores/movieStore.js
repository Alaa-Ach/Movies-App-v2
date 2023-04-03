import axios from 'axios';
import { defineStore } from "pinia";


export const useMovieStore = defineStore('movieStore', () => {
    const ApiKey = "11014907a552719550c04a15023b913d";

    async function getMovieByid(movie_id) {
        var movie = null;
        // console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${ApiKey}&with_original_language=${searchFilter.language.iso_639_1}&vote_average.lte=${searchFilter.rating}&vote_average.gte=${searchFilter.rating}&page=1&with_genres=${searchFilter.genres.toString()}`);
        await axios.get(` https://api.themoviedb.org/3/movie/${movie_id}?api_key=${ApiKey}&language=en-US`)
            .then((rep) => movie = rep.data).catch((err) => movie = "error");

        return movie

    }

    async function getTrailer(movie_id) {
        var video = null;
        // console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${ApiKey}&with_original_language=${searchFilter.language.iso_639_1}&vote_average.lte=${searchFilter.rating}&vote_average.gte=${searchFilter.rating}&page=1&with_genres=${searchFilter.genres.toString()}`);
        await axios.get(` https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${ApiKey}&language=en-US`)
            .then((rep) => {
                if (!rep.data.results.length == 0)
                    video = rep.data.results.find(v => v.official == true && v.site == "YouTube").key
            })

        return video != null ? `https://www.youtube.com/watch?v=${video.toString()}` : null
    }


    async function getCasts(movie_id) {
        var Director = null;
        var Casts = null
        // console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${ApiKey}&with_original_language=${searchFilter.language.iso_639_1}&vote_average.lte=${searchFilter.rating}&vote_average.gte=${searchFilter.rating}&page=1&with_genres=${searchFilter.genres.toString()}`);
        await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${ApiKey}&language=en-US`)
            .then((rep) => {
                Director = rep.data.crew.find(c => c.job == "Director")
                Casts = rep.data.cast
            })
        return { Director, Casts }

    }
    async function getReviews(movie_id, page = 1) {
        var reviews = null;

        // console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${ApiKey}&with_original_language=${searchFilter.language.iso_639_1}&vote_average.lte=${searchFilter.rating}&vote_average.gte=${searchFilter.rating}&page=1&with_genres=${searchFilter.genres.toString()}`);
        await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${ApiKey}&language=en-US&page=${page}`)
            .then((rep) => {
                reviews = rep.data
            })
        return reviews

    }

    return {
        getMovieByid, getTrailer, getCasts, getReviews
    }

}

)