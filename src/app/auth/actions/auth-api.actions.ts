import { createAction } from "@ngrx/store";
import { UserModel } from "src/app/shared/models";

enum AuthApiActionTypes {
  getAuthStatusSuccess = '[Auth/API] Get Auth Status Success',
  loginSuccess = '[Auth/API] Login Success',
  loginFailure = '[Auth/API] Login Failure'
}

const getAuthStatusSuccess = createAction(
  AuthApiActionTypes.getAuthStatusSuccess,
  (user: UserModel | null) => ({ user })
);

const loginSuccess = createAction(
  AuthApiActionTypes.loginSuccess,
  (user: UserModel) => ({ user })
);

const loginFailure = createAction(
  AuthApiActionTypes.loginFailure,
  (reason: string) => ({ reason })
);

const AuthApiActions = {
  getAuthStatusSuccess,
  loginSuccess,
  loginFailure
};

export default AuthApiActions;
