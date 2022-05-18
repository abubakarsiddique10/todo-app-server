const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.APP_KEY}:${process.env.PASS_KEY}@cluster0.rciee.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();
        const serviceCollection = client.db('todoApp').collection('service');

        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = serviceCollection.insertOne(user);
            res.send(result)
        });
        app.get('/users', async (req, res) => {
            const query = {};
            const result = await serviceCollection.find(query).toArray();
            res.send(result)
        });
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const result = await serviceCollection.deleteOne(filter);
            res.send(result)
        })
    }
    finally {

    }
}

run().catch(console.dir)












app.get('/', (req, res) => {
    res.send('server running');
})
app.listen(port, () => {
    console.log('app listen', port);
})