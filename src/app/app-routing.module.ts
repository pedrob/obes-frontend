import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CatalogComponent } from './catalog/catalog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{ path: 'catalogo', component: CatalogComponent },
	{ path: 'inicio', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'registro', component: RegisterComponent },
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [ AuthGuard ]
	},
	{ path: 'livro/:bookId', component: BookDetailComponent },
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
	providers: [ AuthGuard ]
})
export class AppRoutingModule {}
