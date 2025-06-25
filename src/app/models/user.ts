export class User {
    id?: string;
    email?: string;
    name?: string;
    password?: string;

    constructor(id?: string, email?: string, name?: string, password?: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
    }
}