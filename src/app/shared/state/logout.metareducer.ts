import { ActionReducer, Action } from '@ngrx/store';
import AuthUserActions from 'src/app/auth/actions/auth-user.actions';
import { State } from './index';

export function logoutMetareducer(reducer: ActionReducer<State>) {
  return function (state: State, action: Action) {
    if (action.type === AuthUserActions.logoutUser.type) {
      return reducer(undefined, action);
    }

    return reducer(state, action);
  };
}
