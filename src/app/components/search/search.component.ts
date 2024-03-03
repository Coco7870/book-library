import { Component, OnDestroy } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Books, Work } from '../../models/books';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnDestroy  {
  searchTerm: string = '';
  searchCategory: string = 'subject';
  searchResults: Work[] = [];
  $ngDestroy=new Subject()
  constructor(private bookService: BookService) {}

  performSearch() {
    if (this.searchTerm) {
      this.bookService.getBooksBySubject(`${this.searchTerm}.json?details=false`)
      .pipe(takeUntil(this.$ngDestroy)).subscribe((results:Books) => {
          this.searchResults = results.works.slice(0, 9); // Limit to 9 results
        });
    }
  }
  getCoverImageUrl(book: any): string {
    if (book.cover_id) {
      return `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`;
    } else {
      return 'https://via.placeholder.com/150x220?text=No+Cover'; // Provide a default book cover path
    }
  }
  ngOnDestroy(): void {
    this.$ngDestroy.next(true)
    this.$ngDestroy.complete()
  }

}
