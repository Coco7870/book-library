import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { of } from 'rxjs';
import { BookService } from '../../services/book.service';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-grid',
  template: '' // No need for a template in the mock
})
class MockAppGridComponent {
  @Input() books: any[] | undefined; // Ensure to replicate the @Input() exactly as in the real component
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let bookServiceMock: any;

  beforeEach(async () => {
    bookServiceMock = jasmine.createSpyObj('BookService', ['getBooksBySubject']);
    bookServiceMock.getBooksBySubject.and.returnValue(of({
      works: [/* Mock search results */]
    }));

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ SearchComponent, MockAppGridComponent ],
      providers: [ { provide: BookService, useValue: bookServiceMock } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should perform search and update searchResults', () => {
    component.searchTerm = 'finance';
    component.performSearch();
    expect(bookServiceMock.getBooksBySubject).toHaveBeenCalledWith('finance.json?details=false');
    expect(component.searchResults.length).toBeLessThanOrEqual(9);
  });

  // Test for getCoverImageUrl
  it('should return the correct cover image URL', () => {
    const bookWithCover = { cover_id: 123 };
    const bookWithoutCover = {};
    expect(component.getCoverImageUrl(bookWithCover)).toContain('123-L.jpg');
    expect(component.getCoverImageUrl(bookWithoutCover)).toContain('No+Cover');
  });
});