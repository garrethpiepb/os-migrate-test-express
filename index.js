const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('static'));

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.get('/batches', (req, res) => {
    doBatches((data) => {
        return res.json(data);
    });
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const connectionString = process.env.connectionString;
const dbName = process.env.dbName;

let doBatches  = (callback) => {
    try {
        MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, client) => {
            
            if (err) {
                console.log(err);
                throw err;
            }
    
            const db = client.db(dbName);
    
            let output = await db.collection('batches').find({}).toArray();
    
            callback(output);
        });

    } catch (e) {
        callback(e);
    }
    


};