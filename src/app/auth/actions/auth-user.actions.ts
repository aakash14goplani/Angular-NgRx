import { createAction } from "@ngrx/store";

enum AuthUserActionTypes {
  LOGIN = '[Auth] User Login',
  LOGOUT = '[Auth] User Logout'
}

const loginUser = createAction(
  AuthUserActionTypes.LOGIN,
  (username: string, password: string) => ({ username, password })
);

const logoutUser = createAction(
  AuthUserActionTypes.LOGOUT
);

const AuthUserActions = {
  loginUser,
  logoutUser
};

export default AuthUserActions;
