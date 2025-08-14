import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowProduct } from '../../services/product/show-product';
import { Product } from '../../models/product';
import { DeleteProductService } from '../../services/product/delete-product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-product',
  imports: [CommonModule],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css'
})

export class DetailProduct {
  isAdmin = false;
  product: Product | undefined = undefined;
  id_product: number | null = null;

  constructor(
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _showProductService: ShowProduct,
    private _cdr: ChangeDetectorRef,
    private _deleteProductService: DeleteProductService
  ) { }

  ngOnInit() {
    const param = this._actRoute.snapshot.paramMap.get("id");
    this.id_product = param ? Number(param) : null;
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      this.isAdmin = true;
    }
    if (this.id_product !== null) {
      this._showProductService.execute(this.id_product).subscribe((product: Product) => {
        this.product = product;
        this._cdr.detectChanges();
      });
    }
  }

  goBack() {
    this._router.navigate(["/p/products"]);
  }

  editProduct() {
    if (this.id_product !== null) {
      this._router.navigate([`/p/products/update/${this.id_product}`]);
    }
  }

  deleteProduct() {
    if (!this.product || this.id_product === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Product not loaded or missing ID.',
        customClass: {
          confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
        },
        buttonsStyling: false,
        confirmButtonText: 'OK'
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'bg-red-500 hover:bg-red-600 text-white m-2 font-semibold py-2 px-4 rounded',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black m-2 font-semibold py-2 px-4 rounded'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        this._deleteProductService.execute(this.id_product!).subscribe({
          next: () => {
            Swal.fire({
              title: 'Product Deleted',
              text: 'The product has been successfully deleted.',
              icon: 'success',
              customClass: {
                confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
              },
              buttonsStyling: false,
              confirmButtonText: 'OK'
            });
            this._router.navigate(["/p/products"]);
          },
          error: (err) => {
            Swal.fire({
              title: 'Error Deleting Product',
              text: err?.error?.message || 'Failed to delete product.',
              icon: 'error',
              customClass: {
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
              },
              buttonsStyling: false,
              confirmButtonText: 'OK'
            });
          }
        });
      }
    });
  }
}