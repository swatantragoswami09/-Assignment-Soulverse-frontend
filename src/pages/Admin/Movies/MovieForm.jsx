import { Button, Form, Select, Tabs, message } from "antd";
import React, { useEffect, useState } from "react";
import { antvalidationError } from "../../../helpers";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loaderSlice";
import { GetAllArtists } from "../../../apis/artist";
import { AddMovie, GetMovieById } from "../../../apis/movies";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function MovieForm() {
  const [artists = [], setArtists] = useState([]);
  const [movie, setMovie] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const getArtists = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllArtists();
      setArtists(
        response.data.map((artist) => ({
          value: artist._id,
          label: artist.name,
        }))
      );
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await AddMovie(values);
      message.success(response.message);
      dispatch(SetLoading(false));
      navigate("/admin/movies");
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  React.useEffect(() => {
    getArtists();
  }, []);

  const getMovie = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await GetMovieById(id);
      console.log("get movie by id =>", response.movie);

      setMovie(response.movie);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  useEffect(() => {
    if (params?.id) {
      getMovie(params.id);
    }
  }, []);

  return (
    <div>
      (movie || !params.id) && (
      <h1 className="text-gray-600 text-xl font-semibold">Add movie</h1>
      <Tabs>
        <Tabs.TabPane tab="Details" key="1">
          <Form
            layout="vertical"
            className="flex flex-col gap-5"
            onFinish={onFinish}
            initialValues={movie}
          >
            <div className="grid grid-cols-3 gap-5">
              <Form.Item label="Name" name="name" className="col-span-2">
                <input />
              </Form.Item>
              <Form.Item
                label="Release Date"
                name="releaseDate"
                className="col-span-1"
              >
                <input type="date" />
              </Form.Item>
            </div>
            <Form.Item label="Plot" name="plot" className="col-span-1">
              <textarea style={{ width: "100%" }} />
            </Form.Item>
            <div className="grid grid-cols-3 gap-5">
              <Form.Item label="Hero" name="hero">
                <Select options={artists} showSearch mode="multiple"></Select>
              </Form.Item>
              <Form.Item label="Heroine" name="heroine">
                <Select options={artists} showSearch mode="multiple"></Select>
              </Form.Item>
              <Form.Item label="Director" name="director">
                <Select options={artists} showSearch mode="multiple"></Select>
              </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <Form.Item label="Genre" name="genre">
                <Select
                  options={[
                    {
                      label: "Action",
                      value: "action",
                    },

                    {
                      label: "Comedy",
                      value: "comedy",
                    },
                    {
                      label: "Drama",
                      value: "drama",
                    },
                  ]}
                  mode="multiple"
                ></Select>
              </Form.Item>
              <Form.Item label="Language" name="language">
                <Select
                  options={[
                    {
                      label: "English",
                      value: "en",
                    },
                    {
                      label: "Spanish",
                      value: "es",
                    },
                    {
                      label: "French",
                      value: "fr",
                    },
                  ]}
                  mode="multiple"
                ></Select>
              </Form.Item>
              <Form.Item label="Trailer" name="trailer">
                <input type="text" />
              </Form.Item>
            </div>
            <Form.Item label="cast & Crew" name="cast">
              <Select options={artists} mode="tags"></Select>
            </Form.Item>
            <div className="flex justify-end gap-5 mt-5">
              <Button onClick={() => navigate("/admin")}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Posters" key="2"></Tabs.TabPane>
      </Tabs>
      )
    </div>
  );
}

export default MovieForm;
