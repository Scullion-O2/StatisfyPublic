import {useState, useEffect} from 'react';
import React from "react";
import { Container, Form } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';

const spotifyApi = new SpotifyWebApi({
    clientId: "a7cf8a767a994956bd2c0a7a45bf7cc4",
})

export default function Dashboard({ code }) {

    const CLIENT_ID = "" // Add your applications client ID here
    const REDIRECT_URI = "" // Add your applications/pages redirect URI here
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize" //Spotify's authorization endpoint
    const RESPONSE_TYPE = "token"
    const SCOPE = "" // Add the scopes you need here       // Scopes to get specific data from API

    const [token, setToken] = useState("")
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
    }
    console.log(searchResults)

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


      const logout = () => {    // Logs out the user by removing their access token from LocalStorage
        setToken("")
        window.localStorage.removeItem("token")
      }

    useEffect(() => { 
        if (!token) return
        spotifyApi.setAccessToken(token)
    }, [token])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!token) return 

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce((smallest,
                    image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])    
                
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })

        return () => cancel = true
    }, [search, token])

    return (
        <div>
      <header className="App-header">

      <h1><img src='../StatisfyLogo.png' width = "50px" alt=''/>  Statisfy React Application</h1>
      <h2>Welcome to Statisfy</h2>
      <br/>
      <Container fixed="bottom"><div id='App-footer'><Player token={token} trackUri={playingTrack?.uri}/></div></Container>
    <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>
        <Form.Control type="search" placeholder="Search for Songs/Artists" value={search} onChange={e => setSearch(e.target.value)}
        />
        <div className="flex-grow-1 my-2" style={{overflowY:"auto"}}>
            {searchResults.map(track => (
                <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
            ))}
        </div>
    </Container>


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