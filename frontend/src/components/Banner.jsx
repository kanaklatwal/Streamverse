import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import requests from "../api/request.js";

const truncate = (str, n) =>
  str?.length > n ? str.substr(0, n - 1) + "..." : str;

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ]
      );
    }
    fetchData();
  }, []);

  return (
    <header
      className="text-white h-[400px] bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      }}
    >
      <div className="p-6 max-w-xl">
        <h1 className="text-3xl font-bold mb-2">
          {movie?.name || movie?.title}
        </h1>

        <p className="text-sm leading-relaxed">
          {truncate(movie?.overview, 150)}
        </p>
      </div>
    </header>
  );
}

export default Banner;
