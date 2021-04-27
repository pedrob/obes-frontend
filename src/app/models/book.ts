export interface Book {
	id: number;
	title: string;
	description: string;
	imageUrl?: string;
	author: string;
	price: number;
	createdAt?: Date;
}

export interface Page {
	content: Book[];
	totalPages: number;
	last: boolean;
	number: number;
	size: number;
	first: boolean;
	empty: boolean;
}
