import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function Row({ title, fetchUrl, moviesData }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetchUrl) return;

    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const data = moviesData || movies;

  return (
    <div className="text-white px-6">
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {data.map((movie) => {
          if (!movie.poster_path) return null;

          const contentType =
            movie.media_type ||
            (fetchUrl?.includes("/tv") ? "tv" : "movie");

          return (
            <img
              key={movie.id}
              onClick={() =>
                navigate(`/movie/${contentType}/${movie.id}`)
              }
              className="w-40 object-cover rounded cursor-pointer hover:scale-110 transition"
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Row;
