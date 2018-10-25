import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://myburger-builder.firebaseio.com/'
})

export default instance