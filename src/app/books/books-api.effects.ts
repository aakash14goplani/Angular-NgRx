import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, concatMap, EMPTY, exhaustMap, map, mergeMap, Observable, of } from "rxjs";
import { BooksService } from "../shared/services";
import BookApiActions from "./actions/books-api.actions";
import BooksPageActions from "./actions/books-page.actions";

@Injectable()
export class BooksApiEffects {

  constructor(
    private actions$: Actions,
    private booksService: BooksService
  ) {}

  getAllBooks$ = createEffect(() => this.actions$.pipe(
    ofType(BooksPageActions.enterBookPage),
    exhaustMap(_ => this.booksService.all().pipe(
      map(books => BookApiActions.booksLoaded({ books }))
    )),
    catchError(error => this.handleError(error))
  ));

  createBook$ = createEffect(() => this.actions$.pipe(
    ofType(BooksPageActions.createBook),
    concatMap(action => this.booksService.create(action.book).pipe(
      mergeMap(book => {
        const actions = [];
        actions.push(BooksPageActions.cancelBookEdit());
        actions.push(BookApiActions.bookCreated({ book }));
        return of(...actions);
      })
    )),
    catchError(error => this.handleError(error))
  ));

  updateBook$ = createEffect(() => this.actions$.pipe(
    ofType(BooksPageActions.updateBook),
    concatMap(action => this.booksService.update(action.bookId, action.book).pipe(
      map(book => BookApiActions.bookUpdated({ book }))
    )),
    catchError(error => this.handleError(error))
  ));

  deleteBook$ = createEffect(() => this.actions$.pipe(
    ofType(BooksPageActions.deleteBook),
    mergeMap(action => this.booksService.delete(action.bookId).pipe(
      mergeMap(_ => {
        const actions = [];
        actions.push(BooksPageActions.cancelBookEdit());
        actions.push(BookApiActions.bookDeleted({ bookId: action.bookId }));
        return of(...actions);
      })
    )),
    catchError(error => this.handleError(error))
  ));

  private handleError(error: any): Observable<any> {
    return EMPTY;
  }
}
