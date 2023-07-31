import {useEffect, useState} from "react";
import axios from 'axios';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CurrentlyPlaying() {

  const CLIENT_ID = "" // Add your applications client ID here
  const REDIRECT_URI = "" // Add your applications/pages redirect URI here
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize" //Spotify's authorization endpoint
  const RESPONSE_TYPE = "token"
  const SCOPE = "" // Add the scopes you need here
  
    const [token, setToken] = useState("")

    //----- CURRENT TRACK -----//
    const [currentlyPlaying, setCurrentlyPlaying] = useState([])
    const [currentlyPlayingArtist, setCurrentlyPlayingArtist] = useState([])
    const [currentlyPlayingImage, setCurrentlyPlayingImage] = useState([])
    const [toggleCurrentlyPlaying, setToggleCurrentlyPlaying] = useState(false)
  
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
  
  
    //------------- CURRENTLY PLAYING -------------//

    const showCurrentlyPlaying = async () => {       // Get's current playing track data
        const {data} = await axios.get("https://api.spotify.com/v1/me/player", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
              type: "track"
            }
        })
        console.log(data.item)
        setCurrentlyPlaying(data.item)
        setCurrentlyPlayingArtist(data.item.album.name)
        setCurrentlyPlayingImage(data.item.album.images[0])
    }
  
      //------------- RENDER FUNCTIONS -------------// 

    const renderCurrentlyPlaying = () => {
      if (!currentlyPlaying) return (<h1>No Song Currently Playing</h1>)

      
      return (
        <div>
          <br></br>
          <h1>Your Current Playing Track:</h1>
          <br></br>
          {currentlyPlayingImage ? <img width = "300px" height = "300px" src ={currentlyPlayingImage.url} alt=""/> : <div>No Image</div>}
          <br></br>
          {currentlyPlaying.name}
          <br/>
          Playing from the Album - {currentlyPlayingArtist}
          <br/>
        </div>
      )  
    }
  
    //------------------ FUNCTIONS ------------------//
  
    //------------------ WEBPAGE ------------------//
  


    return (
        <div className="App">
      <header className="App-header">
      <h1><img src='../StatisfyLogo.png' width = "50px" alt=''/>  Statisfy React Application</h1>
      <h2>Welcome to Statisfy</h2>
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

    {/*------------------ SHOW USER INFO BUTTONS ------------------*/}   

    <Container>
        <Row>
            <Col>
                {token ?    
                
                <form onSubmit={showCurrentlyPlaying}>
                <Button className="btn1" type={"submit"} onClick={() => setToggleCurrentlyPlaying(!toggleCurrentlyPlaying)}>Show Currently Playing</Button>
                </form>
            
                : <br></br>}  
            </Col>
        </Row>
    </Container>

    {/*------------------ SHOW USER INFO BUTTONS ------------------*/}

    {/*------------------ SHOW USER INFO RENDERS ------------------*/}

        {toggleCurrentlyPlaying && <div>{renderCurrentlyPlaying()}</div>}

    {/*------------------ SHOW USER INFO RENDERS ------------------*/}

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