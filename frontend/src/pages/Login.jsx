import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backend from "../api/backend";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await backend.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl p-8 w-[360px]"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
        <p className="text-sm text-center text-gray-600 mt-4">
           Don’t have an account?{" "}
       <span
         onClick={() => navigate("/register")}
          className="text-red-600 cursor-pointer hover:underline"
        >
        Sign up
      </span>
       </p>
      </form>
    </div>
  );
};

export default Login;
