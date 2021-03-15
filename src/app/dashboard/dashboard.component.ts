import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Book } from '../models/book';
import { BookService } from '../book.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.scss' ],
	encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
	loggedUsername?: string;
	userBooks: Book[] = [];
	purchedBooks: Book[] = [];

	constructor(
		private authService: AuthService,
		private bookService: BookService
	) {}

	ngOnInit(): void {
		this.loggedUsername = this.authService.getAuthenticatedUserUsername();
		this.bookService
			.getUserBooks(this.loggedUsername)
			.subscribe(
				(booksResponse) => (this.userBooks = booksResponse.content)
			);
		this.bookService
			.getPurchedBooks(this.loggedUsername)
			.subscribe(
				(booksResponse) => (this.purchedBooks = booksResponse.content)
			);
	}
}
