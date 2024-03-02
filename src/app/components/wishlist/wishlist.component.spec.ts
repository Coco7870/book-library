import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistComponent } from './wishlist.component';
import { WishlistService } from '../../services/wishlist.service';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-grid',
  template: '' // No need for a template in the mock
})
class MockAppGridComponent {
  @Input() books: any[] | undefined; // Ensure to replicate the @Input() exactly as in the real component
}
describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
  let wishlistServiceMock: any;

  beforeEach(async () => {
    // Mock WishlistService
    wishlistServiceMock = jasmine.createSpyObj('WishlistService', ['getWishlist', 'removeFromWishlist']);
    wishlistServiceMock.getWishlist.and.returnValue([/* Mock wishlist items */]);

    await TestBed.configureTestingModule({
      declarations: [ WishlistComponent,MockAppGridComponent ],
      providers: [ { provide: WishlistService, useValue: wishlistServiceMock } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize wishlist from service on ngOnInit', () => {
    expect(wishlistServiceMock.getWishlist).toHaveBeenCalled();
    expect(component.wishlist.length).toBe(0);
  });

  it('should remove item from wishlist', () => {
    const initialLength = component.wishlist.length;
    const bookToRemove = component.wishlist[0];
    component.removeFromWishlist(bookToRemove);
    expect(wishlistServiceMock.removeFromWishlist).toHaveBeenCalledWith(bookToRemove);
    expect(component.wishlist.length).toBe(initialLength);
  });

  it('should return the correct cover image URL', () => {
    const bookWithCover = { cover_id: 123 };
    const bookWithoutCover = {};
    expect(component.getCoverImageUrl(bookWithCover)).toContain('123-L.jpg');
    expect(component.getCoverImageUrl(bookWithoutCover)).toContain('No+Cover');
  });
});
