import axios from 'axios'
import store from '@/store'


const request = axios.create()
request.interceptors.request.use((config) => {
    if (store.getters.loginToken) {
        config.headers['x-auth-token'] = store.getters.loginToken
        config.headers['Cache-Control'] = 'no-cache'
    }

    return config
})

const mapRequest = axios.create()
mapRequest.interceptors.request.use((config) => {
    if (store.getters.loginToken) config.headers['x-auth-token'] = store.getters.loginToken
    return config
})

export const http = request

export const mapHttp = mapRequest