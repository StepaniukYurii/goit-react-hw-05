import { useState, useEffect } from "react";
import { MovieList } from "../components/MovieList";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "53322783e949c8f8bd2d757ea1bc6689";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzMyMjc4M2U5NDljOGY4YmQyZDc1N2VhMWJjNjY4OSIsIm5iZiI6MTczMzc1NjMxNC4wMSwic3ViIjoiNjc1NzA1OWE5Y2MwYjZmYzMxOWE3NGMxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.WmL5rqwIUeyjrD8F6SbPRjNoZV2_ZlEczbdPMybUx5k";

export const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${TOKEN}` },
          params: {
            api_key: API_KEY,
            query,
            include_adult: false,
            language: "en-US",
            page: 1,
          },
        });
        setMovies(response.data.results || []);
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const inputQuery = form.elements.query.value.trim();
    setSearchParams(inputQuery ? { query: inputQuery } : {});
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};
