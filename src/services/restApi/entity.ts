import axios from 'axios'

export const getEntityByUUID = async (uuid: string) => {
  const path = `/api/entities/${uuid}`
  return await axios.get(path)
}
export const getEntitySearch = async (term: string) => {
  const path = `/api/entities?term${term}`
  return await axios.get(path)
}