import {useEffect, useState} from "react";
import axios from 'axios';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TopArtists() {

    const CLIENT_ID = "" // Add your applications client ID here
    const REDIRECT_URI = "" // Add your applications/pages redirect URI here
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize" //Spotify's authorization endpoint
    const RESPONSE_TYPE = "token"
    const SCOPE = "" // Add the scopes you need here
  
    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
  
    const [topArtistsShort, setTopArtistsShort] = useState([])
    const [topArtistsMed, setTopArtistsMed] = useState([])
    const [topArtistsLong, setTopArtistsLong] = useState([])
  
    const [showArtistsShort, setShowArtistsShort] = useState(false)
    const [showArtistsMed, setShowArtistsMed] = useState(false)
    const [showArtistsLong, setShowArtistsLong] = useState(false)
  
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
  
    //------------- ARTIST FUNCTIONS -------------//
  
    const showTopArtistsShort = async () => {
      const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          limit: 10,
          time_range: "short_term"
        }
      })
      console.log(data)
      setTopArtistsShort(data.items)
    }
  
    const showTopArtistsMed = async () => {
      const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          limit: 10,
          time_range: "medium_term"
        }
      })
      console.log(data)
      setTopArtistsMed(data.items)
    }
  
    const showTopArtistsLong = async () => {
      const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          limit: 10,
          time_range: "long_term"
        }
      })
      console.log(data)
      setTopArtistsLong(data.items)
    }
  
      //------------- RENDER FUNCTIONS -------------// 
  
    const renderTopArtistsShort = () => {
      return topArtistsShort.map((artist, index) => (
         <Col key={artist.id}>
            <br></br>
            {artist.images ? <img width = "300px" height = "300px" src ={artist.images[0].url} alt=""/> : <div>No Image</div>}
            <br></br>
            {index + 1}. {artist.name}
        </Col>
 
      ))
    }
  
    const renderTopArtistsMed = () => {
      return topArtistsMed.map((artist, index) => (
        <Col key={artist.id}>
            <br></br>
            {artist.images ? <img width = "300px" height = "300px" src ={artist.images[0].url} alt=""/> : <div>No Image</div>}
            <br></br>
            {index + 1}. {artist.name}
        </Col>
      ))
    }
  
    const renderTopArtistsLong = () => {
      return topArtistsLong.map((artist, index) => (

        <Col key={artist.id}>
          <br></br>
          {artist.images ? <img width = "300px" height = "300px" src ={artist.images[0].url} alt=""/> : <div>No Image</div>}
          <br></br>
          {index + 1}. {artist.name}
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
      <h1><img src='../StatisfyLogo.png' width = "50px" alt=''/>  Statisfy React Application</h1>
      <h2>Your Top Artists</h2>
      <br/>
      {token ? <h1> </h1> : <h1>You must login to proceed</h1>}

        <br />

        {/*------------------ SEARCH FOR ARTISTS ------------------*/}

        {/* {token ?
        
        //   <form onSubmit={searchArtists}>
        //     <input type="text" onChange={e => setSearchKey(e.target.value)}></input>
        //     <Button variant="primary bg-blue" type={"submit"}>Search</Button>
        //   </form>

        : <h2>To proceed you must login!</h2>}

        <br /> */}

        {/*------------------ SEARCH FOR ARTISTS ------------------*/}

    {/*------------------ SHOW TOP ARTISTS BUTTONS ------------------*/}   

    <Container>
        <Row>
            <Col>
                {token ? 
                
                <form onSubmit={showTopArtistsShort}>
                <Button className="btn1" type={"submit"} onClick={() => setShowArtistsShort(!showArtistsShort)}>Top Artists in the last 4 weeks</Button>
                </form>
            
                : <br></br>}
            </Col>
            <Col>
                {token ? 
                
                <form onSubmit={showTopArtistsMed}>
                <Button className="btn1" type={"submit"} onClick={() => setShowArtistsMed(!showArtistsMed)}>Top Artists in the last 6 months</Button>
                </form>
            
                : <br></br>}
            </Col>
            <Col>
                {token ? 

                <form onSubmit={showTopArtistsLong}>
                <Button className="btn1" type={"submit"} onClick={() => setShowArtistsLong(!showArtistsLong)}>Top Artists of All Time</Button>
                </form>
            
                : <br></br>}  
            </Col>
        </Row>
    </Container>

    {/*------------------ SHOW TOP ARTISTS BUTTONS ------------------*/}

    {/*------------------ SHOW TOP ARTISTS RENDERS ------------------*/}

        {showArtistsShort && <Container><Row>{renderTopArtistsShort()}</Row></Container>}  
        {showArtistsMed && <Container><Row>{renderTopArtistsMed()}</Row></Container>}
        {showArtistsLong && <Container><Row>{renderTopArtistsLong()}</Row></Container>}

    {/*------------------ SHOW TOP ARTISTS RENDERS ------------------*/}

        {renderArtists()}

        <br/>
        {!token ?
        <Button className="btn1" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
                            to Spotify</Button>
        : <Button className="btn1" onClick={logout}>Logout</Button>} 
        <br/>
        <br/>

      </header>
    </div>
    );
}