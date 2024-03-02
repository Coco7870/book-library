import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  books: any[] = [];
  wishlist: any;
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooksBySubject('finance.json?details=false')
      .pipe(
        map((data: any) => data.works.slice(0, 9))
      )
      .subscribe(books => {
        this.books = books;
      });
  }

}
