import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDetailsComponent } from './author-details.component';
import { AuthorService } from '../../services/author.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AuthorDetailsComponent', () => {
  let component: AuthorDetailsComponent;
  let fixture: ComponentFixture<AuthorDetailsComponent>;
  let mockAuthorService: any;
  let mockActivatedRoute: any;
  let mockAuthor: any;

  beforeEach(async () => {
    // Prepare a mock author object
    mockAuthor = {
      docs: [{
        cover_id: '123456',
        name: 'Author Name',
        // other author properties
      }]
    };

    // Create a spy for the AuthorService
    mockAuthorService = jasmine.createSpyObj('AuthorService', ['getAuthorById']);
    mockAuthorService.getAuthorById.and.returnValue(of(mockAuthor));

    // Mock the ActivatedRoute
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('test-author-id')
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ AuthorDetailsComponent ],
      providers: [
        { provide: AuthorService, useValue: mockAuthorService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAuthorById with the right author ID', () => {
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(mockAuthorService.getAuthorById).toHaveBeenCalledWith('test-author-id');
  });

  it('should set the author property with data returned from the service', () => {
    expect(component.author).toEqual(mockAuthor.docs[0]);
  });


  it('should provide a default photoUrl if cover_id is not present', () => {
    const mockAuthorWithoutCover = {
      docs: [{ /* author without cover_id */ }]
    };
    mockAuthorService.getAuthorById.and.returnValue(of(mockAuthorWithoutCover));
    fixture = TestBed.createComponent(AuthorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    const defaultPhotoUrl = 'https://via.placeholder.com/150x220?text=No+Cover';
    expect(component.author?.photoUrl).toEqual(defaultPhotoUrl);
  });
});