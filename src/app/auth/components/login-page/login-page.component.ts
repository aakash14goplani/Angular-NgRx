import { Component } from "@angular/core";
import { Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import { UserModel } from "src/app/shared/models";
import { LoginEvent } from "../login-form";
import AuthUserActions from "../../actions/auth-user.actions";
import { AuthSelectors, State } from "src/app/shared/state";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent {
  gettingStatus$: Observable<boolean>;
  user$: Observable<UserModel | null>;
  error$: Observable<string | null>;

  constructor(private store: Store<State>) {
    this.gettingStatus$ = this.store.select(AuthSelectors.selectGettingAuthStatus);
    this.user$ = store.select(AuthSelectors.selectAuthUser);
    this.error$ = store.select(AuthSelectors.selectAuthError);
  }

  onLogin($event: LoginEvent) {
    this.store.dispatch(AuthUserActions.loginUser($event.username, $event.password));
  }
}
