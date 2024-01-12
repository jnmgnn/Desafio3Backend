import fs from "fs"

export class ProductManager {
    constructor(){
        this.products = [];
        this.path = 'products.json'

        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, '[]', {encoding: 'utf-8'})
        }
        this.loadProducts()
    }

    //Esto es medio medio porque ya sé que no se podian agregar mas metodos pero no sabia como hacer que lea el file de forma asincrona
    async loadProducts(){
        let products = await fs.promises.readFile(this.path, {encoding: 'utf-8'})
        this.products = products ? JSON.parse(products) : []
    }

    //Este addProducts pushea tanto en el array de products como en el file de products.json
    addProducts(title, description, thumbnail, code, price, stock){
        if(!title || !description || !code | !stock || !thumbnail || !price){
            throw new Error('Faltan campos')
        }
        const invalidarCode = this.products.some(el => el.code == code)
        if(invalidarCode){
            throw new Error('Ya existe el codigo')
        }
        
        let id;
        if(this.products.length == 0){
            id = 1
        }else {
            id = this.products[this.products.length-1].id + 1
        }

        const product = {
            id: id,
            title: title, 
            description: description, 
            thumbnail: thumbnail, 
            code: code, 
            price: price, 
            stock: stock
        }
        this.products.push(product)
        fs.writeFileSync(this.path, JSON.stringify(this.products), { encoding: 'utf-8' });

    }

    //El limite que se pedia en el desafio está acá, basicamente hace un splice en el array desde el limit hasta el limite del array -1
    async getProducts(limit){
        let products = await fs.promises.readFile(this.path, {encoding: 'utf-8'})
        products = products ? JSON.parse(products) : []
        if (limit) products.splice(limit, products.length -1 )
        return products
    }

    getProductById(id){
        const product = this.products.find(el => el.id == id)
        if(!product){
            throw new Error('No existe el producto')
        }
        console.log(product)
        return product
    }

    deleteProduct(id){
        const index = this.products.findIndex(product => product.id == id); //Encuentra el index del producto con el ID dado

        if (index === -1) {
            throw new Error('No existe el producto con ese ID');
        }

        this.products.splice(index, 1); //Aca lo mismo, saca el producto del array en el index que encuentre
        fs.writeFileSync(this.path, JSON.stringify(this.products), { encoding: 'utf-8' }); //Lo reescribe
        console.log(`Producto con ID ${id} eliminado correctamente.`);
    }

    updateProduct(id, propiedad, valor) {
        const product = this.products.find(product => product.id === id);

        if (!product) {
            throw new Error('No existe el producto con ese ID');
        }

        product[propiedad] = valor; //Acá reescribe sobre la propiedad del producto que le pasamos antes por ID
        fs.writeFileSync(this.path, JSON.stringify(this.products), { encoding: 'utf-8' });
        console.log(`Producto con ID ${id} actualizado correctamente.`);
    }
}