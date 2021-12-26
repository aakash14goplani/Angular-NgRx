import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { BookModel, BookRequiredProps } from "src/app/shared/models";
import { BooksSelectors, State } from "src/app/shared/state";
import BookPageActions from "../../actions/books-page.actions";
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

  constructor(private store: Store<State>) {
    this.total$ = this.store.select(BooksSelectors.selectBooksEarningsTotals);
    this.books$ = this.store.select(BooksSelectors.selectAllBooks);
    this.currentBook$ = this.store.select(BooksSelectors.selectActiveBook);
  }

  ngOnInit() {
    this.store.dispatch(BookPageActions.enterBookPage());
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
  }

  updateBook(book: BookModel) {
    this.store.dispatch(BookPageActions.updateBook({ bookId: book.id, book }));
  }

  onDelete(book: BookModel) {
    this.store.dispatch(BookPageActions.deleteBook({ bookId: book.id }));
  }
}
