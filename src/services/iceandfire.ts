import { Book } from "../types/books";

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
  static async getBooks(page: number, pageSize: number): Promise<Book[]> {
    return await getData(`/books?page=${page}&pageSize=${pageSize}`);
  }
}