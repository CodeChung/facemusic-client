import config from '../config'

const AuthApiService = {
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json())
    },
    postLogin(user) {
        return fetch(`${config.API_ENDPOINT}/users/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json())
    }
}

export default AuthApiService