import fs from 'fs'
import underscore from 'underscore'


class CartManager {

    constructor(){
        this.path = "./carritos.json"
        if(fs.existsSync(this.path)){
            this.carts = JSON.parse(fs.readFileSync(this.path,"utf-8"))
        }else{
            this.carts =[]
        }
    }

    async agregarcarrito(products){
        let cart = {
            "idCodigo": 0,
            "products": [{
                "idProduct": products.idCodigo,
                "quantity": 1
            }]
        }
        
        if (this.carts.length === 0){
            cart["idCodigo"] = 1;
        }else{
            cart["idCodigo"] = this.carts[this.carts.length - 1]["idCodigo"] + 1;
        }

        this.carts.push(cart)

        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'))
        console.log(`El carrito ${cart.idCodigo} fue agregado en la base de datos`)
        }

    async getCartById(idCodigo){
        let array = JSON.parse(await fs.promises.readFile(this.path))
        let cart = underscore.where(array,{idCodigo: parseInt(idCodigo)})
            
        if (cart.length == 0){
            return {info: "No se encuentra el carrito indicado"}
        }else{
            return cart[0]
        }
    }

    async updateCart(product,idCart){
        let array = JSON.parse(await fs.promises.readFile(this.path))

        array.map(item =>{
            if(item.idCodigo === idCart){
                item.products.push({"idProduct": product.idCodigo, "quantity": 1})
            }
        })

        await fs.promises.writeFile(this.path, JSON.stringify(array, null, '\t'))
        console.log(`El producto fue agregado en el carrito`)
    }

}

///////////////////////////////////////////
//const carts = new CartManager();

export default new CartManager()
