import { useEffect, useState } from "react";
import { MovieList } from "../components/MovieList";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/trending/movie/day";
const API_KEY = "53322783e949c8f8bd2d757ea1bc6689";

export const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}?api_key=${API_KEY}`)
      .then((response) => setMovies(response.data.results))
      .catch(console.error);
  }, []);

  return <MovieList movies={movies} />;
};
