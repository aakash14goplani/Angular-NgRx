import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import BookPageActions from "src/app/books/actions/books-page.actions";
import BooksApiActions from "src/app/books/actions/books-api.actions";

const createBook = (books: BookModel[], book: BookModel) => [...books, book];
const updateBook = (books: BookModel[], changes: BookModel) =>
  books.map(book => {
    return book.id === changes.id ? Object.assign({}, book, changes) : book;
  });
const deleteBook = (books: BookModel[], bookId: string) =>
  books.filter(book => bookId !== book.id);

export interface State {
  collection: BookModel[];
  activeBookId: string | null;
}

const initialState: State = {
  collection: [],
  activeBookId: null
}

export const booksPageReducers = createReducer(
  initialState,
  on(
    BookPageActions.enterBookPage,
    BookPageActions.cancelBookEdit,
    (state, action) => {
      return {
        ...state,
        activeBookId: null
      }
    }
  ),
  on(
    BookPageActions.selectBook,
    (state, action) => {
      return {
        ...state,
        activeBookId: action.bookId
      }
    }
  )
);
