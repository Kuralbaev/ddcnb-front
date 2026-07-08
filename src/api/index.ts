import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.242.139:1337/api',
})
