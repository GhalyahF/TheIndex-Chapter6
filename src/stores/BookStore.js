import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  constructor() {
    this.books = [];
    this.loading = true;
    this.query = "";

    this.fetchBooks();
  }
  //fetchBooks
  fetchBooks() {
    return instance
      .get("/api/books/")
      .then(res => res.data)
      .then(books => {
        this.books = books;
        this.loading = false;
      })
      .catch(err => console.error(err));
  }
  //filter books
  get filteredBooks() {
    return this.books.filter(book => {
      return book.title.toLowerCase().includes(this.query);
    });
  }
  //book by ID
  getBookById(id) {
    return this.books.find(book => book.id === +id);
  }
  //by color
  getBookByColor(color) {
    return this.filteredBooks.filter(book => book.color === +color);
  }
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  filteredBooks: computed
});

export default new BookStore();
