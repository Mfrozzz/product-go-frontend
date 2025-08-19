import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
	if (typeof window === 'undefined') {
		return next(req);
	}
	const token = localStorage.getItem('token');
	const protectedEndpoints = [
		"products",
		"products/create",
		"products/:id",
		"products/update/:id",
		"user/:id/profile",
		"admin/users",
		"admin/users/:id",
	];


	const isProtected = protectedEndpoints.some(endpoint => req.url.includes(endpoint));
	if (isProtected && token) {
		req = req.clone({
			setHeaders: { Authorization: `Bearer ${token}` }
		});
	}
	return next(req);
};