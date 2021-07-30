import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToReadingList, bookFinishedFromReadingList, getReadingList, removeFromReadingList, unmarkBookAsFinished } from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private readonly snackbar: MatSnackBar) {}

  removeFromReadingList(item) {
    const book: Book = {
      ...item,
      id: item.bookId,
      finished: false,
      finishedDate: null
    };

    this.store.dispatch(unmarkBookAsFinished({ book }));

    this.store.dispatch(removeFromReadingList({ item }));

    const snackbar = this.snackbar.open('Book removed from reading list', 'Undo', { duration: 3000 });

    snackbar.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({ book }));
    });
  }

  bookFinishedFromReadingList(item) {
    item = {
      ...item,
      finished: true,
      finishedDate: new Date().toISOString()
    };

    this.store.dispatch(bookFinishedFromReadingList({ item }));
  }
}
