import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return this.authService.isAuthenticated().pipe(
			map((authenticated: boolean) => {
				if (authenticated) {
					return true;
				}
				this.router.navigate([ '/inicio' ]);
				return false;
			}),
			catchError((error) => {
				this.router.navigate([ '/inicio' ]);
				return of(false);
			})
		);
	}
}
