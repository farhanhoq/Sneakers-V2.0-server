const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sq1hraq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const categories = client.db("sneakerv2-0").collection('categories');
        const products = client.db("sneakerv2-0").collection('products');
        const bookings = client.db("sneakerv2-0").collection('bookings');
        const users = client.db("sneakerv2-0").collection('users');

        app.get('/categories', async (req, res) => {
            const query = {};
            const result = await categories.find(query).toArray();
            res.send(result)
        })

        app.get('/products', async (req, res) => {
            const email = req.query.email;
            const query = { email: email};
            const result = await products.find(query).toArray();
            res.send(result)
        })
    
        app.get('/products/:id', async (req, res) => {
            const c_ID = req.params.id;
            const query = { c_ID: c_ID };
            const result = await products.find(query).toArray();
            return res.send(result);
        })

        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await products.insertOne(product);
            res.send(result)
        })

        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = {upsert: true}
            const updateDoc = {
                $set: {
                    status: 'Sold'
                } 
            }
            const result = await products.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await products.deleteOne(filter);
            res.send(result);
        })

        app.get('/bookings', async (req, res) => {
            const email = req.query.email;
            const query = {email: email};
            const result = await bookings.find(query).toArray();
            res.send(result)
        })

        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookings.insertOne(booking);
            res.send(result)
        })

        app.get('/users', async (req, res) => {
            const query = {};
            const result = await users.find(query).toArray();
            res.send(result)
        })

        app.get('/users/role/:email', async (req, res) => {
            const email = req.params.email;
            // console.log(email)
            const query = { email: email };
            const result = await users.findOne(query);
            // console.log(user)
            res.send(result)
        })

        app.post('/users', async(req, res) => {
            const user = req.body;
            const result = await users.insertOne(user);
            res.send(result);
        })
    }
    finally {
        
    }
}
run().catch(console.log);

app.get('/', async (req, res) => {
    res.send('server is running');
})

app.listen(port, () => {
    console.log(port);
})
