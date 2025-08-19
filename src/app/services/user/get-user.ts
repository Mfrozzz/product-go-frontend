import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GetUser {
	private PATH = environment.apiUrl;
	private _http = inject(HttpClient);

	constructor() { }

	execute(token: any): Observable<any> {
		const url = `${this.PATH}/api/user/info`;
		return this._http.get<User>(url, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	}

}