import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function Card(props) {

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
                <Link to={{
                    pathname: `/${props.artist}/${props.title}`,
                    state: { image: props.image, id: props.id }
                }}>Lyrics</Link>
                {props.isFavorite ? <BsHeartFill color="#ec407a" className="ml-2 hover-item" size={22} onClick={() => props.unFavorite(props.id)} /> : <BsHeart onClick={() => props.makeFavorite(props)} className="ml-2 hover-item" size={22} />}
            </div>
        </div>
    </div>
}