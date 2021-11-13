import {Author} from "../authors/author";
import {books} from "../../state";

export class Book{
  id: string;
  title: string;
  language: string;
  year: number;
  genres: string[];
  pages: number;
  branch: string;
  summary: string;
  fileUrl: string;
  imageUrl: string;
  ratings: number;
  reviews: any[];
  fileType: string;
  fileSize: number;
  downloads: number;
  authors: Author[] = [];
  similar: Book[] = []

  constructor(obj?: any) {
    this.id = obj?._id || null
    this.title = obj?.title || null;
    this.language = obj?.language || null;
    this.year = obj?.year || null;
    this.genres = obj?.genres || null;
    this.pages = obj?.pages || null;
    this.branch = obj?.branch || null;
    this.summary = obj?.summary || null;
    this.fileUrl = obj?.fileUrl || null;
    this.fileType = obj?.fileType || null;
    this.fileSize = obj?.fileSize || null;
    this.imageUrl = obj?.imageUrl || null;
    this.reviews = obj?.reviews || null;
    this.ratings = obj?.ratings || null;
    this.downloads = obj?.downloads || null;

    let similar = obj?.similar || []
    similar.map((book: any) => this.similar.push(new Book(book)))
    let authors = obj?.authors || []
    authors.map((author: any) => this.authors.push(new Author(author)))
  }

}
