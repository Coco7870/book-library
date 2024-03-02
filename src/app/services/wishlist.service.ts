import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: any[] = [];

  constructor() { }

  addToWishlist(book: any) {
    const index = this.wishlist.findIndex((item) => item.key === book.key);
    if (index === -1) {
      this.wishlist.push(book);
    }
  }

  removeFromWishlist(book: any) {
    const index = this.wishlist.findIndex((item) => item.key === book.key);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
    }
  }

  getWishlist() {
    return this.wishlist;
  }
}
