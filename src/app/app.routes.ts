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
import { MainLayout } from './shared/layouts/main-layout/main-layout';
import { DetailUser } from './pages/detail-user/detail-user';
import { authGuard } from './shared/guards/auth-guard';
import { roleGuard } from './shared/guards/role-guard';

export const routes: Routes = [
    {
        path: "go",
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            { path: "products", component: ListProduct, title: "List Products" },
            { path: "products/create", component: CreateProduct, title: "Create Products" },
            { path: "products/:id", component: DetailProduct, title: "Detail Product" },
            { path: "products/update/:id", component: UpdateProduct, title: "Update Products" },
            { path: "user/:id/profile", component: ProfileUser, title: "User Profile" },
            {
                path: "admin",
                canActivate: [roleGuard],
                children: [
                    { path: "users", component: ManageUsers, title: "Manage Users" },
                    { path: "users/:id", component: DetailUser, title: "Detail User" },
                ]
            },
        ]
    },
    { path: "", component: Home, title: "Product Go Project" },
    { path: "register", component: Register, title: "Register" },
    { path: "login", component: Login, title: "Login" },
    { path: "**", component: PageNotFound, title: "404" }
];