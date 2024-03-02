import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm: string = '';
  searchCategory: string = 'subject';
  searchResults: any[] = [];

  constructor(private bookService: BookService) {}

  performSearch() {
    if (this.searchTerm) {
      this.bookService.getBooksBySubject(`${this.searchTerm}.json?details=false`)
        .subscribe((results:any) => {
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

}
