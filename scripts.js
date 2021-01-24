
const BASE_URL = 'https://api.lyrics.ovh/'

const app = {
    musicList: [],
    searchInput: document.getElementById('search-input'),
    debounceTimer: null,
    init() {
        this.searchInput.addEventListener('focusout', () => {
            if (this.searchInput.value === "") {
                const parentDiv = this.searchInput.parentElement.parentElement
                parentDiv.classList.remove('animate-search-box')
            }
        })

        this.searchInput.addEventListener('keyup', () => {
            let userInput = this.searchInput.value
            if (userInput.length === 1) {
                const parentDiv = this.searchInput.parentElement.parentElement
                parentDiv.classList.add('animate-search-box')
            }
            if (userInput.length === 0)
                document.querySelector('.lyric-list').innerHTML = ''
            clearTimeout(this.debounceTimer)
            this.debounce('suggest', userInput)
        })
        // this.debounce()
    },
    getLyricData(param1, param2) {
        fetch(`${BASE_URL}${param1}/${param2}`)
            .then(p => p.json())
            .then(d => this.musicList = d.data)
            .then(() => this.renderMusicList())
            .catch(err => document.querySelector('.lyric-list').innerHTML = '')
    },
    debounce(param1, param2) {
        this.debounceTimer = setTimeout(() => {
            this.getLyricData(param1, param2)
        }, 1000)
    },
    renderMusicList() {
        let html = this.musicList
            .reduce((accumulator, list) => accumulator + this.generateCard(list.title, list.album.cover_small)
                , '')
        document.querySelector('.lyric-list').innerHTML = html
    },
    generateCard(name, image) {
        return `<div class="card">
            <img class="image" src="${image}" alt="">
            <div class="details">
                ${name}
            </div>
        </div>`
    }
}

app.init()