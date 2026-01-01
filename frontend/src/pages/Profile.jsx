import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backend from "../api/backend";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await backend.get("/user/profile");
        setUser(res.data);
      } catch (err) {
        setError("Please login again");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg w-[400px] shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

        <p className="mb-4">
          <span className="text-gray-400">Name:</span>{" "}
          <span className="font-semibold">{user.name}</span>
        </p>

        <p className="mb-6">
          <span className="text-gray-400">Email:</span>{" "}
          <span className="font-semibold">{user.email}</span>
        </p>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
