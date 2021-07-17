const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

let getWorstMovies = () =>{
  let options = {
    method:'GET',
    url:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&region=US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
    headers:{
      "User-Agent": "request",
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'd6d371fbeb2fcc92cdcb10e6f6b97b97'

    }
  }
  let listOfMovies = [];

  return axios(options)
  .then(res => {
    //console.log(res.data.results)
    res.data.results.map(movie => {
      listOfMovies.push({
        title: movie.original_title,
        genres: movie.genre_ids,
        releaseD: movie.release_date,
        popularity: movie.popularity,
        voteCt: movie.vote_count
      })
    })
    return listOfMovies;
  })
  .then(list => {
    return list;
  })
  .catch(err => {
    console.log(err);
  })

}

let getGenres =() => {
  let options = {
    method:'GET',
    url:`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    headers:{
      "User-Agent": "request",
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'd6d371fbeb2fcc92cdcb10e6f6b97b97'
    }
  }
  return axios(options)
    .then(res=> {
      return res.data.genres;
    })
    .catch(err => {
      console.log(err);
    })
}

//console.log(getGenres())
// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

// Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmQzNzFmYmViMmZjYzkyY2RjYjEwZTZmNmI5N2I5NyIsInN1YiI6IjYwNjhmODRkMWNjNGZmMDA0MDM2MzRjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C9o0w8cHbuIZg0OTWw4MIn9XWVf24Xko86hvoOP7vTY'

module.exports = { getWorstMovies,
getGenres
}