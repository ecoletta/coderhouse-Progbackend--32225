import fs from 'fs'

class ProductManager {

constructor(){
    this.path = "./productos.json"
    if(fs.existsSync(this.path)){
        this.products = JSON.parse(fs.readFileSync(this.path,"utf-8"))
    }else{
        this.products =[]
    }
}

async agregarProducto(product){
    let producto = {
        title : product.title,
        description : product.description,
        price: product.price,
        codigo: product.codigo,
        idCodigo : 0,
        category: product.category,
        thumbnail: product.thumbnail,
        stock: product.stock,
        status : product.status || true
    };

    const found = this.products.some(item => item.codigo === producto.codigo)
    
    if (!found){
        //pass
    }else{
        console.log("Error, el codigo ingresado se encuentra repetido")
        return
    }
    
    if (this.products.length === 0){
        producto["idCodigo"] = 1;
    }else{
        producto["idCodigo"] = this.products[this.products.length - 1]["idCodigo"] + 1;
    }

    this.products.push(producto)

    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
    console.log(`El producto ${producto.title} fue agregado en la base de datos`)
    }

    async getProductById(idCodigo){
        let array = JSON.parse(await fs.promises.readFile(this.path))

        let product = array.filter((item) => item.idCodigo === idCodigo);
        if (product.length > 0){
            return product[0]
        }else{
            console.log(`No se encuentra un producto con el id ${idCodigo}. `);
            return
        }
    }

    getProducts(){
        //Esto trate de hacerlo asincronico viendo ejemplos, no encontre hacer para que me resuelva la promesa.
        let productos = fs.readFileSync(this.path)
        return JSON.parse(productos)
    }

    async deleteProduct(idCodigo){

        const found = this.products.some(item => item.idCodigo === idCodigo)

        if (found){
            let array = JSON.parse(await fs.promises.readFile(this.path))
            array = array.filter(item => item.idCodigo != idCodigo)

            await fs.promises.writeFile(this.path, JSON.stringify(array, null, '\t'))
            const respuesta = `El producto de id ${idCodigo} fue eliminado de la base de datos`
            return respuesta
        }else{
            const respuesta = "El elemento a eliminar no se encuentra entre los productos"
            return respuesta
        }
    }

    async updateProduct(product){
               
        let array = JSON.parse(await fs.promises.readFile(this.path))
        array.map(item =>{
            if (item.idCodigo === product.idCodigo){
                item.title = product.title
                item.description = product.description
                item.price = product.price
                item.codigo = product.codigo
                item.category = product.category
                item.thumbnail = product.thumbnail
                item.stock = product.stock
                item.status = product.status
            }
        })

        await fs.promises.writeFile(this.path, JSON.stringify(array, null, '\t'))
        console.log(`El producto fue modificado la base de datos`)
        return
    }
}

///////////////////////////////////////////
const productos = new ProductManager();

//AGREGO PRODUCTO 1
//productos.agregarProducto("Zelda Ocarina of time","Juego Nintendo 64",500,"codigo1",0,"RPG","Imagen",10);

//AGREGO PRODUCTO 2
//productos.agregarProducto("Zelda Majora Mask","Juego Nintendo 64",500,"codigo2",0,"RPG","Imagen",10);

//AGREGO PRODUCTO 3
//productos.agregarProducto("God of War","Juego PS4",500,"codigo3",0,"Action","Imagen",10);

//AGREGO PRODUCTO 4
//productos.agregarProducto("Final Fantasy XV","Juego PS4",400,"codigo4",0,"RPG","Imagen",15);

//AGREGO PRODUCTO 5
//productos.agregarProducto("Fire Emblem Three Houses","Switch",450,"codigo5",0,"RPG","Imagen",13);

//MUESTRO LOS PRODUCTOS
//console.log(productos.getProducts())

//MODIFICO EL PRODUCTO CON ID 1
//productos.updateProduct(1,"Zelda Breath of wild","Juego Nintengo Switch",400, "imagen zelda",5)

//VUELVO A MODIFICAR EL PRODUCTO ID 1
//productos.updateProduct(1,"Zelda Ocarina of time","Juego Nintendo 64",400, "thumbnail",11)

//CONSULTO ELEMENTO POR ID
//productos.getProductById(2)

//CONSULTO ELEMENTO POR ID QUE NO EXISTE
//productos.getProductById(9)

//ELIMINO EL PRODUCTO DE ID 2
//productos.deleteProduct(2)

//ELIMINO EL PRODUCTO DE ID QUE NO EXISTE
//productos.deleteProduct(9)

export default new ProductManager()
