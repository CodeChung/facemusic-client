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
        console.log(img)
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
}

export default ServerApiService