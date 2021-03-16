import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../book.service';
import { SearchBooksService } from '../search-books.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-catalog',
	templateUrl: './catalog.component.html',
	styleUrls: [ './catalog.component.scss' ]
})
export class CatalogComponent implements OnInit {
	books: Book[] = [];
	hasMoreBooks: boolean = false;

	constructor(
		private bookService: BookService,
		private searchBooksService: SearchBooksService,
		private cartService: CartService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.getBooks();
		this.searchBooksService.getSearchTermsSubject().subscribe((term) => {
			this.searchBooks(term);
		});
	}

	getBooks(): void {
		this.bookService
			.getBooks()
			.subscribe(
				(booksResponse) => (
					(this.books = booksResponse.content),
					(this.hasMoreBooks = !booksResponse.last)
				)
			);
	}

	getMoreBooks(): void {
		this.bookService
			.nextPage()
			.subscribe(
				(booksResponse) => (
					(this.books = [ ...this.books, ...booksResponse.content ]),
					(this.hasMoreBooks = !booksResponse.last)
				)
			);
	}

	searchBooks(term: string) {
		this.bookService
			.searchBooks(term)
			.subscribe(
				(booksResponse) => (
					(this.books = booksResponse.content),
					(this.hasMoreBooks = !booksResponse.last)
				)
			);
	}

	addBookToCart(book: Book) {
		this.cartService.addBookToCart(book);
	}

	goToBookDetails(bookId: number, event: Event) {
		const target = event.target as HTMLElement;
		if (
			target.tagName !== 'MAT-CARD-ACTIONS' &&
			target.tagName !== 'SPAN' &&
			target.tagName !== 'BUTTON'
		) {
			this.router.navigate([ `/livro/${bookId}` ]);
		}
	}
}
