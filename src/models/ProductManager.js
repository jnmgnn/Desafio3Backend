import fs from "fs/promises"

export class ProductManager {
    
    constructor(){
        this.path = 'products.json'
    }

    async loadProducts(){
        try {
            const products = await fs.readFile(this.path, 'utf-8')
            return products ? JSON.parse(products) : []

        } catch (error){
            console.log("error load products: ", error)
            throw new Error('Problema al traer productos')
        }
    }

    async addProducts(producto){
        if(!producto.title || !producto.description || !producto.code || !producto.stock || !producto.thumbnail || !producto.price || !producto.category || !producto.status){
            throw new Error('Faltan campos')
        }

        const prods = await this.loadProducts();

        const duplicated = prods.some(el => el.code == producto.code)
        if(duplicated) throw new Error('Ya existe un producto con ese codigo')
        

        producto = {
            ...producto, id : (prods.length == 0 ? 1 : prods[prods.length-1].id + 1)
        }

        prods.push(producto)

        await fs.writeFile(this.path, JSON.stringify(prods), { encoding: 'utf-8' });
        return true
    }

    async getProducts(limit){
        const prods = await this.loadProducts()
        
        if (limit) prods.splice(limit, prods.length -1 )
        
        return prods
    }

    async getProductById(id){
        const prods = await this.loadProducts()
        const product = prods.find(el => el.id == id)
        if (!product) throw new Error('No existe el producto')
        return product
    }

    async deleteProduct(id){
        const prods = await this.loadProducts()
        const index = prods.findIndex(product => product.id == id); 
        if (index == -1) throw new Error('No existe el producto con ese ID');

        await fs.writeFile(this.path, JSON.stringify(prods), { encoding: 'utf-8' }); 
        console.log(`Producto con ID ${id} eliminado correctamente.`);
    }

    async updateProduct(id, producto) {
        const prods = await this.loadProducts();
        const prod = prods.find(producto => producto.id == id)
        if (prod) {
            prod.title = producto.title
            prod.description = producto.description
            prod.price = producto.price
            prod.stock = producto.stock
            prod.thumbnail = producto.thumbnail
            prod.code = producto.code
            prod.category = producto.category
            prod.status = producto.status
            prods.push(prod)
            await fs.writeFile(this.path, JSON.stringify(prods))
        } else {
            throw new Error('No existe el producto con ese ID');
        }
    }
}