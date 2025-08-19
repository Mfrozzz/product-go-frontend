import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { ListProducts } from '../../services/product/list-products';
import { Product } from '../../models/product';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-list-product',
	imports: [CommonModule, FormsModule],
	templateUrl: './list-product.html',
	styleUrl: './list-product.css'
})
export class ListProduct {
	isAdmin = false;
	user?: User;
	products: Product[] = [];
	productsLoaded: boolean = false;

	search = '';
	page = 1;
	perPage = 10;
	sortField: string = 'name';
	sortDirection: 'asc' | 'desc' = 'asc';

	constructor(private _router: Router, private _listProductsService: ListProducts, private _cdr: ChangeDetectorRef, private _zone: NgZone) { }

	ngOnInit() {
		if (typeof window === 'undefined') { return }

		this.listProducts();
	}

	listProducts() {
		this._listProductsService.execute().subscribe({
			next: (response) => {
				this.products = response || [];
			},
			error: (err) => {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'Failed to fetch products. Please try again later.',
					customClass: {
						confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
					},
					confirmButtonText: 'OK',
					buttonsStyling: false,
				});
			},
			complete: () => {
				this._zone.run(() => {
					this.productsLoaded = true;
					this._cdr.detectChanges();
				});
			}
		});
	}

	get filteredProducts() {
		let result = (this.products ?? []).filter(p =>
			typeof p.name === 'string' && p.name.toLowerCase().includes(this.search.toLowerCase())
		);

		if (this.sortField) {
			result = result.sort((a: any, b: any) => {
				const valueA = a[this.sortField];
				const valueB = b[this.sortField];

				if (valueA == null || valueB == null) return 0;

				if (typeof valueA === 'string' && typeof valueB === 'string') {
					return this.sortDirection === 'asc'
						? valueA.localeCompare(valueB)
						: valueB.localeCompare(valueA);
				}

				if (typeof valueA === 'number' && typeof valueB === 'number') {
					return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
				}

				return 0;
			});
		}

		return result;
	}

	changeSort(field: string) {
		if (this.sortField === field) {
			this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			this.sortField = field;
			this.sortDirection = 'asc';
		}
	}

	get totalPages() {
		return Math.max(1, Math.ceil(this.filteredProducts.length / this.perPage));
	}

	get paginatedProducts() {
		const start = (this.page - 1) * this.perPage;
		return this.filteredProducts.slice(start, start + this.perPage);
	}

	goToDetails(id_product: number) {
		this._router.navigate([`/go/products/${id_product}`]);
	}

	goToCreateProduct() {
		this._router.navigate(["/go/products/create"]);
	}

	onSearchChange() {
		this.page = 1;
	}

	onPerPageChange() {
		this.page = 1;
	}

	prevPage() {
		if (this.page > 1) this.page--;
	}

	nextPage() {
		if (this.page < this.totalPages) this.page++;
	}

}