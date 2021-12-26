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

/**
 * we can export this function directly for ivy compilers v10+
 */
const booksPageReducers = createReducer(
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
  ),
  on(BooksApiActions.booksLoaded, (state, action) => {
    return {
      ...state,
      collection: action.books
    };
  }),
  on(BooksApiActions.bookCreated, (state, action) => {
    return {
      collection: createBook(state.collection, action.book),
      activeBookId: null
    };
  }),
  on(BooksApiActions.bookUpdated, (state, action) => {
    return {
      collection: updateBook(state.collection, action.book),
      activeBookId: null
    };
  }),
  on(BooksApiActions.bookDeleted, (state, action) => {
    return {
      ...state,
      collection: deleteBook(state.collection, action.bookId)
    };
  })
);

/**
 * For non-ivy env. we need to wrap the method in AOT-compatible wrapper function and export our reducer.
 * This can be omitted with v10 and above
 */
export function reducer(state: State | undefined, action: Action) {
  return booksPageReducers(state, action);
}

const selectAll = (state: State) => state.collection;
const selectActiveBookId = (state: State) => state.activeBookId;

const selectActiveBook = createSelector(
  selectAll,
  selectActiveBookId,
  (books, activeBookId) => books.find(book => book.id === activeBookId) || null
);
const selectEarningsTotals = createSelector(
  selectAll,
  calculateBooksGrossEarnings
);

export const BooksSelector = {
  selectActiveBook,
  selectEarningsTotals
};
