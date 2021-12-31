import { createAction } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

enum RouterActionTypes {
  Go = '[Router] Go',
  Back = '[Router] Back'
}

const Go = createAction(
  RouterActionTypes.Go,
  (path: any[], query?: any, extras?: NavigationExtras) => ({ path, query, extras })
);

const Back = createAction(
  RouterActionTypes.Back
);

export const RouterActions = {
  Go,
  Back
};
