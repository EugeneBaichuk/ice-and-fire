import { Character } from "../types/characters";

const path = "https://anapioficeandfire.com/api/";

async function getData(url: string): Promise<any> {
  const res = await fetch(`${path}${url}`);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
  }
  return await res.json();
}
export default class IceandfireApi {
  //?page=2&pageSize=10
  static async getCharacters(page: number, pageSize: number): Promise<Character[]> {
    return await getData(`/characters?page=${page}&pageSize=${pageSize}`);
  }
}