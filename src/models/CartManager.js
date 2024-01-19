import fs from 'fs'

export class CartManager {
    constructor(){
        this.path = 'carts.json',
        this.carts = []
    }

    getCarts = async () => {
        const carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        return carts;
    };

    getCartProducts = async (id) =>{
        const carts = await this.getCarts()
        const cart = carts.find(cart=>cart.id===id)

        if(cart){
            return cart.products
        } else{
            throw new Error('Carrito no encontrado')
        }

    }

    newCart = async () => {
        let id;
        if (this.carts.length === 0) {
            id = 1;
        } else {
            id = this.carts[this.carts.length - 1].id + 1;
        }
    
        const newCart = { id, products: [] };
    
        this.carts = await this.getCarts();
        this.carts.push(newCart);

        await fs.writeFile(this.path, JSON.stringify(this.carts));

        return newCart;
    };

    addProductToCart = async (cart_id, product_id) => {
        const carts = await this.getCarts()
        const index = carts.findIndex(cart=> cart.id == cart.id)

        if(index !== -1){
            const cartProducts = await this.getCartProducts(cart_id)
            const productIndex = cartProducts.findIndex(product => product.product_id ==product_id)

            if(productIndex !== -1){
                cartProducts[productIndex].quantity = cartProducts[productIndex].quantity +1
            } else {
                cartProducts.push({cart_id, quantity : 1})
            }
            carts[index].products = cartProducts
            await fs.writeFile(this.path, JSON.stringify(carts))
            console.log('Producto agregado')
        } else {
            console.log('Carrito no encontrado')
        }
    }
}