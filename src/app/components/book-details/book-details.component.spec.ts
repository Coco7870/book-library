import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { WishlistService } from '../../services/wishlist.service';
import { HttpClientModule } from '@angular/common/http';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let bookService: jasmine.SpyObj<BookService>;
  let wishlistService: jasmine.SpyObj<WishlistService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const bookServiceSpy = jasmine.createSpyObj('BookService', ['getBookById']);
    const wishlistServiceSpy = jasmine.createSpyObj('WishlistService', ['getWishlist', 'addToWishlist', 'removeFromWishlist']);

    await TestBed.configureTestingModule({
      declarations: [ BookDetailsComponent ],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        { provide: BookService, useValue: bookServiceSpy },
        { provide: WishlistService, useValue: wishlistServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'test-book-id' } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;
    wishlistService = TestBed.inject(WishlistService) as jasmine.SpyObj<WishlistService>;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly identify if a book is in the wishlist', () => {
    component.wishlist = [{ key: 'test-book-key' }];
    const testBook = { key: 'test-book-key' };

    expect(component.isInWishlist(testBook)).toBeTrue();
  });

  it('should add book to wishlist if not already in it', () => {
    component.wishlist = [];
    const testBook = { key: 'new-book-key' };
    component.toggleWishlist(testBook);

    expect(wishlistService.addToWishlist).toHaveBeenCalledWith(testBook);
  });

  it('should remove book from wishlist if it is already in it', () => {
    component.wishlist = [{ key: 'test-book-key' }];
    const testBook = { key: 'test-book-key' };
    component.toggleWishlist(testBook);

    expect(wishlistService.removeFromWishlist).toHaveBeenCalledWith(testBook);
  });

  // Add more tests as needed
});
