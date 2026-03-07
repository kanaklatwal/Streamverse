import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
const navigate = useNavigate();
const location = useLocation();

const isLoggedIn = !!localStorage.getItem("token");

// login / register page par navbar hide
if (location.pathname === "/login" || location.pathname === "/register") {
return null;
}

return ( <div className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-black">

  {/* NETFLIX LOGO */}
  <h1
    className="text-red-600 text-2xl font-bold cursor-pointer"
    onClick={() => navigate("/")}
  >
    NETFLIX
  </h1>

  <div className="flex items-center space-x-4">

    {/* Home button sirf profile page par */}
    {location.pathname === "/profile" && (
      <button
        onClick={() => navigate("/")}
        className="text-white hover:text-gray-300"
      >
        Home
      </button>
    )}

    <button
      onClick={() => navigate("/search")}
      className="text-white hover:text-gray-300"
    >
      Search
    </button>

    {!isLoggedIn ? (
      <button
        onClick={() => navigate("/login")}
        className="bg-red-600 px-4 py-1 rounded text-white"
      >
        Sign In
      </button>
    ) : (
      <button
        onClick={() => navigate("/profile")}
        className="bg-gray-700 px-4 py-1 rounded text-white hover:bg-gray-600"
      >
        Profile
      </button>
    )}

  </div>
</div>

);
}

export default Navbar;
