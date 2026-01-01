import YouTube from "react-youtube";

function TrailerModal({ trailerKey, onClose }) {
  if (!trailerKey) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="relative w-[90%] md:w-[70%] lg:w-[60%]">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl"
        >
          ✕
        </button>

        <YouTube
          videoId={trailerKey}
          opts={{
            width: "100%",
            height: "400",
            playerVars: { autoplay: 1 },
          }}
        />
      </div>
    </div>
  );
}

export default TrailerModal;
