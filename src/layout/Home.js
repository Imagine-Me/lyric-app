import { useState, useEffect } from "react";
import SearchBar from "../components/Searchbar";
import { BASE_URL, STORAGE_ID } from "../constants";
import Card from '../components/Card'

import Loader from '../components/Loader'


export default function Home() {

    const [isSearch, setIsSearch] = useState(false)
    const [result, setResult] = useState([])
    const [keyWord, setKeyWord] = useState('')
    const [timer, setTimer] = useState(null)
    const [favData, setFavData] = useState([])
    const [recentData, setRecentData] = useState([])

    const local_data = localStorage.getItem(STORAGE_ID)

    useEffect(() => {
        if (local_data) {
            let data = JSON.parse(local_data)
            let favData = data.favorites ?? []
            setFavData(favData)
            let recentSongs = data.recentSongs ?? []
            setRecentData(recentSongs)
        }

        return () => {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const onChangeListener = (event) => {
        const value = event.target.value
        clearTimeout(timer)
        if (value === "")
            setIsSearch(false)
        else {
            setIsSearch(true)
            setTimer(setTimeout(searchMusic, 800))
        }
        setKeyWord(event.target.value)
    }

    const searchMusic = () => {
        setResult([])
        fetch(`${BASE_URL}suggest/${keyWord}`)
            .then(response => response.json())
            .then(data => data.data)
            .then(list => setResult(list))
            .catch(err => setResult([]))
    }




    const makeFavorite = props => {
        const data = {}
        data.title = props.title
        data.image = props.image
        data.artist = props.artist
        data.id = props.id
        const tempData = [...favData]
        tempData.push(data)
        let storage_data = {}
        if (local_data) {
            storage_data = JSON.parse(local_data)
        }
        storage_data.favorites = tempData
        localStorage.setItem(STORAGE_ID, JSON.stringify(storage_data))
        setFavData(tempData)
    }
    const unFavorite = (id) => {
        const tempData = [...favData]
        let deleteIndex = -1
        tempData.forEach((value, index) => {
            if (value.id === id) {
                deleteIndex = index
            }
        })
        tempData.splice(deleteIndex, 1)
        let localData = JSON.parse(localStorage.getItem(STORAGE_ID))
        localData.favorites = tempData
        localStorage.setItem(STORAGE_ID, JSON.stringify(localData))
        setFavData(tempData)
    }

    const favoriteIds = favData.map(value => value.id)

    let searchElement1 = <div>
        <h3>Results</h3>
        <div className="text-center">
            <Loader />
        </div>
    </div>
    if (result.length > 0) {
        searchElement1 = <div>
            <h3>Results</h3>
            <div className="card-holder">
                {result.map((value, index) => <Card
                    image={value.album.cover_medium}
                    artist={value.artist.name}
                    title={value.title}
                    id={value.id}
                    unFavorite={unFavorite}
                    makeFavorite={makeFavorite}
                    isFavorite={favoriteIds.includes(value.id)}
                    key={index} />)}
            </div>
        </div>
    }

    let searchElement2 = <div className="text-center opacity-low">
        <h1>Lyrics Finder</h1>
    </div>

    if (favData.length > 0) {
        searchElement2 = <div>
            <h3>Favorites</h3>
            <div className="card-holder">
                {favData.map((value, index) => <Card
                    image={value.image}
                    artist={value.artist}
                    title={value.title}
                    id={value.id}
                    unFavorite={unFavorite}
                    isFavorite={true}
                    key={index} />)}
            </div>
        </div>
    }


    return (
        <div>
            <SearchBar
                value={keyWord}
                change={onChangeListener}
                recentData={recentData}
            />
            {isSearch ? searchElement1 : searchElement2 }
        </div>
    )
}