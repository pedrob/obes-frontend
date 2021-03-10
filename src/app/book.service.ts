import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Page } from './book';

@Injectable({
	providedIn: 'root'
})
export class BookService {
	private booksUrl = 'http://localhost:8080/books';
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization:
				'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwZWRybyIsImV4cCI6MTYxNjI0MjM3OH0.ds9fCmuwjscDINsmsODcNmPElUkXFFdCHql0ac8otRr9moJQGD3gwIZI9tAae98Xq9J1K-PfUTETKitX-sce9A'
		})
	};

	constructor(private http: HttpClient) {}

	getBooks(): Observable<Page> {
		return this.http.get<Page>(this.booksUrl, this.httpOptions);
	}
}
