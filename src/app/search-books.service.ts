import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SearchBooksService {
	private searchTermsSubject = new BehaviorSubject<string>('');

	constructor() {}

	getSearchTermsSubject(): Observable<string> {
		return this.searchTermsSubject.asObservable();
	}

	setSearchTermsSubject(term: string) {
		this.searchTermsSubject.next(term);
	}
}
