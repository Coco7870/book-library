import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { WishlistService } from '../../services/wishlist.service';
import { BookDetail } from '../../models/book-details';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnDestroy {
  book: any;
  $ngDestroy = new Subject()
  wishlist: any;
  constructor(private route: ActivatedRoute, private bookService: BookService, private wishlistService: WishlistService) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.bookService.getBookById(bookId).pipe(takeUntil(this.$ngDestroy)).subscribe((data: any) => {
      this.book = data;
    });
    this.wishlist = this.wishlistService.getWishlist();
  }

  getCoverImageUrl(book: any): string {
    if (book.covers) {
      return `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`;
    } else {
      return 'https://via.placeholder.com/150'; // Provide a default book cover path
    }
  }
  ngOnDestroy(): void {
    this.$ngDestroy.next(true)
    this.$ngDestroy.complete()
  }


  toggleWishlist(book: any) {
    if (this.isInWishlist(book)) {
      this.wishlistService.removeFromWishlist(book);
    } else {
      this.wishlistService.addToWishlist(book);
    }
  }

  isInWishlist(book: any): boolean {
    return this.wishlist.some((item: any) => item.key === book.key);
  }
}
