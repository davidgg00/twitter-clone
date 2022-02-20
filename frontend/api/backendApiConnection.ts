import axios from 'axios'
const backendApiConnection = axios.create({
  baseURL: 'http://localhost:8000/api/',
})

export default backendApiConnection
