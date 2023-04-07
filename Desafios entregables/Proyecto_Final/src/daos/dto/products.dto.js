//CREAR DTO PARA PRODUCTS
export default class ProductsDTO {
    constructor(product){
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.codigo = product.codigo;
        this.category = product.category;
        this.thumbnail = product.thumbnail;
        this.stock = product.stock;
        this.status = product.status
    }
}