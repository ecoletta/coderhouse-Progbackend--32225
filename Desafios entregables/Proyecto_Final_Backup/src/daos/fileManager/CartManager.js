import fs from 'fs'
import underscore from 'underscore'


class CartManager {

    constructor(){
        this.path = "src/daos/fileManager/carritos.json"
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
        //console.log(array)
        const indiceCart = array.findIndex(item => item.idCodigo === idCart)
        console.log("indice carrito: " ,indiceCart)
        //console.log(array[indiceCart].products)
        
        if (indiceCart === -1){
            console.log("No se encontró el carrito")
            return false
        }
        
        const indiceProduct = array[indiceCart].products.findIndex(item => item.idProduct === product.idCodigo)
        console.log("indice producto ",indiceProduct)

        if (indiceProduct === -1){
            array[indiceCart].products.push({
                "idProduct": product.idCodigo,
                "quantity": 1
            })
        }else{
            array[indiceCart].products[indiceProduct].quantity++
        }

        await fs.promises.writeFile(this.path, JSON.stringify(array, null, '\t'))
        console.log(`El producto fue agregado en el carrito`)
        return true
    }

}

///////////////////////////////////////////
export default new CartManager()
