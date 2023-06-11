import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SetLoading } from "../../redux/loaderSlice";
import { message } from "antd";
import { GetMovieById } from "../../apis/movies";
import { getDate } from "../../helpers";

function MovieInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetMovieById(id);
      console.log("response=>", response);
      setMovie(response.movie);
      dispatch(SetLoading(false));
    } catch (error) {
      console.log("error=>", error);
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    movie && (
      <div>
        {/* <>{JSON.stringify(movie)}</> */}
        <div className="flex gap-10 mb-5">
          <img
            src={movie?.posters[0] || ""}
            alt=""
            className="h-[490px] w-[700px] rounded"
          />
          <div className="flex flex-col">
            <h1 className="text-4xl font-semibold text-gray-600">
              {movie?.name}
            </h1>
            <hr />
            <div className="flex flex-col gap-1 text-gray-600 w-96">
              <div className="flex justify-between">
                <span>
                  <b>Language</b>
                </span>
                <span className="capitalize">{movie?.language}</span>
              </div>
              <div className="flex justify-between">
                <span>
                  <b>Release Date</b>
                </span>
                <span className="capitalize">
                  {getDate(movie?.releaseDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>
                  <b>Genre</b>
                </span>
                <span className="capitalize">{movie?.genere}</span>
              </div>
              <div className="flex justify-between">
                <span>
                  <b>Hero</b>
                </span>
                <span className="capitalize">{movie?.hero?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>
                  <b>Heroine</b>
                </span>
                <span className="capitalize">{movie?.heroine?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>
                  <b>Director</b>
                </span>
                <span className="capitalize">{movie?.director?.name}</span>
              </div>
            </div>
          </div>
        </div>
        <span className="py-5 text-gray-600 text-sm">{movie?.plot}</span>
        <div className="mt-5 flex gap-5">
          {movie?.cast.map((artist) => {
            return (
              <div key={artist?._id} className="">
                <img
                  src={artist?.image[0] || ""}
                  alt=""
                  className="w-20 h-20 rounded"
                />
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default MovieInfo;
