import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { BookService } from '../book.service';
import { CartService } from '../cart.service';
import { Book } from '../models/book';

@Component({
	selector: 'app-book-detail',
	templateUrl: './book-detail.component.html',
	styleUrls: [ './book-detail.component.scss' ]
})
export class BookDetailComponent implements OnInit {
	book?: Book;
	isAuthenticated: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private bookService: BookService,
		private authService: AuthService,
		private cartService: CartService
	) {}

	ngOnInit(): void {
		const bookId = parseInt(
			this.route.snapshot.paramMap.get('bookId') || '0'
		);
		this.bookService
			.getBook(bookId)
			.subscribe((book) => (this.book = book));

		this.authService
			.isAuthenticated()
			.subscribe(
				(authenticated) => (this.isAuthenticated = authenticated)
			);
	}

	addBookToCart(book: Book) {
		this.cartService.addBookToCart(book);
	}
}
