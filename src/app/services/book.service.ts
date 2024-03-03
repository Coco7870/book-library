import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Books } from '../models/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https://openlibrary.org/';

  constructor(private http: HttpClient) { }

  getBooksBySubject(subject: string){
    return this.http.get<Books>(`${this.apiUrl}subjects/${subject}`)
  }
  getBookById(id: string|null) {
    return this.http.get(`${this.apiUrl}works/${id}.json`);
  }
}
