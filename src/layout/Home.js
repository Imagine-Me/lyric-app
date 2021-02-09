import { useState } from "react";
import SearchBar from "../components/Searchbar";
import { BASE_URL, STORAGE_ID } from "../constants";
import Card from '../components/Card'
import { useRecoilState } from 'recoil'
import { appState } from '../Recoil/appState'

import Loader from '../components/Loader'


export default function Home() {

    const [isSearch, setIsSearch] = useState(false)
    const [result, setResult] = useState([])
    const [keyWord, setKeyWord] = useState('')
    const [timer, setTimer] = useState(null)

    const [state, setState] = useRecoilState(appState)

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
        const favoriteData = [...state.favoriteData]
        favoriteData.push(data)
        setState(prevState => {
            const currentState = {
                ...prevState,
                favoriteData
            }
            localStorage.setItem(STORAGE_ID, JSON.stringify(currentState))
            return currentState
        })
    }
    const unFavorite = (id) => {
        const favoriteData = [...state.favoriteData]
        let deleteIndex = -1
        favoriteData.forEach((value, index) => {
            if (value.id === id) {
                deleteIndex = index
            }
        })
        favoriteData.splice(deleteIndex, 1)
        setState(prevState => {
            const currentState = {
                ...prevState,
                favoriteData
            }
            localStorage.setItem(STORAGE_ID, JSON.stringify(currentState))
            return currentState
        })
    }

    const favoriteIds = state.favoriteData.map(value => value.id)
    let recentSongs = [...state.recentSongs].reverse()

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

    if (state.favoriteData.length > 0) {
        searchElement2 = <div>
            <h3>Favorites</h3>
            <div className="card-holder">
                {state.favoriteData.map((value, index) => <Card
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
                recentData={recentSongs}
            />
            {isSearch ? searchElement1 : searchElement2}
        </div>
    )
}