import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtistForm from "./ArtistForm";
import { SetLoading } from "../../../redux/loaderSlice";
import {
  GetAllArtists,
  GetArtistById,
  deleteArtist,
} from "../../../apis/artist";
import { useDispatch } from "react-redux";
import { getDate, getDateTimeFormat } from "../../../helpers";
function Artists() {
  const [artists, setArtists] = useState([]);
  const [showArtistForm, setShowArtistForm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedArtist, setSelectedArtist] = useState(null);

  const fetchArtists = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllArtists();
      setArtists(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  const deleteArtists = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await deleteArtist(id);
      message.success(response.message);
      fetchArtists();
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  const columns = [
    {
      title: "Artist",
      dataIndex: "profile",
      render: (text, record) => {
        const imageUrl = record?.images?.[0] || "";
        return <img src={imageUrl} alt="" className="w-20 h-20 rounded" />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      render: (text, record) => {
        return getDate(text);
      },
    },
    {
      title: "Debut Year",
      dataIndex: "debutYear",
    },
    {
      title: "Profession",
      dataIndex: "profession",
    },
    {
      title: "Debut Movie",
      dataIndex: "debutMovie",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-2">
            <i
              className="ri-delete-bin-7-line mr-5"
              onClick={() => deleteArtists(record._id)}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedArtist(record);
                setShowArtistForm(true);
              }}
            ></i>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setSelectedArtist(null);
            setShowArtistForm(true);
          }}
        >
          Add Artist
        </Button>
      </div>
      <Table className="mt-5" dataSource={artists} columns={columns} />
      {showArtistForm && (
        <ArtistForm
          showArtistForm={showArtistForm}
          setShowArtistForm={setShowArtistForm}
          selectedArtist={selectedArtist}
          reloadData={fetchArtists}
        />
      )}
    </div>
  );
}

export default Artists;
