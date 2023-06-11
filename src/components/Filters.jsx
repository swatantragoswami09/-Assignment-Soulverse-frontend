import React, { useEffect, useState } from "react";
import { message } from "antd";
import { GetQuickSearchFilterResults } from "../apis/filters";
import { useNavigate } from "react-router-dom";

function Filters({ filters, setFilters }) {
  const [hideResults, setHideResults] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await GetQuickSearchFilterResults(filters);
      setResults(response.data);
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (filters.search) {
      // use debounce here
      const debounce = setTimeout(() => {
        getData();
      }, 500);
      return () => clearTimeout();
    }
  }, [filters.search]);

  return (
    <div className="mb-5 w-1/2 relative">
      <input
        type="text"
        placeholder="Search movies"
        className="w-1/2"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        onBlur={() => {
          setTimeout(() => {
            setHideResults(true);
          }, 200);
        }}
      />
      {/* results div */}
      {filters.search && (
        <div className="quick-search-results">
          {results?.movies?.length > 0 &&
            results?.movies?.map((movie) => {
              return (
                <>
                  <div
                    key={movie?._id}
                    className="flex gap-10items-center border p-2 cursor-pointer mt-2"
                    onClick={() => navigate(`/movie/${movie?._id}`)}
                  >
                    <img
                      src={movie?.posters[0]}
                      alt=""
                      className="h-10 w-10 rounded"
                    />
                    <div className="flex flex-col ml-5">
                      <span className="font-semibold text-gray-600 text-md">
                        {movie?.name}
                      </span>
                      <span className="text-sm">Movie</span>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Filters;
