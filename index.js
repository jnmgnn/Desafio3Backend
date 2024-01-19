import express from 'express'
import routerProd from './src/routes/products.router.js'
import routerCart from './src/routes/cart.router.js'


const port = 8080
const app = express()


//Middlewares
app.use(express.json())

//ROUTES
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)


app.listen(port, ()=>{
    console.log(`Server on port ${port}`)
})