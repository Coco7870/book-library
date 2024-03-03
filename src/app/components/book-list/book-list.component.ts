import { Component, OnDestroy } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Subject, map, takeUntil } from 'rxjs';
import { Books, Work } from '../../models/books';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnDestroy {
  books: Work[] = [];
  wishlist: any;
  $ngDestroy=new Subject()
  constructor(private bookService: BookService) { }
  ngOnInit(): void {
    this.bookService.getBooksBySubject('finance.json?details=false')
      .pipe(
        map((data: Books) => data.works.slice(0, 9)),takeUntil(this.$ngDestroy)
      )
      .subscribe(books => {
        this.books = books;
      });
  }
  ngOnDestroy(): void {
    this.$ngDestroy.next(true)
    this.$ngDestroy.complete()
  }
}
