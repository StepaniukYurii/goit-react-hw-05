import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "53322783e949c8f8bd2d757ea1bc6689";

export const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/${movieId}/credits?api_key=${API_KEY}`)
      .then((response) => setCast(response.data.cast))
      .catch(console.error);
  }, [movieId]);

  return (
    <ul>
      {cast.map((member) => (
        <li key={member.cast_id}>{member.name}</li>
      ))}
    </ul>
  );
};
