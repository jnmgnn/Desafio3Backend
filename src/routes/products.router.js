import {Router} from 'express';
import {ProductManager} from '../models/ProductManager.js'

const productManager = new ProductManager('./products.json')

const routerProd = Router()

routerProd.get('/', async(req, res)=>{
    try{
    const {limit} = req.query
    const prods = await productManager.getProducts(limit)
    res.status(200).send(prods)
    } catch(error){
        return res.status(400).send(error.message)
    }
})

routerProd.get('/:id', async(req, res)=>{
    try{
        const {id} = req.params
        const prod = await productManager.getProductById(id)
        res.status(200).send(prod)
    } catch(error){
        return res.status(400).send(error.message)
    }
})

routerProd.post('/', async(req, res)=>{
    try{
        await productManager.addProducts(req.body)
        res.status(200).send('Producto agregado')
    } catch(error){
        console.log("error router",error)
        return res.status(400).send(error.message)
    }
})

routerProd.put('/:id', async(req, res)=>{
try{
    const {id}= req.params
    await productManager.updateProduct(id, req.body)
    res.status(200).send('Producto actualizado')
} catch(error) {
    return res.status(400).send(error.message)
}})

routerProd.delete('/:id', async(req, res)=>{
    try{
        const { id } = req.params
        await productManager.deleteProduct(id)
        res.status(200).send('Producto eliminado')
        
    } catch(error){
        return res.status(404).send('Producto no encontrado')
    }
})

export default routerProd