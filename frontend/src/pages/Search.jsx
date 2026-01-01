import { useEffect, useState } from "react";
import axios from "../api/axios";
import Row from "../components/Row";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchSearch = async () => {
      const res = await axios.get(`/search/multi?query=${query}`);
      setResults(res.data.results);
    };

    fetchSearch();
  }, [query]);

  return (
    <div className="pt-24">
      <div className="px-6 mb-6">
        <input
          type="text"
          placeholder="Search movies or TV shows"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 bg-black text-white border border-gray-600 rounded"
        />
      </div>

      <Row title="Search Results" moviesData={results} />
    </div>
  );
}

export default Search;
