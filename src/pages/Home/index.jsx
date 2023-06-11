import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../redux/loaderSlice";
import { Rate, message } from "antd";
import { GetAllMovie } from "../../apis/movies";
import { useNavigate } from "react-router-dom";
import Filters from "../../components/Filters";
import { getUpcomingMovies } from "../../apis/rapidApi";

function Home() {
  const [filters, setFilters] = useState({ search: "" });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const [movies, setMovies] = useState([]);
  const [rapidMovie, setRapidApi] = useState([]);

  const disptach = useDispatch();

  const getData = async () => {
    try {
      disptach(SetLoading(true));
      const rapidResponse = await getUpcomingMovies();
      setRapidApi(rapidResponse);
      const response = await GetAllMovie();
      setMovies(response.movies);
      disptach(SetLoading(false));
    } catch (error) {
      disptach(SetLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {/* {JSON.stringify(movies)} */}
      <Filters filters={filters} setFilters={setFilters} />
      <h1 className="text-2xl font-semibold text-gray-600">
        Welcome {user?.name}
      </h1>
      <div className="grid grid-cols-1 sm-grid-cols-2 lg:grid-cols-3 gap-10 gap-5 text-gray-600 cursor-pointer">
        {/* movie comming from the backend databse */}
        {/* {movies.map((movie) => {
          return (
            <div
              key={movie._id}
              onClick={() => navigate(`/movie/${movie?._id}`)}
            >
              <img src={movie.posters[0]} alt="" className="h-52 w-full" />
              <h1>{movie?.name}</h1>
              <hr />
              <div className="flex justify-between text-sm">
                <span>Language</span>
                <span className="capitalize">{movie?.language}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Rating</span>
                <Rate disabled defaultValue={movie?.rating || 0} />
              </div>
            </div>
          );
        })} */}

        {/* movie coming from rapid api */}
        {rapidMovie.map((movie) => {
          return (
            <div onClick={() => navigate(`/movie/${movie?._id}`)}>
              <img
                src={movie?.primaryImage?.url}
                alt=""
                className="h-52 w-full"
              />
              <h1>{movie?.titleText?.text}</h1>
              <hr />
              <div className="flex justify-between text-sm">
                <span>Language</span>
                <span className="capitalize">{movie?.language}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Rating</span>
                <Rate disabled defaultValue={movie?.rating || 0} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
