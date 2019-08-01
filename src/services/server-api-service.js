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
            .then(res => {
                if (!res.ok) {
                    this.setState({error: 'Something went wrong, try again.'})
                }
                return res.json()
            })
    },
    //TODO IMPLEMENT USER_ID here
    getSavedSeeds(user_id) {
        return fetch(`${config.API_ENDPOINT}/music/vibes`)
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    //TODO IMPLEMENT USER_ID
    saveTrack(name, id, img, artist, album, user_id=1) {
        const track = JSON.stringify({name, id, img, artist, album, user_id})
        return fetch(`${config.API_ENDPOINT}/music/vibes`, {
            headers: {
                'Content-Type': 'application/json',
                'type': 'track'
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
    //TODO IMPLEMENT USER_ID
    saveArtist(name, id, img, user_id=1) {
        const artist = JSON.stringify({name, id, img, user_id})
        return fetch(`${config.API_ENDPOINT}/music/vibes`, {
            headers: {
                'Content-Type': 'application/json',
                'type': 'artist'
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
    //TODO Implement USER_ID
    getRecommendations(emotions, user_id=1) {
        const emotionJson = JSON.stringify(emotions)
        return fetch(`${config.API_ENDPOINT}/music/recommendations`, {
            headers: {
                'Content-Type': 'application/json',
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
    //TODO implement USER_ID
    saveEntry(notes, img, song, emotions, user_id=1) {
        //insert to emotions table; return emotions id save into entries table;
        const entryJson = JSON.stringify({notes, img, song, user_id})
        return fetch(`${config.API_ENDPOINT}/entries`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: entryJson
        })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    }
}

export default ServerApiService