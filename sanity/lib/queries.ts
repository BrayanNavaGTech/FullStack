import { client } from './client'

export async function getSettings() {
  const query = `*[_type == "settings"][0]`
  const data = await client.fetch(query)
  return data
}