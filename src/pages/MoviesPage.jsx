import { useState } from "react";
import { MovieList } from "../components/MovieList";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "53322783e949c8f8bd2d757ea1bc6689";

export const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    axios
      .get(`${API_URL}?query=${query}&api_key=${API_KEY}`)
      .then((response) => setMovies(response.data.results))
      .catch(console.error);
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies"
      />
      <button onClick={handleSearch}>Search</button>
      <MovieList movies={movies} />
    </>
  );
};
