import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = 'https://openlibrary.org/';
  constructor(private http: HttpClient) { }
  getAuthorById(name: string|null) {
    return this.http.get<Author>(`${this.apiUrl}search/authors.json?q=${name}`);
  }
}
