import { useState, useEffect } from 'react'

import { BASE_URL, STORAGE_ID } from '../constants'


export default function Lyrics(props) {
    const [lyrics, setLyrics] = useState([])

    const { image, id } = props.location.state
    const { artist, song } = props.match.params


    useEffect(() => {

        let recentData = {}
        recentData.image = image
        recentData.title = song
        recentData.id = id
        recentData.artist = artist

        let localData = localStorage.getItem(STORAGE_ID)
        if (localData) {
            localData = JSON.parse(localData)
            let recentSongs = localData.recentSongs
            if (recentSongs) {
                let index = -1
                recentSongs.forEach((element, i) => {
                    if (element.id === id) {
                        index = i
                    }
                });
                if (index !== -1) {
                    recentSongs.splice(index, 1)
                }
                if (recentSongs.length > 3) {
                    recentSongs.splice(0, 1)
                }
                recentSongs.splice(0, 0, recentData)
                localData.recentSongs = recentSongs
            } else {
                let recentSongs = []
                recentSongs.push(recentData)
                localData.recentSongs = recentSongs
            }
        } else {
            localData = {}
            let recentSongs = []
            recentSongs.push(recentData)
            localData.recentSongs = recentSongs
        }

        localStorage.setItem(STORAGE_ID, JSON.stringify(localData))

        // fetch(`${BASE_URL}v1/${artist}/${song}`)
        //     .then(response => response.json())
        //     .then(lyrics => lyrics.lyrics)
        //     .then(lyrics => lyrics.split('\n'))
        //     .then(lyrics => setLyrics(lyrics))


        return () => {

        }
    }, [])

    return <div className="container text-center mt-4">
        <img src={image} width="200" />
        <div className="lyric-song">{song}</div>
        <div className="lyric-artist">{artist}</div>
        <div className="lyrics">
            {lyrics.map((line, index) => <p key={index}>{line}</p>)}
        </div>
    </div>
}