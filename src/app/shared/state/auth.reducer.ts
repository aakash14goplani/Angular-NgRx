import { UserModel } from '../models';
import { createReducer } from '@ngrx/store';
import AuthApiActions from 'src/app/auth/actions/auth-api.actions';
import AuthUserActions from 'src/app/auth/actions/auth-user.actions';
import produceOn from './reducer-helper-function';
import { Draft } from 'immer';

export interface UserState {
  user: UserModel | null;
  gettingStatus: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  gettingStatus: true,
  error: null
};

export const authReducer = createReducer(
  initialState,
  produceOn(
    AuthUserActions.loginUser,
    (draft: Draft<UserState>, { username, password }) => ({
      ...draft,
      gettingStatus: true,
      user: null,
      error: null
    })
  ),
  produceOn(
    AuthUserActions.logoutUser,
    (draft: Draft<UserState>) => ({
      ...draft,
      user: null,
      gettingStatus: false,
      error: null
    })
  ),
  produceOn(
    AuthApiActions.getAuthStatusSuccess,
    (draft: Draft<UserState>, { user }) => ({
      ...draft,
      user,
      gettingStatus: false,
      error: null
    })
  ),
  produceOn(
    AuthApiActions.loginSuccess,
    (draft: Draft<UserState>, { user }) => ({
      ...draft,
      user,
      gettingStatus: false,
      error: null
    })
  ),
  produceOn(
    AuthApiActions.loginFailure,
    (draft: Draft<UserState>, { reason }) => ({
      ...draft,
      user: null,
      gettingStatus: false,
      error: reason
    })
  )
);

export const selectGettingStatus = (state: UserState) => state.gettingStatus;
export const selectUser = (state: UserState) => state.user;
export const selectError = (state: UserState) => state.error;
