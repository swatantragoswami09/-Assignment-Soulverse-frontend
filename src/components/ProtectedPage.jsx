import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apis/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/userSlice";
import { SetLoading } from "../redux/loaderSlice";

function ProtectedPage({ children }) {
  const { user } = useSelector((state) => state.users);
  console.log("user=>", user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetCurrentUser();
      dispatch(SetLoading(false));
      dispatch(SetUser(response.data));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getCurrentUser();
    }
  }, []);

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="flex justify-content space-x-10 items-center bg-primary p-5"
      >
        <span
          className="font-semibold text-orange-500 text-2xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          Welcome to the movie world
        </span>
        <div className="bg-white rounded px-5 py-2 flex-gap-2">
          <i className="ri-file-user-line mr-4"></i>
          <span
            className="text-gray 200 text-sm cursor-pointer underline"
            onClick={() => navigate("/profile")}
          >
            {user?.name}
          </span>
          <i
            className="ri-logout-circle-line ml-8"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          ></i>
        </div>
      </div>
      <div className="p-5">{user && children}</div>
    </div>
  );
}

export default ProtectedPage;
