import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https://openlibrary.org/';

  constructor(private http: HttpClient) { }

  getBooksBySubject(subject: string) {
    return this.http.get(`${this.apiUrl}subjects/${subject}`)
  }
  getBookById(id: string|null) {
    return this.http.get(`${this.apiUrl}books/${id}.json`);
  }
}
