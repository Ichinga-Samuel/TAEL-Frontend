import {Book} from "../books/book";


export class Author{
  id: string
  name: string
  bio: string
  gender: string
  birthdate: string
  country: string
  imageUrl: string
  books: Book[] = []
  constructor(obj?: any) {
    this.id = obj?._id || null
    this.name = obj?.name || null
    this.bio = obj?.bio || null
    this.gender = obj?.gender || null
    this.birthdate = obj?.birthdate || null
    this.country = obj?.country || null
    this.imageUrl = obj?.imageUrl || null
    let books = obj?.books || []
    books.map((x: any) => this.books.push(new Book(x)))
  }
}
