import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UserModel } from "src/app/shared/models";
import { State } from "src/app/shared/state";
import AuthUserActions from "../../actions/auth-user.actions";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent {
  @Input() user!: Observable<UserModel | null>;

  constructor(private store: Store<State>) {}

  onLogout() {
    this.store.dispatch(AuthUserActions.logoutUser());
  }
}

