import React, { useEffect } from 'react'
import { useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({token, trackUri}) {

    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    if (!token) return null
    return <SpotifyPlayer
    token = {token}
    callback={state => {
        if (!state.isPlaying) setPlay(false)
    }}
    play={play}
    showSaveIcon
    uris={trackUri ? [trackUri] : []}
    />
}