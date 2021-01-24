
const BASE_URL = 'https://api.lyrics.ovh/'

const app = {
    musicList: [],
    musicCard: [],
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
            clearTimeout(this.debounceTimer)
            if (userInput.length === 1) {
                const parentDiv = this.searchInput.parentElement.parentElement
                parentDiv.classList.add('animate-search-box')
            }
            if (userInput.length === 0)
                document.querySelector('.lyric-list').innerHTML = ''
            if (userInput.length > 0)
                this.debounce('suggest', userInput, this.getMusicList)
        })

        document.getElementById('modal-close').addEventListener('click', function () {
            document.getElementById('main-body').classList.remove('overflow-hidden')
            document.getElementById('modal').classList.add('d-none')
        })
    },
    getMusicList(param1, param2) {
        document.querySelector('.lyric-list').innerHTML = '<div class="lds-facebook"><div></div><div></div><div></div></div>'
        fetch(`${BASE_URL}${param1}/${param2}`)
            .then(p => p.json())
            .then(d => app.musicList = d.data)
            .then(() => app.renderMusicList())
            .then(() => app.attachListeners())
            .catch(err => document.querySelector('.lyric-list').innerHTML = 'An error occurred')
    },
    debounce(param1, param2, callback) {
        this.debounceTimer = setTimeout(() => {
            callback(param1, param2)
        }, 500)
    },
    renderMusicList() {
        let html = this.musicList
            .reduce((accumulator, list) => accumulator + this.generateCard(list.title, list.album.cover_small, list.artist.name)
                , '')
        document.querySelector('.lyric-list').innerHTML = html
    },
    getLyrics(artist, name) {
        document.getElementById('modal-lyrics').innerHTML = '<div class="lds-facebook"><div></div><div></div><div></div></div>'
        fetch(`${BASE_URL}v1/${artist}/${name}`)
            .then(p => p.json())
            .then(data => data.lyrics)
            .then(lyrics => lyrics === "" ? Promise.reject('') : lyrics)
            .then(lyrics => lyrics.split('\n'))
            .then(splitterLyrics => splitterLyrics.reduce((accumulator, value) => accumulator + `<p>${value}</p>`, ''))
            .then(html => document.getElementById('modal-lyrics').innerHTML = html)
            .catch(e => document.getElementById('modal-lyrics').innerHTML = "An error occurred")
    },
    generateCard(name, image, artist) {
        return `<div class="card" data-artist="${artist}" data-name="${name}">
            <img class="image" src="${image}" alt="">
            <div class="details">
                <div>${name}</div>
                <div>${artist}</div>
            </div>
        </div>`
    },
    attachListeners() {
        this.musicCard.forEach(element => element.removeEventListener('click', this.cardListener))
        const cards = document.querySelectorAll('.card')
        this.musicCard = Array.from(cards)
        this.musicCard.forEach((element, index) => element.addEventListener('click', () => this.cardListener(element, index)))
    },
    cardListener(element, index) {
        const artistName = element.getAttribute('data-artist')
        const musicName = element.getAttribute('data-name')
        document.getElementById('main-body').classList.add('overflow-hidden')
        document.getElementById('modal').classList.remove('d-none')
        document.getElementById('modal-album-image').setAttribute('src', this.musicList[index].album.cover_medium)
        document.getElementById('modal-song-name').innerHTML = this.musicList[index].title
        document.getElementById('modal-artist-name').innerHTML = this.musicList[index].artist.name
        this.getLyrics(artistName, musicName)
    }
}

app.init()