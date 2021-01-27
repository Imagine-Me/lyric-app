import {BsHeart} from 'react-icons/bs'

export default function Card() {
    return <div className="card-container">
        <div className="card">
            <div className="header-card">
                <div className="image" style={{ backgroundImage: 'url("http://www.drodd.com/images14/red4.jpg")' }}>

                </div>
                <div className="title-holder">
                    <div className="title">Paradise</div>
                    <div className="artist">Coldplay</div>
                </div>
            </div>
            <div className="footer">
                <button>Lyrics</button>
                <BsHeart className="ml-2" size={22} />
            </div>
        </div>
    </div>
}