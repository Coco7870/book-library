import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.scss'
})
export class AuthorDetailsComponent implements OnDestroy {
  author:any;
  $ngDestroy=new Subject()
  constructor(private route: ActivatedRoute, private authorService: AuthorService) {}
  ngOnInit(): void {
    const authorId = this.route.snapshot.paramMap.get('id');
    this.authorService.getAuthorById(authorId).pipe(takeUntil(this.$ngDestroy)).subscribe((data:Author) => {
      this.author = data.docs[0];
      this.author.photoUrl = this.getPhotoUrl(data);
      // process other data as necessary
    });
  }

  getPhotoUrl(author: any): string {
    if (author.cover_id) {
      return `https://covers.openlibrary.org/b/id/${author.cover_id}-L.jpg`;
    } else {
      return 'https://via.placeholder.com/150x220?text=No+Cover'; // Provide a default book cover path
    } // Construct the photo URL or return a placeholder if none exists
  }
  ngOnDestroy(): void {
    this.$ngDestroy.next(true)
    this.$ngDestroy.complete()
  }
}
