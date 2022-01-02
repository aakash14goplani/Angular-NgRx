import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BookModel } from 'src/app/shared/models';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksListComponent {
  @Input() books!: BookModel[] | null;
  @Input() readonly = false;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() select = new EventEmitter();
  @Output() delete = new EventEmitter();
}
