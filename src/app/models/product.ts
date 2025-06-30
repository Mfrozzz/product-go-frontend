export class Product {
    id_product?: number;
    name?: string;
    price?: number;

    constructor(id_product?: number, name?: string, price?: number) {
        this.id_product = id_product;
        this.name = name;
        this.price = price;
    }
}