const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sq1hraq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const categories = client.db("sneakerv2-0").collection('categories');
        const products = client.db("sneakerv2-0").collection('products');

        app.get('/categories', async (req, res) => {
            const query = {};
            const result = await categories.find(query).toArray();
            res.send(result)
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
