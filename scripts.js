const app = {
    searchInput: document.getElementById('search-input'),
    init() {
        this.searchInput.addEventListener('focusout', () => {
            if(this.searchInput.value === ""){
                const parentDiv = this.searchInput.parentElement
                parentDiv.classList.remove('animate-search-box')
            }
        })

        this.searchInput.addEventListener('keyup', () => {
            const parentDiv = this.searchInput.parentElement
            parentDiv.classList.add('animate-search-box')
        })
    },
    getLyricData() {
        fetch('https://api.lyrics.ovh/v1/Coldplay/Paradise')
            .then(p => p.json())
            .then(d => console.log(d))
    }
}

app.init()