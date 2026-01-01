import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Row from "./components/Row";
import MovieDetail from "./pages/MovieDetail";
import requests from "./api/request";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* HOME (PROTECTED) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <>
                <Banner />
                <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
                <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
                <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
                <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
                <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
                <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
                <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
                <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
              </>
            </PrivateRoute>
          }
        />

        {/* PROFILE (PROTECTED) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        {/* OTHER ROUTES */}
        <Route path="/movie/:type/:id" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
