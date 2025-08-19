import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class AutoLogoutService {
	private timeout: any;
	private readonly INCTIVITY_TIME = 20 * 60 * 1000;

	constructor(private _router: Router, private _zone: NgZone) {
		if (typeof window === 'undefined') {
			return;
		}
		if (localStorage.getItem('token')) {
			this.initListener();
			this.resetTimer();
		}
	}

	private initListener() {
		const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
		events.forEach(event => {
			window.addEventListener(event, () => this.resetTimer());
		});
	}

	private resetTimer() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		this.timeout = setTimeout(() => this.logout(), this.INCTIVITY_TIME);
	}

	private logout() {
		this._zone.run(() => {
			Swal.fire({
				icon: 'info',
				title: 'Session Expired',
				text: 'You have been logged out due to inactivity.',
				confirmButtonText: 'OK',
				customClass: {
					confirmButton: 'bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded'
				},
				buttonsStyling: false,
			}).then(() => {
				this.clearSession();
			});
		});
	}

	private clearSession() {
		localStorage.removeItem('token');
		localStorage.removeItem('isAdmin');
		localStorage.removeItem('isSuperAdmin');
		localStorage.removeItem('id_user');
		this._router.navigate(['/login']);
	}
}