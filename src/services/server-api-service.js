import config from '../config'
import TokenService from './token-service'

const ServerApiService = {
    getSpotifySearch(keyword) {
        //TODO implement header token authorization
        return fetch(`${config.API_ENDPOINT}/music/search/` + keyword)
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    //send img uri, return emotion data
    convertPhotoToEmotion(img) {
        return fetch(`${config.API_ENDPOINT}/photos`, {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: img
        })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    //TODO IMPLEMENT USER_ID here
    getSavedSeeds(user_id) {
        return fetch(`${config.API_ENDPOINT}/music/vibes`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    saveTrack(name, id, img, artist, album) {
        const track = JSON.stringify({name, id, img, artist, album})
        return fetch(`${config.API_ENDPOINT}/music/vibes`, {
            headers: {
                'Content-Type': 'application/json',
                'type': 'track',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            method: 'POST',
            body: track
        })
            .then(res => {
                if (!res.ok) {
                    return {error: 'Something went wrong, try again.'}
                }
                return res.json()
            })
    },
    saveArtist(name, id, img) {
        const artist = JSON.stringify({name, id, img})
        return fetch(`${config.API_ENDPOINT}/music/vibes`, {
            headers: {
                'Content-Type': 'application/json',
                'type': 'artist',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            method: 'POST',
            body: artist
        })
            .then(res => {
                if (!res.ok) {
                    return {error: 'Something went wrong, try again.'}
                }
                return res.json()
            })
            
    },
    getRecommendations(emotions) {
        const emotionJson = JSON.stringify(emotions)
        return fetch(`${config.API_ENDPOINT}/music/recommendations`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            method: 'POST',
            body: emotionJson
        })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    saveEntry(notes, img, song, emotions) {
        //insert to emotions table; return emotions id save into entries table;
        const entryJson = JSON.stringify({notes, img, song, emotions})
        return fetch(`${config.API_ENDPOINT}/entries/new`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            method: 'POST',
            body: entryJson
        })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    getEntries() {
        return fetch(`${config.API_ENDPOINT}/entries`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res => 
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))    
                : res.json()
            )
    }
}

export default ServerApiService