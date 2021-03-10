import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
	selector: 'app-catalog',
	templateUrl: './catalog.component.html',
	styleUrls: [ './catalog.component.scss' ]
})
export class CatalogComponent implements OnInit {
	books: Book[] = [];

	constructor(private bookService: BookService) {}

	ngOnInit(): void {
		this.getBooks();
	}

	getBooks(): void {
		this.bookService
			.getBooks()
			.subscribe((booksResponse) => (this.books = booksResponse.content));
	}
}
