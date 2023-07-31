import {useEffect, useState} from "react";
import axios from 'axios';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SearchTracks() {

  const CLIENT_ID = "" // Add your applications client ID here
  const REDIRECT_URI = "" // Add your applications/pages redirect URI here
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize" //Spotify's authorization endpoint
  const RESPONSE_TYPE = "token"
  const SCOPE = "" // Add the scopes you need here       // Scopes to get specific data from API
  
    const [token, setToken] = useState("")

    //----- SEARCH -----//
    const [searchKey, setSearchKey] = useState("")
    const [results, setResults] = useState([])
  
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

    const searchTracks = async (e) => {
      const {data} = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
          q: searchKey,
          type: "track",
          limit: 5,
          include_external: "audio"
        }
      })

      console.log(data);
      setResults(data.tracks.items)
    }
  
    //------------- RENDER FUNCTIONS -------------// 

    const renderResults = () => {
      return results.map(result => (
        <div key={result.id}>
        <br></br>
        {result.album.images.length ? <img width = "300px" height = "300px" src ={result.album.images[0].url} alt=""/> : <div>No Image</div>}
        <br></br>
        <h1>{result.name}</h1>
        {result.artists.length ? <h1>By {result.artists[0].name}</h1> : <h1>No artist name</h1>}
        {result.external_urls ? <Button className="btn1" href={result.external_urls.spotify}>View Track in Spotify</Button> : <div></div>}
        </div>
      ))
    }
  
    //------------------ FUNCTIONS ------------------//
  
    //------------------ WEBPAGE ------------------//
  


    return (
        <div className="App">
      <header className="App-header">
      <h1><img src='../StatisfyLogo.png' width = "50px" alt=''/>  Statisfy React Application</h1>
      <h2>Search for Tracks</h2>
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
                
                <form onSubmit={searchTracks}>
                  <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                  <br/>
                  <Button className="btn1" type={"submit"}>Search</Button>
                </form>

                
            
                : <br></br>}
            </Col>
        </Row>
        <Row>
        {renderResults()}
        </Row>
    </Container>

    {/*------------------ SHOW USER INFO BUTTONS ------------------*/}

    {/*------------------ SHOW USER INFO RENDERS ------------------*/}

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