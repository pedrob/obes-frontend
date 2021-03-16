import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book, Page } from './models/book';
import { AuthService } from './auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class BookService {
	private page: number = 0;
	private booksUrl = 'http://localhost:8080/books';
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${this.authService.getToken()}`
		})
	};

	constructor(private http: HttpClient, private authService: AuthService) {}

	getBooks(): Observable<Page> {
		return this.http.get<Page>(this.booksUrl, this.httpOptions);
	}

	getBook(bookId: number): Observable<Book> {
		return this.http.get<Book>(
			`${this.booksUrl}/${bookId}`,
			this.httpOptions
		);
	}

	nextPage(): Observable<Page> {
		return this.http.get<Page>(
			`${this.booksUrl}?page=${this.page++}`,
			this.httpOptions
		);
	}

	getUserBooks(username: string): Observable<Page> {
		return this.http.get<Page>(
			`${this.booksUrl}/owner/${username}`,
			this.httpOptions
		);
	}

	getPurchedBooks(username: string): Observable<Page> {
		return this.http.get<Page>(
			`${this.booksUrl}/buyer/${username}`,
			this.httpOptions
		);
	}

	searchBooks(term: string): Observable<Page> {
		if (term) {
			return this.http.get<Page>(
				`${this.booksUrl}/search?term=${term}`,
				this.httpOptions
			);
		} else {
			return this.getBooks();
		}
	}
}
