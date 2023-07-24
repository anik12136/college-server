const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
// middleware
app.use(cors());
app.use(express.json());


// const users = [
//     { id: 1 },
//     { id: 2 },
//     { id: 3 },

// ]


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.00oqpy6.mongodb.net/?retryWrites=true&w=majority`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const collegeCollection = client.db('college_admission').collection('college');
        const bookingCollection = client.db('carDoctor').collection('bookings');

        app.get('/colleges', async (req, res) => {
            const college = collegeCollection.find();
            const result = await college.toArray();
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/users', async (req, res) => {
    res.send(users);
})

app.get('/', (req, res) => {
    res.send('college-admission is running')
})

app.listen(port, () => {
    console.log(`college-admission Server is running on port ${port}`)
})