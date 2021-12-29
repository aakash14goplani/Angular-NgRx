import { createReducer, on, Action, createSelector, State } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import BookPageActions from "src/app/books/actions/books-page.actions";
import BooksApiActions from "src/app/books/actions/books-api.actions";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

/* const createBook = (books: BookModel[], book: BookModel) => [...books, book];
const updateBook = (books: BookModel[], changes: BookModel) =>
  books.map(book => {
    return book.id === changes.id ? Object.assign({}, book, changes) : book;
  });
const deleteBook = (books: BookModel[], bookId: string) =>
  books.filter(book => bookId !== book.id);

export interface BooksState {
  collection: BookModel[];
  activeBookId: string | null;
} */

export interface BooksState extends EntityState<BookModel> {
  // collection: BookModel[]; -> no need as this will be managed by Entity data strcture
  activeBookId: string | null;
}

const adapter: EntityAdapter<BookModel> = createEntityAdapter<BookModel>();

/* const initialState: BooksState = {
  collection: [],
  activeBookId: null
}; */

const initialState: BooksState = adapter.getInitialState({
  // collection: [], -> comes from adapter
  activeBookId: null // manually define custom ones
});

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
    /* return {
      ...state,
      collection: action.books
    }; */
    return adapter.addMany(action.books, state);
  }),
  on(BooksApiActions.bookCreated, (state, action) => {
    // return adapter.addOne(action.book, state); -> this should have been sufficient but we need additional param as well
    return adapter.addOne(action.book, {
      ...state,
      activeBookId: null
    });
    /* return {
      collection: createBook(state.collection, action.book),
      activeBookId: null
    }; */
  }),
  on(BooksApiActions.bookUpdated, (state, action) => {
    return adapter.updateOne({ id: action.book.id, changes: action.book }, {
      ...state,
      activeBookId: null
    });
    /* return {
      collection: updateBook(state.collection, action.book),
      activeBookId: null
    }; */
  }),
  on(BooksApiActions.bookDeleted, (state, action) => {
    return adapter.removeOne(action.bookId, state);
    /* return {
      ...state,
      collection: deleteBook(state.collection, action.bookId)
    }; */
  })
);

/**
 * For non-ivy env. we need to wrap the method in AOT-compatible wrapper function and export our reducer.
 * This can be omitted with v10 and above
 */
export function reducer(state: BooksState | undefined, action: Action) {
  return booksPageReducers(state, action);
}

/* export const selectAll = (state: BooksState) => state.collection; */
export const { selectAll, selectEntities } = adapter.getSelectors();
export const selectActiveBookId = (state: BooksState) => state.activeBookId;

export const selectActiveBook = createSelector(
  // selectAll,
  selectEntities,
  selectActiveBookId,
  // (books, activeBookId) => books.filter(book => book.id === activeBookId)[0] || null
  (booksEntities, activeBookId) => {
    return activeBookId ? booksEntities[activeBookId]! : null;
  }
);
export const selectEarningsTotals = createSelector(
  selectAll,
  calculateBooksGrossEarnings
);
