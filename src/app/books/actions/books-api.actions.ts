import { createAction, props } from "@ngrx/store";
import { BookModel } from "src/app/shared/models";

enum BookApiActionTypes {
  LOAD = '[Books API] Books Loaded Success',
  CREATE = '[Books API] Book Created',
  UPDATE = '[Books API] Book Updated',
  DELETE = '[Books API] Book Deleted'
}

const booksLoaded = createAction(
  BookApiActionTypes.LOAD,
  props<{ books: BookModel[] }>()
);

const bookCreated = createAction(
  BookApiActionTypes.CREATE,
  props<{ book: BookModel }>()
);

const bookUpdated = createAction(
  BookApiActionTypes.UPDATE,
  props<{ book: BookModel }>()
);

const bookDeleted = createAction(
  BookApiActionTypes.DELETE,
  props<{ bookId: string }>()
);

const BookApiActions = {
  booksLoaded,
  bookCreated,
  bookUpdated,
  bookDeleted
};

export default BookApiActions;
