
import express from 'express'
import {ProductManager} from '../ProductManager.js'

const pm = new ProductManager()
const app = new express()

app.get('/', (req, res)=> {
    res.send('<p style="color: pink;">Bienvenido!! :3</p>');
})


app.get('/products', (req, res) => {
    try {
        const limit = req.query.limit

        //Llamamos al getProducts que ya tenia un limite desde el manager y le pasamos el parametro
        pm.getProducts(limit).then(products=>{
            res.status(200).json({data: products}); //Lo del status lo tuve que buscar y significa que la pagina se ve ok
        });

    } catch (error) {
        res.status(500).json({ error: error.message }); //Status 500 es que la pagina no esta ok :[
    }
});

// Deberia handelear el metodo post asi no se hardcodean los datos
app.get('/addProducts', (req, res) => {
    try {
        pm.addProducts('Estufa', 'Descripcion EPICA 1', 'thumbnail', 1232, 25000, 10);
        pm.addProducts('Tele', 'Descripcion EPICA 2', 'thumbnail', 212334, 18000, 47);
        pm.addProducts('Lavadora', 'Descripcion EPICA 3', 'thumbnail', 31231235, 1000000, 19);
        pm.addProducts('Bocina', 'Descripcion EPICA 4', 'thumbnail', 4212, 1500, 127);
        pm.addProducts('Switch', 'Descripcion EPICA 5', 'thumbnail', 51231, 500000, 30);
        pm.addProducts('Refri', 'Descripcion EPICA 6', 'thumbnail', 511, 200000, 9);
        res.status(201).json({ message: "Creado con exito uwu" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Parecido a lo que vimos en clase pero usando el metodo getProductById del manager
app.get('/products/:pid', (req, res)=>{
    let idProducto = req.params.pid
    const producto = pm.getProductById(idProducto)
    res.send(producto)
})


app.listen(8080, ()=>{
    console.log('Server run on port 8080')
})