import { BASE_URL, STORAGE_ID } from "../constants";
import Card from "./Card";

export default function Favorites() {
    let fav = localStorage.getItem(STORAGE_ID)
    if (fav) {
        fav = JSON.parse(fav)
        if (fav.favorites) {
            fav = fav.favorites
        } else {
            fav = []
        }
    } else {
        fav = []
    }
    return <>
        <h3>Favorites</h3>
        <div className="card-holder">
            {fav.map((data,id)=><Card
                image={data.image}
                artist={data.artist}
                title={data.title}
                id={data.id}
                key={id}
            />)}
            
        </div>
    </>
}