import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
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
    this.store.dispatch(removeFromReadingList({ item }));

    const snackbar = this.snackbar.open('Book removed from reading list', 'Undo', { duration: 3000 });

    snackbar.onAction().subscribe(() => {
      const book = {
        id: item.bookId,
        authors: item.authors,
        description: item.description,
        title: item.title,
        coverUrl: item.coverUrl,
        publisher: item.publisher
      };

      this.store.dispatch(addToReadingList({ book }));
    });
  }
}
