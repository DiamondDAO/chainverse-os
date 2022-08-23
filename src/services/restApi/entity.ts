import axios from 'axios'

let backendUrl: string =''

export const setBackendUrl = (url: string) => {
  backendUrl = url
}

export const getEntityByUUID = async (uuid: string) => {
  const path = `${backendUrl}/api/entities/${uuid}`
  return await axios.get(path)
}
export const getEntitySearch = async (term: string) => {
  const path = `${backendUrl}/api/entities?term=${term}`
  return await axios.get(path)
}