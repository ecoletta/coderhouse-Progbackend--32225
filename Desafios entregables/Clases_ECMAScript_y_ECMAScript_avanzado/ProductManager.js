class ProductManager {

constructor(){
    this.products = []
}

getProductos(){
    return this.products
}

agregarProducto(title, description, price, codigo = 0, thumbnail, stock){
    let product = {
        title,
        description,
        price,
        codigo: codigo || 0,
        thumbnail,
        stock
        };
    
    if (this.products.length === 0){
        product["codigo"] = 1;
    }else{
        product["codigo"] = this.products[this.products.length - 1]["codigo"] + 1;
    }

    this.products.push(product)

    }

    getProductById(codigo){
        let product = this.products.filter((item) => item.codigo === codigo);
        if (product.length > 0){
            console.log(product)
            return product
        }else{
            console.log("Not found");
            return
        }
    }
}

///////////////////////////////////////////
const productos = new ProductManager();
productos.agregarProducto("Zelda Ocarina","Juego Nintendo 64",500,0,"Imagen",10);
productos.agregarProducto("God of war","Juego PS4",500,0,"Imagen",10);
//console.log(productos.getProductos());
productos.getProductById(2);