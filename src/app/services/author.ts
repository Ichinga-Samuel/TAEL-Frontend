

export class Author{
  id: string
  name: string
  bio: string
  gender: string
  birthdate: string
  country: string
  books: any[]
  constructor(obj?: any) {
    this.id = obj?._id || null
    this.name = obj?.name || null
    this.bio = obj?.bio || null
    this.gender = obj?.gender || null
    this.birthdate = obj?.birthdate || null
    this.country = obj?.country|| null
    this.books = obj?.books|| null
  }
}
