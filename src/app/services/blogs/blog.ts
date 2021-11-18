export class Blog{
    id: string
    title: string
    imageUrl: string
    body: string
    author: string
    language: string
    comments: any[]
    likes: number
    date: Date
    tags: string[]
    similar: Blog[]
    duration: number

  constructor(obj: any) {
      this.id = obj._id
      this.title = obj.title
      this.imageUrl = obj.imageUrl
      this.body = obj.body
      this.author = obj.author.name
      this.language = obj.language
      this.comments = obj.comments
      this.likes = obj.likes
      this.date = obj.createdAt
      this.tags = obj.tags
      this.similar = obj.similar.map((blog: any) => new Blog(blog))
      this.duration = obj.duration || 5
  }
}
