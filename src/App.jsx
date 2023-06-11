import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";

import Login from "../src/pages/Login";
import Home from "../src/pages/Home";
import Register from "../src/pages/Register";
import ProtectedPage from "./components/ProtectedPage";
import Profile from "./pages/Profile/";
import Admin from "./pages/Admin";
import MovieForm from "./pages/Admin/Movies/MovieForm";
import MovieInfo from "./pages/MovieInfo";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedPage>
                <MovieInfo />
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedPage>
                <Admin />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin/movies/add"
            element={
              <ProtectedPage>
                <MovieForm />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin/movies/edit/:id"
            element={
              <ProtectedPage>
                <MovieForm />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
