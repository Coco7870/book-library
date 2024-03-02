import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { BookService } from '../../services/book.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  @Input() books: any[] = [];
  wishlist: any;
  constructor(private router: Router, private bookService: BookService,private wishlistService: WishlistService) { }

  ngOnInit(): void {
      this.wishlist = this.wishlistService.getWishlist();
  }
 
  addToWishlist(book: any) {
    if(this.isInWishlist(book)) {
      this.wishlistService.removeFromWishlist(book);
    } else {
      this.wishlistService.addToWishlist(book);
    }
  }

  getCoverImageUrl(book: any): string {
    if (book.cover_id) {
      return `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`;
    } else {
      return 'https://via.placeholder.com/150x220?text=No+Cover'; // Provide a default book cover path
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
