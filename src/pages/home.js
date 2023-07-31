import {useEffect, useState} from "react";
import axios from 'axios';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {

    const CLIENT_ID = "" // Add your applications client ID here
    const REDIRECT_URI = "" // Add your applications/pages redirect URI here
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize" //Spotify's authorization endpoint
    const RESPONSE_TYPE = "token"
    const SCOPE = "" // Add the scopes you need here     // Scopes to get specific data from API
  
    const [token, setToken] = useState("")

    //----- USER PROFILE -----//
    const [userProfile, setUserProfile] = useState([])
    const [toggleUserProfile, setToggleUserProfile] = useState(false)

    //----- RECENT TRACKS -----//
    const [recentTracks, setRecentTracks] = useState([])
    const [toggleRecentTracks, setToggleRecentTracks] = useState(false)
  
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
  
  
    //------------- USER FUNCTIONS -------------//

    const showUserProfile = async () => {       // Get's users profile data
        const {data} = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
        setUserProfile(data)
    }

    //------------- RECENT TRACK FUNCTIONS -------------//
    const showRecentTracks = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                limit: 10
            }
        })
        console.log(data)
        setRecentTracks(data.items)
    }
  
    //------------- RENDER FUNCTIONS -------------// 

    const renderUserProfile = () => {
        return (
            <div>
                <br/>
                <h1>Thanks for using Statisfy {userProfile.display_name}</h1>
                {userProfile.images ? <img width="300px" height="300px" src = {userProfile.images[0].url} alt=""/> : <div></div>}
                <h1>Country: {userProfile.country}</h1>
                <h1>Email: {userProfile.email}</h1>
                <h1>Profile Type: {userProfile.type}</h1>
                <h1>Subcription: {userProfile.product}</h1>
                {userProfile.followers ? <h1>Followers: {userProfile.followers.total}</h1> : <div></div>}
                {userProfile.external_urls ? <Button className="btn1" href={userProfile.external_urls.spotify}>Open Profile in Spotify</Button> : <div></div>}
            </div>
        )
    }

    const renderRecentTracks = () => {
        return recentTracks.map((recent, index) => (
          <Col key={recent.id}>
            <br></br>
            {recent.track.album.images ? <img width = "300px" height = "300px" src ={recent.track.album.images[0].url} alt=""/> : <div>No Image</div>}
            <br></br>
            {index + 1}. {recent.track.name}
            <br></br>
            Played at: {recent.played_at}
            <br></br>
            {/* {recent.track ? <h1>Most Recent Track {recent.track[0].name}</h1> : <div></div> } */}
          </Col>
        ))
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

                <form onSubmit={showUserProfile}>
                <Button className="btn1" type={"submit"} onClick={() => setToggleUserProfile(!toggleUserProfile)}>Show User Profile</Button>
                </form>
            
                : <br></br>}  
            </Col>
            <Col>
                {token ?    

                <form onSubmit={showRecentTracks}>
                <Button className="btn1" type={"submit"} onClick={() => setToggleRecentTracks(!toggleRecentTracks)}>Show Recently Played Tracks</Button>
                </form>
            
                : <br></br>}  
            </Col>
        </Row>
    </Container>

    {/*------------------ SHOW USER INFO BUTTONS ------------------*/}

    {/*------------------ SHOW USER INFO RENDERS ------------------*/}

        {toggleUserProfile && <div>{renderUserProfile()}</div>}
        {toggleRecentTracks && <Container><br/><h2>Recently Played Tracks</h2><Row>{renderRecentTracks()}</Row></Container>}

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