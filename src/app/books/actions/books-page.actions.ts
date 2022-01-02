import { createAction, props } from '@ngrx/store';
import { BookRequiredProps } from 'src/app/shared/models';

enum BookPageActionTypes {
  CREATE = '[BOOKS PAGE] CREATE A BOOK',
  UPDATE = '[BOOKS PAGE] UPDATE A BOOK',
  DELETE = '[BOOKS PAGE] DELETE A BOOK',
  SELECT = '[BOOKS PAGE] SELECT A BOOK',
  ENTER = '[BOOKS PAGE] ENTER BOOK PAGE',
  CANCEL = '[BOOKS PAGE] CANCEL EDITING A BOOK'
}

const createBook = createAction(
  BookPageActionTypes.CREATE,
  props<{ book: BookRequiredProps }>()
);

const updateBook = createAction(
  BookPageActionTypes.UPDATE,
  props<{ book: BookRequiredProps, bookId: string }>()
);

const deleteBook = createAction(
  BookPageActionTypes.DELETE,
  props<{ bookId: string }>()
);

const selectBook = createAction(
  BookPageActionTypes.SELECT,
  props<{ bookId: string }>()
);

const cancelBookEdit = createAction(
  BookPageActionTypes.CANCEL
);

const enterBookPage = createAction(
  BookPageActionTypes.ENTER
);

const BookPageActions = {
  createBook,
  updateBook,
  deleteBook,
  cancelBookEdit,
  selectBook,
  enterBookPage
};

export default BookPageActions;
