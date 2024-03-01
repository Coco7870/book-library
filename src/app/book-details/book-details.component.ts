import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../service/book.service';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  book: any;
  wishlist: any;
  constructor(private route: ActivatedRoute, private bookService: BookService, private wishlistService: WishlistService) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.bookService.getBookById(bookId).subscribe((data: any) => {
      this.book = data;
      this.book.coverUrl = this.getCoverImageUrl(data);
    });


    this.wishlist = this.wishlistService.getWishlist();

  }

  getCoverImageUrl(book: any): string {
    if (book.cover_id) {
      return `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`;
    } else {
      return 'https://via.placeholder.com/150'; // Provide a default book cover path
    }
  }


  toggleWishlist(book: any) {
    if (this.isInWishlist(book)) {
      this.wishlistService.removeFromWishlist(book);
    } else {
      this.wishlistService.addToWishlist(book);
    }
  }

  isInWishlist(book: any): boolean {
    return this.wishlist.some((item:any) => item.key === book.key);
  }
}
