import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from './models/book';
import { Cart } from './models/cart';

@Injectable({
	providedIn: 'root'
})
export class CartService {
	private cartSubject = new BehaviorSubject<Cart>(this.getCartFromStorage());

	constructor() {}

	getCart(): Observable<Cart> {
		return this.cartSubject.asObservable();
	}

	addBookToCart(book: Book) {
		this.cartSubject.next(this.addToStorage(book));
	}

	private addToStorage(book: Book): Cart {
		let cart = this.getCartFromStorage();
		if (cart.books.length > 0) {
			if (cart.books.find((cartBook) => cartBook.id === book.id)) {
				alert('Livro já foi adicionado');
				return cart;
			}
			cart.books.push(book);
			localStorage.setItem('@cart', JSON.stringify(cart));
			return cart;
		} else {
			cart.books.push(book);
			localStorage.setItem('@cart', JSON.stringify(cart));
			return cart;
		}
	}

	private getCartFromStorage(): Cart {
		let cart = localStorage.getItem('@cart');
		if (cart) {
			let parsedCart = JSON.parse(cart) as Cart;
			return parsedCart;
		}
		return { books: [] };
	}
}
