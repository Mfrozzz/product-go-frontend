import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Product } from '../../models/product';

@Injectable({
	providedIn: 'root'
})
export class CreateProductService {
	private PATH = environment.apiUrl;
	private _http = inject(HttpClient);

	constructor() { }

	execute(productData: any) {
		const url = `${this.PATH}/api/products`;
		if (typeof window === 'undefined') { return }
		const product = this._http.post<HttpEvent<Product>>(url, productData, {
			reportProgress: true,
			observe: "events",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		});
		return product;
	}

}