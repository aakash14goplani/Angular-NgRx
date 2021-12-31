import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of, tap, mergeMap } from "rxjs";
import { AuthService } from "../shared/services/auth.service";
import { RouterActions } from "../shared/state/router.actions";
import AuthApiActions from "./actions/auth-api.actions";
import AuthUserActions from "./actions/auth-user.actions";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private auth: AuthService) {}

  getAuthStatus$ = createEffect(() =>
    this.auth.getStatus().pipe(map(userOrNull => AuthApiActions.getAuthStatusSuccess(userOrNull)))
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthUserActions.loginUser),
      concatMap(action => {
        return this.auth.login(action.username, action.password).pipe(
          mergeMap(user => {
            const actions = [];
            actions.push(AuthApiActions.loginSuccess(user));
            actions.push(RouterActions.Go(['books']));
            return of(...actions);
          }),
          catchError(reason => of(AuthApiActions.loginFailure(reason)))
        );
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthUserActions.logoutUser),
        tap(() => this.auth.logout()),
        map(_ => RouterActions.Go(['login']))
      )
  );
}
