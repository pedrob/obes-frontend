import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Book } from '../models/book';
import { BookService } from '../book.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateComponent } from '../modal-create/modal-create.component';

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
		private bookService: BookService,
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.loggedUsername = this.authService.getAuthenticatedUserUsername();
		this.bookService
			.getUserBooks()
			.subscribe((booksResponse) => (this.userBooks = booksResponse.content));
		this.bookService
			.getPurchedBooks()
			.subscribe(
				(booksResponse) => (this.purchedBooks = booksResponse.content)
			);
	}

	openDialog() {
		this.dialog.open(ModalCreateComponent, {
			data: {
				animal: 'panda'
			}
		});
	}
}
