import { useState, useEffect } from 'react'

import Loader from '../components/Loader'


import { BASE_URL, STORAGE_ID } from '../constants'

import NotFoundImage from '../../assets/not_found.jpeg'


export default function Lyrics(props) {
    const [lyrics, setLyrics] = useState([<Loader key="0" />])

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
                    recentSongs.splice(3, 1)
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

        fetch(`${BASE_URL}v1/${artist}/${song}`)
            .then(response => response.json())
            .then(lyrics => lyrics.lyrics)
            .then(lyrics => lyrics.length === 0 ? [] : lyrics.split('\n'))
            .then(lyrics => lyrics.map((line, index) => <p key={index}>{line}</p>))
            .then(lyrics => setLyrics(lyrics))


        return () => {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className="container text-center mt-4">
        <img src={image} width="200" alt={NotFoundImage} />
        <div className="lyric-song">{song}</div>
        <div className="lyric-artist">{artist}</div>
        <div className="lyrics">
            {lyrics.length === 0 ? <p>There is an issue in connecting server</p> :
                lyrics.map(line => line)
            }
        </div>
    </div>
}