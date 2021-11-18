
interface Book {
  id: string,
  title: string,
  imageUrl:string
}

export class User{
    id: string;
    name: string;
    email: string;
    reviews: any[];
    favourites: Book[];

  constructor(obj?: any) {
    this.id = obj?.id || null
    this.name = obj?.name || null
    this.email = obj?.email || null
    this.reviews = obj?.reviews || null
    this.favourites = []
    if(obj?.fave){
      let faves = obj.fave.concat(obj.blogs)
      for(let book of faves){
        this.favourites.push({id: book.id, title: book.title, imageUrl: book.imageUrl})
      }
    }
  }
}
