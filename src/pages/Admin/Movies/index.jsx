import React, { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loaderSlice";
import { DeleteMovie, GetAllMovie } from "../../../apis/movies";
import { getDate } from "../../../helpers";
function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getMovies = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllMovie();
      setMovies(response.movies);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  const deleteMovie = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteMovie(id);
      message.success(response.message);
      getMovies();
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  const columns = [
    {
      title: "Movie",
      dataIndex: "movie",
      render: (text, record) => {
        const imageUrl = record?.posters?.[0] || "";
        return (
          <img
            key={record._id}
            src={imageUrl}
            alt=""
            className="w-20 h-20 rounded"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text) => getDate(text),
    },
    {
      title: "Genre",
      dtaIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div key={record._id} className="flex gap-2">
            <i
              className="ri-delete-bin-7-line mr-5"
              onClick={() => deleteMovie(record._id)}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                navigate(`/admin/movies/edit/${record._id}`);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={() => navigate("/admin/movies/add")}>Add Movie</Button>
      </div>
      <div className="mt-5">
        <Table dataSource={movies} columns={columns} />
      </div>
    </div>
  );
}

export default Movies;
