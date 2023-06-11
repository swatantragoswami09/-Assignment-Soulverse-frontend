import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Movies from "./movies";
import Artists from "./Artists";
import Users from "./Users";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { user } = useSelector((state) => state.users);
  const [activeTab, setActiveTab] = useState("1");
  const navigate = useNavigate();

  console.log("user form admin=>", user);

  useEffect(() => {}, []);

  return (
    <div>
      {user?.isAdmin ? (
        <Tabs
          className="border border-b-gray-500"
          defaultActiveKey="1"
          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key);
            navigate(`/admin?tab=${key}`);
          }}
        >
          <Tabs.TabPane tab="Movies" key="1">
            <Movies />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Artists" key="2">
            <Artists />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Users" key="3">
            <Users />
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <div>
          <div className="text-gray-600 text-md text-center mt-20">
            You are not authorized to view this page
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
