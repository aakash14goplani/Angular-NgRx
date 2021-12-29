import { Action, ActionReducer, ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";

export interface State {
  books: fromBooks.BooksState
}

export const reducers: ActionReducerMap<State> = {
  books: fromBooks.reducer
};

function logger(reducer: ActionReducer<any, any>) {
  return (state: State, action: Action) => {
    console.log('sss Previous state: ', state);
    console.log('sss Next Actione: ', action);

    const nextState = reducer(state, action);

    console.log('sss Next state: ', nextState);

    return nextState;
  }
}

export const metaReducers: MetaReducer<any, any>[] = [logger];

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
