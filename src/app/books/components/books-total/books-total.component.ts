import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-books-total',
  templateUrl: './books-total.component.html',
  styleUrls: ['./books-total.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksTotalComponent {
  @Input() total!: number | null;
}
