import axios from 'axios'

var URL = {
  http: 'http://192.168.3.12:4000',
}

if (process.env.NODE_ENV !== 'dev') {
  URL = {
    http: 'https://cyber-server-app.herokuapp.com',
  }
}

export const api = axios.create({
  baseURL: URL.http,
})
