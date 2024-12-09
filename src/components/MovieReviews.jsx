import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "53322783e949c8f8bd2d757ea1bc6689";

export const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/${movieId}/reviews?api_key=${API_KEY}`)
      .then((response) => setReviews(response.data.results))
      .catch(console.error);
  }, [movieId]);

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};
