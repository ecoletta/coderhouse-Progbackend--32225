const fs = require('fs')

class ProductManager {

constructor(){
    this.path = "./productos.json"
    if(fs.existsSync(this.path)){
        this.products = JSON.parse(fs.readFileSync(this.path,"utf-8"))
    }else{
        this.products =[]
    }
}

async agregarProducto(title, description, price, codigo, idCodigo = 0, thumbnail, stock){
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
        //pass
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

    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
    console.log(`El producto ${product.title} fue agregado en la base de datos`)
    }

    async getProductById(idCodigo){
        let array = JSON.parse(await fs.promises.readFile(this.path))

        let product = array.filter((item) => item.idCodigo === idCodigo);
        if (product.length > 0){
            console.log(product)
            return product
        }else{
            console.log("Not found");
            return
        }
    }

    getProducts(){
        //Esto trate de hacerlo asincronico viendo ejemplos, no encontre hacer para que me resuelva la promesa.
        let productos = fs.readFileSync(this.path)
        return JSON.parse(productos)
    }

    async deleteProduct(idCodigo){
        let array = JSON.parse(await fs.promises.readFile(this.path))
        array = array.filter(item => item.idCodigo != idCodigo)

        await fs.promises.writeFile(this.path, JSON.stringify(array, null, '\t'))
        console.log(`El producto de id ${idCodigo} fue eliminado de la base de datos`)

    }

    async updateProduct(idCodigo, title, description, price, thumbnail, stock){
        let product = {
            title,
            description,
            price,
            thumbnail,
            stock
        };
        
        let array = JSON.parse(await fs.promises.readFile(this.path))
        array.map(item =>{
            if (item.idCodigo === idCodigo){
                item.title = title
                item.description = description
                item.price = price
                item.thumbnail = thumbnail
                item.stock = stock
            }
        })

        await fs.promises.writeFile(this.path, JSON.stringify(array, null, '\t'))
        console.log(`El producto de id ${idCodigo} fue modificado la base de datos`)

    }
}

///////////////////////////////////////////
const productos = new ProductManager();

//AGREGO PRODUCTO 1
//productos.agregarProducto("Zelda Ocarina of time","Juego Nintendo 64",500,"codigo1",0,"Imagen",10);

//AGREGO PRODUCTO 2
//productos.agregarProducto("Zelda Majora Mask","Juego Nintendo 64",500,"codigo2",0,"Imagen",10);

//AGREGO PRODUCTO 3
//productos.agregarProducto("God of War","Juego PS4",500,"codigo3",0,"Imagen",10);

//MUESTRO LOS PRODUCTOS
//console.log(productos.getProducts())

//ELIMINO EL PRODUCTO DE ID 2
//productos.deleteProduct(2)

//MODIFICO EL PRODUCTO CON ID 1
//productos.updateProduct(1,"Zelda Breath of wild","Juego Nintengo Switch",400, "imagen zelda",5)

//VUELVO A MODIFICAR EL PRODUCTO ID 1
//productos.updateProduct(1,"Zelda Ocarina of time","Juego Nintendo 64",400, "thumbnail",11)

