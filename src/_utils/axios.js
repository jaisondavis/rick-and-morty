import axios from 'axios'

const baseDomain = 'https://rickandmortyapi.com'
const baseURL = `${baseDomain}/api`

export default axios.create({baseURL})