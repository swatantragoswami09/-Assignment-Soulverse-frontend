import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "./redux/store";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        tokens: {
          colorPrimary: "#0B24",
          colorBorder: "#0B2447",
        },
      }}
    >
      <Provider store={store}>

      <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
