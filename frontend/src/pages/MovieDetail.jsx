import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import YouTube from "react-youtube";
import TrailerModal from "../components/TrailerModal";

function MovieDetail() {
  const { id, type } = useParams(); // type = movie | tv
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");

  // Fetch movie or TV details
  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await axios.get(`/${type}/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Error fetching details:", err);
      }
    }
    fetchMovie();
  }, [id, type]);

  // Play trailer
  const playTrailer = async () => {
    try {
      const res = await axios.get(`/${type}/${id}/videos`);

      const trailer = res.data.results.find(
        (video) =>
          video.site === "YouTube" && video.type === "Trailer"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        alert("Trailer not available");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  if (!movie) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div
      className="min-h-screen text-white p-10 bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="max-w-xl bg-black/70 p-6 rounded">
        <h1 className="text-4xl font-bold mb-4">
          {movie.title || movie.name}
        </h1>

        <p className="mb-3">{movie.overview}</p>

        <button
          onClick={playTrailer}
          className="mt-4 px-6 py-2 bg-red-600 rounded"
        >
          ▶ Play Trailer
        </button>

        {trailerKey && (
          <div className="mt-6">
            <YouTube
              videoId={trailerKey}
              opts={{
                width: "100%",
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
          </div>
        )}
      </div>

      {/* MODAL */}
      <TrailerModal
        trailerKey={trailerKey}
        onClose={() => setTrailerKey("")}
      />
    </div>
  );
}

export default MovieDetail;
