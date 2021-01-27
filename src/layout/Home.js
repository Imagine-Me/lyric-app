import { useState } from "react";
import Favorites from "../components/Favorites";
import SearchBar from "../components/Searchbar";
import { BASE_URL } from "../constants";
import Card from '../components/Card'


export default function Home() {

    const [isSearch, setIsSearch] = useState(false)
    const [result, setResult] = useState([])
    const [keyWord, setKeyWord] = useState('')
    const [timer, setTimer] = useState(null)


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
        fetch(`${BASE_URL}suggest/${keyWord}`)
            .then(response => response.json())
            .then(data => data.data)
            .then(list => setResult(list))
    }

    return (
        <div>
            <SearchBar
                value={keyWord}
                change={onChangeListener}
            />
            {isSearch ? <div>
                <h3>Results</h3>
                <div className="card-holder">
                    {result.map((value, index) => <Card 
                    image={value.album.cover_medium}
                    artist={value.artist.name}
                    title={value.title}
                    id={value.id}
                    key={index} />)}
                </div>
            </div> : <Favorites />}
        </div>
    )
}