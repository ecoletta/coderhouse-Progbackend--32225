class ProductManager {

constructor(){
    this.products = []
    this.path = "./productos.json"
}

getProductos(){
    return this.products
}

agregarProducto(title, description, price, codigo, idCodigo = 0, thumbnail, stock){
    let product = {
        title,
        description,
        price,
        codigo,
        idCodigo: idCodigo || 0,
        thumbnail,
        stock
        };

    const found = this.products.some(item => item.codigo === product.codigo)
    
    if (!found){
        console.log("Se agrego el producto correctamente")
    }else{
        console.log("Error, el codigo ingresado se encuentra repetido")
        return
    }
    
    if (this.products.length === 0){
        product["idCodigo"] = 1;
    }else{
        product["idCodigo"] = this.products[this.products.length - 1]["idCodigo"] + 1;
    }

    this.products.push(product)

    }

    getProductById(idCodigo){
        let product = this.products.filter((item) => item.idCodigo === idCodigo);
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
productos.agregarProducto("Zelda Ocarina","Juego Nintendo 64",500,"codigo1",0,"Imagen",10);
productos.agregarProducto("God of war","Juego PS4",500,"codigo2",0,"Imagen",10);
//console.log(productos.getProductos());
productos.getProductById(2);