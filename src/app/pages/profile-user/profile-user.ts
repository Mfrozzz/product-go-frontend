import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { GetUserById } from '../../services/user/get-user-by-id';
import { UpdateUser } from '../../services/user/update-user';
import Swal from 'sweetalert2';
import { sanitizeInput } from '../../shared/utils/sanitize';

@Component({
	selector: 'app-profile-user',
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './profile-user.html',
	styleUrl: './profile-user.css'
})
export class ProfileUser {
	profileForm!: FormGroup;
	isSubmitted = false;
	isAdmin = false;
	user: User | undefined = undefined;
	id_user: number | null = null;
	activeTab: 'info' | 'edit' = 'info';
	errorMessage: string = "";

	constructor(private _formBuilder: FormBuilder, private _router: Router, private _actRoute: ActivatedRoute, private _cdr: ChangeDetectorRef, private _getUserByIdService: GetUserById, private _updateUserService: UpdateUser) { }

	ngOnInit() {
		this.profileForm = this._formBuilder.group({
			username: ["", [Validators.required, Validators.maxLength(50)]],
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.minLength(6)]]
		});
		this.getUser();
	}

	getUser() {
		this.id_user = Number(this._actRoute.snapshot.paramMap.get("id"));
		this._getUserByIdService.execute(this.id_user).subscribe((user: User) => {
			this.user = user;
			this.profileForm.patchValue({
				username: user.username,
				email: user.email
			});
			this._cdr.detectChanges();
		});
	}

	onSubmit() {
		if (this.profileForm.invalid || !this.user) {
			this.isSubmitted = true;
			return;
		}

		this.updateProfile();
	}

	updateProfile() {
		this.isSubmitted = true;
		Swal.fire({
			title: 'Update User',
			text: 'Are you sure you want to update this user?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, update it!',
			cancelButtonText: 'Cancel',
			customClass: {
				confirmButton: 'bg-yellow-500 hover:bg-yellow-600 text-white m-2 font-semibold py-2 px-4 rounded',
				cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black m-2 font-semibold py-2 px-4 rounded'
			},
			buttonsStyling: false
		}).then((result) => {
			if (result.isConfirmed) {
				const sanitizedUserUpdate = {
					username: sanitizeInput(this.profileForm.value.username),
					email: this.profileForm.value.email,
					password: this.profileForm.value.password
				}
				this._updateUserService.execute(this.id_user, sanitizedUserUpdate).subscribe({
					next: () => {
						Swal.fire({
							title: 'Success',
							text: 'User updated successfully.',
							icon: 'success',
							customClass: {
								confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
							},
							buttonsStyling: false
						}).then(() => {
							this.profileForm.reset();
							window.location.reload();
						});
					},
					error: (err) => {
						this.errorMessage = err?.error?.message || 'Update failed.';
						Swal.fire({
							title: 'Error',
							text: this.errorMessage,
							icon: 'error',
							customClass: {
								confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
							},
							buttonsStyling: false
						});
					}
				});
			}
		});
	}
}