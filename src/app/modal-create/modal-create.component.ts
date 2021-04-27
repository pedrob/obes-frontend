import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../book.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {
  createForm!: FormGroup;
  loading = false;
  submitted = false;
  bookImage = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.required]],
      description: ['']
    });
  }

  get f() { return this.createForm.controls; }

  onFileChanged(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.bookImage = file;
      }
  }

  uploadImage(data: Book) {
    this.bookService.uploadBookImage(this.bookImage, data.id).subscribe(data => {
      alert("Imagem enviada com sucesso");
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.createForm.invalid) {
      alert('Dados inválidos');
      return;
    }

    if (isNaN(parseFloat(this.f.price.value))) {
      alert('Preço inválido');
      return;
    }

    this.loading = true;
    this.bookService.createBook({
      title: this.f.title.value,
      author: this.f.author.value,
      price: this.f.price.value,
      description: this.f.description.value
    }).subscribe(data => {
      this.loading = false;
      this.bookImage && this.uploadImage(data);
      alert("Criado com sucesso");
      this.dialog.closeAll();
    });
  }
}
