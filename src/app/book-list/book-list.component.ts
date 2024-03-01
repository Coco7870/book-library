import { Component } from '@angular/core';
import { BookService } from '../service/book.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  books: any[] = [];
  wishlist: any;
  constructor(private router: Router, private bookService: BookService,private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.bookService.getBooksBySubject('finance.json?details=false')
      .pipe(
        map((data: any) => data.works.slice(0, 9))
      )
      .subscribe(books => {
        this.books = books;
      });
      this.wishlist = this.wishlistService.getWishlist();
  }
  addToWishlist(book: any) {
    this.wishlistService.addToWishlist(book);
  }
  getCoverImageUrl(book: any): string {
    if (book.cover_id) {
      return `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`;
    } else {
      return 'https://via.placeholder.com/150'; // Provide a default book cover path
    }
  }
  goToBookDetails(bookKey: string) {
    // Remove the leading slash if present
    const cleanedBookKey = bookKey.startsWith('/') ? bookKey.split('/')[2] : bookKey;

    // Navigate to the book details page with the cleaned book key
    this.router.navigate(['/book', cleanedBookKey]);
  }
  goToAuthoDetails(name: string) {   
    // Navigate to the author details page with the cleaned book key
    this.router.navigate(['/author', name]);
  }
  isInWishlist(book: any): boolean {
    return this.wishlist.some((item:any) => item.key === book.key);
  }
}
