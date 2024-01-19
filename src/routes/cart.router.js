import {Router} from 'express'
import {CartManager} from '../models/CartManager.js'

const routerCart = Router()

routerCart.post('/', async (req, res) => {
    try {
        const response = await CartManager.newCart()
        res.json(response)
    } catch(error){
        res.send('Error al crear carrito')
    }
})
routerCart.get('/:cid', async (req, res) =>{
    const {cid} = req.params
    try{
        const response = await CartManager.getCartProducts(cid)
        res.json(response)
    } catch(error){
        res.send('Error al mandar productos al carrito')
    }
})

routerCart.post('/:cid/products/:id', async(req,res) =>{
    const {cid, id} = req.params
    try{
        await CartManager.addProductToCart(cid, id)
        res.send('prodcuto agregado')
    } catch(error){
        res.send('Error al agregar producto al carrito')
    }
})

export default routerCart

