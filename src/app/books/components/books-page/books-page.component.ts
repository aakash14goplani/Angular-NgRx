import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  BookModel,
  calculateBooksGrossEarnings,
  BookRequiredProps
} from "src/app/shared/models";
import { State } from "src/app/shared/state";
import BookPageActions from "../../actions/books-page.actions";
import BooksApiActions from "../../actions/books-api.actions";
import { BooksService } from "src/app/shared/services";

@Component({
  selector: "app-books",
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"]
})
export class BooksPageComponent implements OnInit {
  books: BookModel[] = [];
  currentBook: BookModel | null = null;
  total: number = 0;

  constructor(
    private booksService: BooksService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.store.dispatch(BookPageActions.enterBookPage());
    this.getBooks();
    this.removeSelectedBook();
  }

  getBooks() {
    this.booksService.all().subscribe(books => {
      this.books = books;
      this.updateTotals(books);
      this.store.dispatch(BooksApiActions.booksLoaded({ books }));
    });
  }

  updateTotals(books: BookModel[]) {
    this.total = calculateBooksGrossEarnings(books);
  }

  onSelect(book: BookModel) {
    this.store.dispatch(BookPageActions.selectBook({ bookId: book.id }));
    this.currentBook = book;
  }

  onCancel() {
    this.removeSelectedBook();
  }

  removeSelectedBook() {
    this.store.dispatch(BookPageActions.cancelBookEdit());
    this.currentBook = null;
  }

  onSave(book: BookRequiredProps | BookModel) {
    if ("id" in book) {
      this.store.dispatch(BookPageActions.updateBook({ bookId: book.id, book }));
      this.updateBook(book);
    } else {
      this.store.dispatch(BookPageActions.createBook({ book: book as BookRequiredProps }));
      this.saveBook(book);
    }
  }

  saveBook(bookProps: BookRequiredProps) {
    this.booksService.create(bookProps).subscribe((book) => {
      this.getBooks();
      this.removeSelectedBook();

      this.store.dispatch(BooksApiActions.bookCreated({ book }));
    });
  }

  updateBook(book: BookModel) {
    this.booksService.update(book.id, book).subscribe((book) => {
      this.getBooks();
      this.removeSelectedBook();
      this.store.dispatch(BooksApiActions.bookUpdated({ book }));
    });
  }

  onDelete(book: BookModel) {
    this.store.dispatch(BookPageActions.deleteBook({ bookId: book.id }));
    this.booksService.delete(book.id).subscribe(() => {
      this.getBooks();
      this.removeSelectedBook();
      this.store.dispatch(BooksApiActions.bookDeleted({ bookId: book.id }));
    });
  }
}
