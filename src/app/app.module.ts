import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './login/login.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

@NgModule({
	declarations: [
		AppComponent,
		CatalogComponent,
		DashboardComponent,
		HomeComponent,
		HeaderComponent,
		LoginComponent,
		PurchaseComponent,
		BookDetailComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatTabsModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
