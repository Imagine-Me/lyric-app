import RecentSearch from "./RecentSearch";

export default function SearchBar(props) {
    return <div className="search-box">
        <div className="input">
            <input type="text" value={props.value} onChange={props.change} placeholder="Search Lyrics by song/artist" />
            <button>Search</button>
        </div>
        <div className="recent-searches">
            <RecentSearch />
        </div>
    </div>
}