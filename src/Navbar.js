import {useEffect, useState} from "react";
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from "react-bootstrap";
import { slide as Menu} from "react-burger-menu";

export default function NavbarTop () {

    const[time, setTime] = useState(new Date());

    useEffect(()=> {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
  
        return () => clearInterval(interval);
      }, []);

    return (
    <>
        <Navbar fixed='top' className="nav">
            <a href="/home/" className="site-title">‎              </a>
            <ul>
                <li>
                    <a href="/home/?#">Home</a>
                </li>
                <li>
                    <a href="/toptracks/?#">Top Tracks</a>
                </li>
                <li>
                    <a href="/topartists/?#">Top Artists</a>
                </li>
                <li>
                    <a href="/currently-playing/?#">Currently Playing</a>    
                </li>
                <li>
                    <a href="/search-artists/?#">Search Artists</a>
                </li>
                <li>
                    <a href="/dashboard/?#">Spotify Player</a>
                </li>
                <div className="bm-burger-button">
                    <Menu>
                        <nav className="bm-item-list">
                            <a id="home" className="bm-item" href="/home/?#">Home</a>
                            <a id="toptracks" className="bm-item" href="/toptracks/?#">Top Tracks</a>
                            <a id="topartists" className="bm-item" href="/topartists/?#">Top Artists</a>
                            <a id="currentlyplaying" className="bm-item" href="/currently-playing/?#">Currently Playing</a>
                            <a id="searchartists" className="bm-item" href="/search-artists/?#">Search Artists</a>
                            <a id="spotifyplayer" className="bm-item" href="/dashboard/?#">Spotify Player</a>
                        </nav>
                    </Menu>
                </div>
          
            </ul>
        </Navbar>
        
    </>)

}