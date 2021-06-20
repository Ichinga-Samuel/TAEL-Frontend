
export class UserState{
  name: string;
  email: string;
  reviews: any[];
  favourites: any[];

  constructor(obj?: any) {
    this.name = obj?.name || null
    this.email = obj?.email || null
    this.reviews = obj?.reviews || null
    this.favourites = obj?.fave || null
  }
}
