import {useEffect, useState} from "react";
import axios from 'axios';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TopTracks() {

  const CLIENT_ID = "" // Add your applications client ID here
  const REDIRECT_URI = "" // Add your applications/pages redirect URI here
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize" //Spotify's authorization endpoint
  const RESPONSE_TYPE = "token"
  const SCOPE = "" // Add the scopes you need here
  
    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
  
    //----- TRACK VARIABLES -----//
    const [topTracksShort, setTopTracksShort] = useState([])
    const [topTracksMed, setTopTracksMed] = useState([])
    const [topTracksLong, setTopTracksLong] = useState([])

    //----- HIDE VARIABLES -----//
    const [showTracksShort, setShowTracksShort] = useState(false)
    const [showTracksMed, setShowTracksMed] = useState(false)
    const [showTracksLong, setShowTracksLong] = useState(false)
  
  
    useEffect(()=> {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token") // Stores the Spotify Access token to LocalStorage
  
      if(!token&&hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  
        console.log(token)
        window.location.hash = ""
        window.localStorage.setItem("token", token)
      }
      setToken(token)
  
    }, [])
  
    //------------------ FUNCTIONS ------------------//
  
    const logout = () => {    // Logs out the user by removing their access token from LocalStorage
      setToken("")
      window.localStorage.removeItem("token")
    }
  
    const searchArtists = async (e) => {    // Allows the user to search for artists
      e.preventDefault()
      const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: searchKey,
          type: "artist"
        }
      })
      console.log(data)
      setArtists(data.artists.items)
    }
  
    //------------- TRACK FUNCTIONS -------------//
  
    const showTopTracksShort = async () => {
      const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          limit: 10,
          time_range: "short_term"
        }
      })
      console.log(data)
      setTopTracksShort(data.items)
    }
  
    const showTopTracksMed = async () => {
      const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          limit: 10,
          time_range: "medium_term"
        }
      })
      console.log(data)
      setTopTracksMed(data.items)
    }
  
    const showTopTracksLong = async () => {
      const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          limit: 10,
          time_range: "long_term"
        }
      })
      console.log(data)
      setTopTracksLong(data.items)
    }
  
      //------------- RENDER FUNCTIONS -------------//
  
    const renderTopTracksShort = () => {
      return topTracksShort.map((track, index) => (
        <Col key={track.id}>
          <br></br>
          {track.album.images ? <img width = "300px" height = "300px" src ={track.album.images[0].url} alt=""/> : <div>No Image</div>}
          <br></br>
          {index + 1}. {track.name}
        </Col>
      ))
    }
  
    const renderTopTracksMed = () => {
      return topTracksMed.map((track, index) => (
        <Col key={track.id}>
          <br></br>
          {track.album.images ? <img width = "300px" height = "300px" src ={track.album.images[0].url} alt=""/> : <div>No Image</div>}
          <br></br>
          {index + 1}. {track.name}
        </Col>
      ))
    }
  
    const renderTopTracksLong = () => {
      return topTracksLong.map((track, index) => (
        <Col key={track.id}>
          <br></br>
          {track.album.images ? <img width = "300px" height = "300px" src ={track.album.images[0].url} alt=""/> : <div>No Image</div>}
          <br></br>
          {index + 1}. {track.name}
        </Col>
      ))
    }

  
    const renderArtists = () => {       // Displays the user's search results
      return artists.map(artist => (
        <div key={artist.id}>
          <br></br>
          {artist.images.length ? <img width = "200px" src ={artist.images[0].url} alt=""/> : <div>No Image</div>}
          <br></br>
          {artist.name}
          <br></br>
          <br></br>
        </div>
      ))
    }
  
    //------------------ FUNCTIONS ------------------//
  
    //------------------ WEBPAGE ------------------//
  


    return (
    <div className="App">
      <header className="App-header">
      <Container>
      <h1><img src='../StatisfyLogo.png' width = "50px" alt=''/>  Statisfy React Application</h1>
      <h2>Top Tracks</h2>
      <br/>
      {token ? <h1> </h1> : <h1>You must login to proceed</h1>}

        {/* {token ?
        
          <form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKey(e.target.value)}></input>
            <button type={"submit"}>Search</button>
          </form>

        : <h2>To proceed you must login!</h2>} */}

    <br/>
    <Container>
        <Row>
            <Col>
                {token ? 
                
                <form onSubmit={showTopTracksShort}>
                    <Button className="btn1" type={"submit"} onClick={() => setShowTracksShort(!showTracksShort)}>Top Tracks in the last 4 weeks</Button>
                </form>
            
                : <Container className="centerText"><h2> </h2></Container>}
            </Col>
            <Col>
                {token ? 
                
                <form onSubmit={showTopTracksMed}>
                <Button className="btn1" type={"submit"} onClick={() => setShowTracksMed(!showTracksMed)}>Top Tracks in the last 6 months</Button>
                </form>
            
                : <br></br>}
            </Col>
            <Col>
                {token ? 
                
                <form onSubmit={showTopTracksLong}>
                <Button className="btn1" type={"submit"} onClick={() => setShowTracksLong(!showTracksLong)}>Top Tracks of All Time</Button>
                </form>
            
                : <br></br>}
            </Col>
        </Row>
    </Container>  
    
        {showTracksShort && <Container><Row>{renderTopTracksShort()}</Row></Container>}
        {showTracksMed && <Container><Row>{renderTopTracksMed()}</Row></Container>}
        {showTracksLong && <Container><Row>{renderTopTracksLong()}</Row></Container>}
        {renderArtists()}

        <br/>
        <br/>
        {!token ?
        <Button className="btn1" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
                            to Spotify</Button>
        : <Button className="btn1" onClick={logout}>Logout</Button>} 
        <br/>
        <br/>

    </Container>
      </header>
      
    </div>
    );
}