import { useParams, useLocation, useNavigate, Outlet, NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '53322783e949c8f8bd2d757ea1bc6689';

export const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const backLocationRef = useRef(location.state?.from || '/movies');
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}${movieId}`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(backLocationRef.current);
  };

  if (!movieDetails) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      <h1>{movieDetails.title}</h1>
      <p>{movieDetails.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
      />
      <div>
        <h2>Additional Information</h2>
        <ul>
          <li>
            <NavLink to="cast" state={{ from: backLocationRef.current }}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={{ from: backLocationRef.current }}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
};