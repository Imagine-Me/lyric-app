import RecentSearch from "./RecentSearch";

export default function SearchBar() {
    return <div className="search-box">
        <div className="input">
            <input type="text" placeholder="Search Lyrics by song/artist" />
            <button>Search</button>
        </div>
        <div className="recent-searches">
            <RecentSearch />
        </div>
    </div>
}