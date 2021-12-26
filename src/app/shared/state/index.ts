import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";

export interface State {
  books: fromBooks.BooksState
}

export const reducers: ActionReducerMap<State> = {
  books: fromBooks.reducer
};

export const metaReducers: MetaReducer<State>[] = [];

const selectBooksState = (state: State) => state.books;
const selectAllBooks = createSelector(
  selectBooksState,
  fromBooks.selectAll
);
const selectActiveBook = createSelector(
  selectBooksState,
  fromBooks.selectActiveBook
);
const selectBooksEarningsTotals = createSelector(
  selectBooksState,
  fromBooks.selectEarningsTotals
);

export const BooksSelectors = {
  selectAllBooks,
  selectActiveBook,
  selectBooksEarningsTotals
};
