import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UserModel } from "./shared/models";
import { AuthSelectors, State } from "./shared/state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "NgRx Workshop";
  links = [{ path: "/books", icon: "book", label: "Books" }];
  user$: Observable<UserModel | null>;

  constructor(private store: Store<State>) {
    this.user$ = store.select(AuthSelectors.selectAuthUser);
  }
}
