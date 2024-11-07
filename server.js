// creating the node.js application using express
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false})),
// declaring route
app.get('/',(req, res)=>{
    res.send('Hello node API')
})

app.get('/blog',(req, res)=>{
    res.send('Hello node API, this is a  blog ')
})

// fectching or retrieving data from the database
app.get('/product', async(req, res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products)

        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})

// retrieving a single data
app.get('/product/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)   
    } 
    catch (error) {
        res.status(500).json({message:error.message})    
    }
})

// updating data
app.put('/product/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);   
    } 
    catch (error) {
        res.status(500).json({message:error.message})    
    }

})

// Saving data into database
app.post('/product',async(req, res)=>{
  
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
 
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({message:error.message})

    }
})

// delete a product
app.delete('/product/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ${id}`})
        }
        
        res.status(200).json(product);   
    } 
    catch (error) {
        res.status(500).json({message:error.message})    
    }

})



// connecting to mongo db 
mongoose.connect('mongodb+srv://amoosamuel7777:Timi1003@cluster0.cmebu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{

    app.listen(3000, ()=>{
        console.log('Node API app is runnung on port 3000');
    })
    console.log('connected to mongodb')
}).catch((error)=>{
    console.log(error)
})
