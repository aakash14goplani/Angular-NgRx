import { createReducer, on, Action, createSelector, State } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import BookPageActions from "src/app/books/actions/books-page.actions";
import BooksApiActions from "src/app/books/actions/books-api.actions";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Draft } from "immer";
import produceOn from "./reducer-helper-function";

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
  produceOn(
    BookPageActions.enterBookPage,
    (draft: Draft<BooksState>) => {
      return {
        ...draft,
        activeBookId: null
      }
    }
  ),
  produceOn(
    BookPageActions.cancelBookEdit,
    (draft: Draft<BooksState>) => {
      return {
        ...draft,
        activeBookId: null
      }
    }
  ),
  produceOn(
    BookPageActions.selectBook,
    (draft: Draft<BooksState>, { bookId }) => {
      return {
        ...draft,
        activeBookId: bookId
      }
    }
  ),
  produceOn(
    BooksApiActions.booksLoaded,
    (draft: Draft<BooksState>, { books }) => {
      return adapter.addMany(books, draft);
    }
  ),
  produceOn(
    BooksApiActions.bookCreated,
    (draft: Draft<BooksState>, { book }) => {
      return adapter.addOne(book, {
        ...draft,
        activeBookId: null
      });
    }
  ),
  produceOn(
    BooksApiActions.bookUpdated,
    (draft: Draft<BooksState>, { book }) => {
      return adapter.updateOne({ id: book.id, changes: book }, {
        ...draft,
        activeBookId: null
      });
    }
  ),
  produceOn(
    BooksApiActions.bookDeleted,
    (draft: Draft<BooksState>, { bookId }) => {
      return adapter.removeOne(bookId, draft);
    }
  )
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
