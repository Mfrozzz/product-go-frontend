import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';

export const routes: Routes = [
    { path: "", component: Home, title: "Product Go Project" },
    { path: "register", component: Register, title: "Register" },
    { path: "login", component: Login, title: "Login" },
    { path: "**", redirectTo: "" }
];