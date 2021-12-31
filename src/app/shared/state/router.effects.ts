import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap } from "rxjs";
import { RouterActions } from "./router.actions";

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) { }

  navigate$ = createEffect(() => this.actions$.pipe(
    ofType(RouterActions.Go),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  ), { dispatch: false });

  navigateBack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouterActions.Back),
      tap(() => this.location.back())
    ), { dispatch: false }
  );
}
