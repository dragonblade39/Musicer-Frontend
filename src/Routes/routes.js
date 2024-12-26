import ArtistRoute from "../pages/Artist-route/ArtistRoute";
import FavMain from "../pages/Favourites/FavMain";
import ArtistAlbumMusic from "../pages/Home/Artists/ArtistAlbumMusic";
import Home from "../pages/Home/home";
import MusicPlayer from "../pages/Music_Player/musicplayer";
import ProfileCard from "../pages/Profile/profilecard";
import Search from "../pages/Search/search";
import Signup from "../pages/Signup/signup";
import Login from "../pages/login/login";

export const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/search",
    component: Search,
  },
  {
    path: "/profile",
    component: ProfileCard,
  },
  {
    path: "/search/album/:id",
    component: MusicPlayer,
  },
  {
    path: "/search/tracks/:id",
    component: ArtistRoute,
  },
  {
    path: "/search/album/music/:id",
    component: ArtistAlbumMusic,
  },
  {
    path: "/favourites",
    component: FavMain,
  },
];
