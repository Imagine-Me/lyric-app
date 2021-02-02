import RecentSearch from "./RecentSearch";
import { Link } from 'react-router-dom'

export default function SearchBar(props) {
    return <div className="search-box">
        <div className="input">
            <input type="text" value={props.value} onChange={props.change} placeholder="Search Lyrics by song/artist" />
            <button>Search</button>
        </div>
        {props.recentData.length > 0 ? <div className="recent-searches">
            <span className="r-title">Recent Searches</span>
            {props.recentData.map((item, index) => {
                return <Link key={index} className="recent-link"
                    to={{ pathname: `/${item.artist}/${item.title}`, state: { image: item.image, id: item.id } }}>
                    <RecentSearch title={item.title} />
                </Link>
            })}
        </div>:null}
        
    </div>
}