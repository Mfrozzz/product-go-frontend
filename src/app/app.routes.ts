import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { CreateProduct } from './pages/create-product/create-product';
import { UpdateProduct } from './pages/update-product/update-product';
import { ListProduct } from './pages/list-product/list-product';
import { DetailProduct } from './pages/detail-product/detail-product';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { ProfileUser } from './pages/profile-user/profile-user';
import { ManageUsers } from './pages/manage-users/manage-users';
import { MainLayout } from './shared/main-layout/main-layout';

export const routes: Routes = [
    { path: "register", component: Register, title: "Register" },
    { path: "login", component: Login, title: "Login" },
    {
        path: "",
        component: MainLayout,
        children: [
            { path: "", component: Home, title: "Product Go Project" },
            { path: "products", component: ListProduct, title: "List Products" },
            { path: "products/create", component: CreateProduct, title: "Create Products" },
            { path: "products/:id", component: DetailProduct, title: "Detail Product" },
            { path: "products/update/:id", component: UpdateProduct, title: "Update Products" },
            { path: "user/:id/profile", component: ProfileUser, title: "User Profile" },
            { path: "admin/users", component: ManageUsers, title: "Manage Users" },
            { path: "**", component: PageNotFound, title: "404" }
        ]
    }
];