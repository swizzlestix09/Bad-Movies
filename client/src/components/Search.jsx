import React from 'react';
import axios from'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
  }
  //make an axios request in this component to get the list of genres from your endpoint GET GENRES
  componentDidMount(){
    this.getGenres();
  }

  getGenres() {
    axios.get("/genres")
    .then(info => {
      let prevState = this.state.genres;
      let allGenres = info.data;
      this.setState( {genres: prevState.concat( ...allGenres)}, ()=> console.log(this.state.genres))
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {

    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select>
          {this.state.genres.map(genre => {
            //console.log(genre);
            return <option key={genre.id} value={`${genre.name}`}>{genre.name}</option>
          })}
        </select>
        <br/><br/>

        <button>Search</button>

      </div>
    );
  }
}

export default Search;