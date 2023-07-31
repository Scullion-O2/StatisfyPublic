import './App.css';
import NavbarTop from "./Navbar";
import TopTracks from "./pages/tracks";
import TopArtists from "./pages/artists";
import Home from "./pages/home";
import CurrentlyPlaying from "./pages/currently-playing";
import SearchTracks from './pages/search-tracks';
import SearchArtists from './pages/search-artists';
import Dashboard from './pages/Dashboard';

function App() {
  //------------------ ROUTING ------------------//
  let Component
  // eslint-disable-next-line default-case
  switch (window.location.pathname) {
    case "/":
      Component = Home
      break

    case "/toptracks/":
      Component = TopTracks
      break

    case "/topartists/":
      Component = TopArtists
      break

    case "/home/":
      Component = Home
      break

    case "/currently-playing/":
      Component = CurrentlyPlaying
      break
    
    case "/search-artists/":
      Component = SearchArtists
      break
    
    case "/search-tracks/":
      Component = SearchTracks
      break

    case"/dashboard/":
      Component = Dashboard
      break
  }

  //------------------ WEBPAGE ------------------//

  return (
    <>
      <NavbarTop />
      <Component />
    </>  
    );

  //------------------ WEBPAGE ------------------//
}
export default App;
