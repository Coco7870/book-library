import { Component } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Work } from '../../models/books';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  wishlist: Work[] = [];

  constructor(private wishlistService: WishlistService) { }

  ngOnInit() {
    this.wishlist = this.wishlistService.getWishlist();
  }

  removeFromWishlist(book: any) {
    this.wishlistService.removeFromWishlist(book);
    // Update the local wishlist to reflect the change
    this.wishlist = this.wishlistService.getWishlist();
  }
  getCoverImageUrl(book: any): string {
    if (book.cover_id) {
      return `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`;
    } else {
      return 'https://via.placeholder.com/150x220?text=No+Cover'; // Provide a default book cover path
    }
  }
}
