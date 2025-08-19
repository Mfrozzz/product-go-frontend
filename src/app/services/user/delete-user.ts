import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { User } from '../../models/user';

@Injectable({
	providedIn: 'root'
})
export class DeleteUser {
	private PATH = environment.apiUrl;
	private _http = inject(HttpClient);

	constructor() { }

	execute(id_user: number) {
		const url = `${this.PATH}/api/admin/users/${id_user}`;
		return this._http.delete<HttpEvent<User>>(url, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		});
	}
}