import { atom } from 'recoil'
import { STORAGE_ID } from '../constants'

const local_data = localStorage.getItem(STORAGE_ID)
let favoriteData = []
let recentSongs = []
if (local_data) {
    let data = JSON.parse(local_data)
    favoriteData = data.favoriteData ?? []
    recentSongs = data.recentSongs ?? []
}


export const appState = atom({
    key: "appState",
    default: {
        favoriteData,
        recentSongs
    }
})