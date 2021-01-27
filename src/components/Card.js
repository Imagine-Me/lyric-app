import { useState, useEffect } from 'react'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { STORAGE_ID } from '../constants'
import { Link } from 'react-router-dom'

export default function Card(props) {

    const [favData, setFavData] = useState([])

    useEffect(() => {
        let local_data = localStorage.getItem(STORAGE_ID)
        let fav_data = []
        if (local_data) {
            fav_data = JSON.parse(local_data)
            if (fav_data.favorites) {
                fav_data = fav_data.favorites
            }
        }
        setFavData(fav_data)
    }, [])


    const makeFavorite = props => {
        const data = {}
        data.title = props.title
        data.image = props.image
        data.artist = props.artist
        data.id = props.id
        const tempData = [...favData]
        tempData.push(data)


        let local_data = localStorage.getItem(STORAGE_ID)
        if (local_data) {
            local_data = JSON.parse(local_data)
        } else {
            local_data = {}
        }
        local_data.favorites = tempData
        localStorage.setItem(STORAGE_ID, JSON.stringify(local_data))
        setFavData(tempData)
    }
    const unFavorite = id => {

    }


    let fav = favData.map(data => data.id)
    console.log(favData);

    return <div className="card-container">
        <div className="card">
            <div className="header-card">
                <div className="image" style={{ backgroundImage: `url("${props.image}")` }}>

                </div>
                <div className="title-holder">
                    <div className="title text-center" title={props.title}>{props.title}</div>
                    <div className="artist text-center" title={props.artist}>{props.artist}</div>
                </div>
            </div>
            <div className="footer">
                <Link to={`/${props.artist}/${props.title}`}>Lyrics</Link>
                {fav.includes(props.id) ? <BsHeartFill color="#ec407a" className="ml-2 hover-item" size={22} /> : <BsHeart onClick={() => makeFavorite(props)} className="ml-2 hover-item" size={22} />}
            </div>
        </div>
    </div>
}