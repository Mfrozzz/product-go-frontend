export class User {
    id_user?: string;
    email?: string;
    username?: string;
    password?: string;
    role?: string;

    constructor(id_user?: string, email?: string, username?: string, password?: string, role?: string) {
        this.id_user = id_user;
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}