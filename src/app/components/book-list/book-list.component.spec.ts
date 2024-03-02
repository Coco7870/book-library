import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { of, map } from 'rxjs';
import { BookService } from '../../services/book.service';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-grid',
  template: '' // No need for a template in the mock
})
class MockAppGridComponent {
  @Input() books: any[] | undefined; // Ensure to replicate the @Input() exactly as in the real component
}
describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let bookServiceMock: any;

  beforeEach(async () => {
    // Mock BookService
    bookServiceMock = jasmine.createSpyObj('BookService', ['getBooksBySubject']);
    bookServiceMock.getBooksBySubject.and.returnValue(of({
      works: [/* Mock array of books */]
    }));

    await TestBed.configureTestingModule({
      declarations: [ 
        BookListComponent,
        MockAppGridComponent // Use the mock component here
      ],
      providers: [
        { provide: BookService, useValue: bookServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass books to app-grid', () => {
    const gridElement: MockAppGridComponent = fixture.debugElement.query(By.directive(MockAppGridComponent)).componentInstance;
    fixture.detectChanges(); // Ensure changes are reflected
    expect(gridElement.books).toEqual(component.books); // Assuming component.books gets populated as in ngOnInit
  });

  // Add more tests as needed
});