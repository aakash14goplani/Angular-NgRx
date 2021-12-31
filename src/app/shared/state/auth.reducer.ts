import { UserModel } from "../models";
import { createReducer, on } from "@ngrx/store";
import AuthApiActions from "src/app/auth/actions/auth-api.actions";
import AuthUserActions from "src/app/auth/actions/auth-user.actions";

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
  on(
    AuthUserActions.loginUser,
    (state, action) => {
      return {
        gettingStatus: true,
        user: null,
        error: null
      }
    }
  ),
  on(
    AuthUserActions.logoutUser,
    (state, action) => {
      return {
        user: null,
        gettingStatus: false,
        error: null
      }
    }
  ),
  on(AuthApiActions.getAuthStatusSuccess, (state, action) => {
    return {
      gettingStatus: false,
      user: action.user,
      error: null
    };
  }),
  on(AuthApiActions.loginSuccess, (state, action) => {
    return {
      gettingStatus: false,
      user: action.user,
      error: null
    };
  }),
  on(AuthApiActions.loginFailure, (state, action) => {
    return {
      gettingStatus: false,
      user: null,
      error: action.reason
    };
  })
);

export const selectGettingStatus = (state: UserState) => state.gettingStatus;
export const selectUser = (state: UserState) => state.user;
export const selectError = (state: UserState) => state.error;
