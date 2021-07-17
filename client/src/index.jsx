import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from "./components/Search.jsx";
import Movies from "./components/Movies.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [{ deway: "movies" }],
      favorites: [{ deway: "favorites" }],
      genreSelected: 0,
      showFaves: false,
    };
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // you might have to do something important here!
  }

  handleChange(e) {
    console.log(e.target.value)
    this.setState({ genreSelected: e.target.value });
    e.preventDefault();
  }

  handleSubmit(e) {
    // alert("Your favorite genre is: " + this.state.genreSelected);
    this.getMovies(this.state.genreSelected );
    e.preventDefault();
  }

  // make an axios request to your server on the GET SEARCH endpoint
  getMovies(id) {
    let genreId = { genreId: id };
    console.log('in getmovies ', genreId)
    axios.get('/search', { params: genreId } )
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }

  saveMovie() {
    // same as above but do something diff
  }

  deleteMovie() {
    // same as above but do something diff
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves,
    });
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            genreSelected={this.state.genreSelected}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />

          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
