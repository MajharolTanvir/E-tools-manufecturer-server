const express = require('express')
const app = express()
var cors = require('cors')
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middle wear
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jor48.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        const toolsCollection = client.db('Manufacturer').collection('tools')

        app.get('/tools', async (req, res) => {
            const query = await toolsCollection.find().toArray()
            res.send(query)
        })
    }

    finally {
        // await client.close()
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello e-tools manufacturing World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})