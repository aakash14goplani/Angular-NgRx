import { Action, ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";
import { logoutMetareducer } from "./logout.metareducer";

export interface State {
  books: fromBooks.BooksState,
  auth: fromAuth.UserState
}

export const reducers: ActionReducerMap<State> = {
  books: fromBooks.reducer,
  auth: fromAuth.authReducer
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

export const metaReducers: MetaReducer<any, any>[] = [logger, logoutMetareducer];

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

// const selectAuthState = (state: State) => state.auth;
const selectAuthState = createFeatureSelector<fromAuth.UserState>('auth');
const selectGettingAuthStatus = createSelector(
  selectAuthState,
  fromAuth.selectGettingStatus
);
const selectAuthUser = createSelector(
  selectAuthState,
  fromAuth.selectUser
);
const selectAuthError = createSelector(
  selectAuthState,
  fromAuth.selectError
);

export const BooksSelectors = {
  selectAllBooks,
  selectActiveBook,
  selectBooksEarningsTotals
};

export const AuthSelectors = {
  selectGettingAuthStatus,
  selectAuthUser,
  selectAuthError
};
