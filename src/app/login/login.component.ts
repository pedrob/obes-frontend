import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;
	submitted = false;
	loading = false;

	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			username: [ '', Validators.required ],
			password: [ '', Validators.required ]
		});
	}

	get form() { return this.loginForm?.controls; }

	onSubmit() {
		this.submitted = true;
		if (this.loginForm!.invalid) {
			return;
		}
		this.loading = true;
		this.authService.signIn(this.form?.username.value, this.form?.password.value).subscribe(
			data => this.router.navigate(["/dashboard"]), error => {
				alert("Credenciais Inválidas");
				this.loading = false;
		});
	}
}
