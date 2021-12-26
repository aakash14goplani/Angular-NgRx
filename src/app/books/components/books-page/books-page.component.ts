import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  BookModel,
  BookRequiredProps
} from "src/app/shared/models";
import { BooksSelectors, State } from "src/app/shared/state";
import BookPageActions from "../../actions/books-page.actions";
import BooksApiActions from "../../actions/books-api.actions";
import { BooksService } from "src/app/shared/services";
import { Observable } from "rxjs";

@Component({
  selector: "app-books",
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksPageComponent implements OnInit {
  total$: Observable<number | null>;
  books$: Observable<BookModel[]>;
  currentBook$: Observable<BookModel | null>;

  constructor(
    private booksService: BooksService,
    private store: Store<State>
  ) {
    this.total$ = this.store.select(BooksSelectors.selectBooksEarningsTotals);
    this.books$ = this.store.select(BooksSelectors.selectAllBooks);
    this.currentBook$ = this.store.select(BooksSelectors.selectActiveBook);
  }

  ngOnInit() {
    this.store.dispatch(BookPageActions.enterBookPage());

    this.getBooks();
  }

  getBooks() {
    this.booksService.all().subscribe(books => {
      this.store.dispatch(BooksApiActions.booksLoaded({ books }));
    });
  }

  onSelect(book: BookModel) {
    this.store.dispatch(BookPageActions.selectBook({ bookId: book.id }));
  }

  onCancel() {
    this.removeSelectedBook();
  }

  removeSelectedBook() {
    this.store.dispatch(BookPageActions.cancelBookEdit());
  }

  onSave(book: BookRequiredProps | BookModel) {
    if ("id" in book) {
      this.updateBook(book);
    } else {
      this.saveBook(book);
    }
  }

  saveBook(bookProps: BookRequiredProps) {
    this.store.dispatch(BookPageActions.createBook({ book: bookProps }));

    this.booksService.create(bookProps).subscribe((book) => {
      this.getBooks();
      this.removeSelectedBook();

      this.store.dispatch(BooksApiActions.bookCreated({ book }));
    });
  }

  updateBook(book: BookModel) {
    this.store.dispatch(BookPageActions.updateBook({ bookId: book.id, book }));

    this.booksService.update(book.id, book).subscribe((book) => {
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
