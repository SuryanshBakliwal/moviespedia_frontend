import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/home/Home";
import Login from "./screens/home/auth/Login";
import Signup from "./screens/home/auth/Signup";
import MovieDetail from "./screens/movies/MovieDetail";
import TvDetails from "./screens/tvshows/TvDetails";
import Movies from "./screens/movies/Movies";
import TvShows from "./screens/tvshows/TvShows";
import PeopleDetails from "./screens/people/PeopleDetails";
import Search from "./screens/home/search/Search";
import EmailVerify from "./screens/home/auth/EmailVerify";
import { useContext, useEffect } from "react";
import { FavContext } from "./store/ContextProvider";
import { getFavroiteMovies } from "./service/api";
import ForgotPassword from "./screens/home/auth/ForgotPassword";
import ResetPassword from "./screens/home/auth/ResetPassword";
import Favorite from "./screens/profile/Favorite";
import WatchList from "./screens/profile/WatchList";
import AllSeasons from "./screens/tvshows/AllSeasons";
import Season from "./screens/tvshows/Season";
import EpisodeDetails from "./screens/tvshows/EpisodeDetails";
// import Main from "./screens/Main";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={<Main />} /> */}
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Navigate to="/home" />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/movie" element={<MovieDetail />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/tvshow/" element={<TvDetails />} />
          <Route exact path="/tvshows" element={<TvShows />} />
          <Route exact path="/tvshow/seasons/" element={<AllSeasons />} />
          <Route exact path="/people" element={<PeopleDetails />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/tvshow/details/" element={<Season />} />
          <Route exact path="/show/details/" element={<EpisodeDetails />} />

          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/user/watchlist" element={<WatchList />} />
          <Route exact path="/user/favorties" element={<Favorite />} />
          <Route
            exaczt
            path="/user/:id/resetpassword"
            element={<ResetPassword />}
          />
          <Route
            exact
            path="/user/:id/verify/:token"
            element={<EmailVerify />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
