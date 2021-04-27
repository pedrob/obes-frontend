import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { Cart } from 'src/app/models/cart';
import { SearchBooksService } from 'src/app/search-books.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {
	cart: Cart = { books: [] };
	cartIsOpen: boolean = false;
	total: number = 0;

	constructor(
		private router: Router,
		private searchBooksService: SearchBooksService,
		private cartService: CartService
	) {}

	ngOnInit(): void {
		this.cartService.getCart().subscribe((cart) => {
			this.cart = cart;
			this.calculateTotal();
		});
	}

	calculateTotal() {
		let totalCalculated = 0;
		this.cart.books.map((book) => {
			totalCalculated += book.price;
		});
		this.total = totalCalculated;
	}

	search(searchTerm: string): void {
		this.router.navigate([ '/catalogo' ]);
		this.searchBooksService.setSearchTermsSubject(searchTerm);
	}

	toggleCart() {
		this.cartIsOpen = !this.cartIsOpen;
	}

	removeBookFromCart(bookId: number) {
		this.cartService.removeBookFromCart(bookId);
		this.calculateTotal();
	}

	finalizePurchase() {
		localStorage.setItem('@cart', JSON.stringify({ books: [] }));
		this.cart = { books: [] };
		alert('Compra finalizada!');
		this.cartIsOpen = false;
	}
}
