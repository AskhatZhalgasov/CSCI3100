const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-y3p5u.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
MongoClient.connect(uri, (err, client) => {
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
app.use(express.static('dist'));
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
app.post('/api/login', (req, res) => {
    let body = req.body
    console.log(body)
    client.connect(err => {
        console.log("request")
        console.log(body)
        const collection = client.db("pizza_nut").collection("users");
        collection.find().toArray().then(result => {
            if(result.filter(x => x.username == body.username && x.password == body.password).length == 0) {
                res.status(500).send("incorrect")
            } else {
                res.status(200).send("correct")
            }
        }).catch(error => console.error(error))    
    })    
})
app.post('/api/sign-up', (req, res) => {
    let body = req.body
    console.log(body)
    client.connect(err => {
        const collection = client.db("pizza_nut").collection("users");
        collection.find().toArray().then(result => {
            if(result.filter(x => x.username == body.username && x.password == body.password).length != 0) {
                res.status(500).send("already exists")
            } else {
                collection.insert(req.body)
                res.status(200).send("correct")
            }
        }).catch(error => console.error(error))    
    })    
})
app.get('/api/pizzas', (req, res) => {
    fs.readFile(path.resolve(__dirname, "./server/pizzas.json"), 'utf8', (err,data) => {        
        if(err) {
            throw err;
        }        
        res.send(JSON.parse(data));
    });    
})
app.get('/api/confirm', (req, res) => {
    fs.readFile(path.resolve(__dirname, "./server/order.json"), "utf8", (err, data) => {
        if(err) {
            throw err;
        }
        res.send(JSON.parse(data));
    })
})
app.post('/api/user-address', (req, res) => {
    let body = req.body
    client.connect(err => {
        const collection = client.db("pizza_nut").collection("users");
        collection.find().toArray().then(result => {
            res.send(result.filter(x => x.username == body.username)[0].address)
        })
})
})
app.post('/api/order', (req, res) => {
    let body = req.body
    client.connect(err => {
        const collection = client.db("pizza_nut").collection("orders");  
        collection.find().toArray().then(result => {
            if(result.filter(x => x.username == body.username).length == 0) {
                collection.insert({
                    username: body.username,
                    orders: [
                       {order: body.order, date: Date.now()}
                    ]
                })
            } else {
                result.filter(x => x.username == body.username)[0].orders.push({order: body.order, date: Date.now()})
            }            
            res.status(200).send("" + Math.floor(Math.random() * (55 - 15) + 15))
        }).catch(errr => console.log(errr))        
    })
})
app.post("/api/orders", (req,res) => {
    let body = req.body
    client.connect(err => {
        const collection = client.db("pizza_nut").collection("orders");  
        collection.find().toArray().then(result => {
            if(result.filter(x => x.username == body.username).length != 0) {
                const obj = result.filter(x => x.username == body.username)[0]
                console.log("obj")
                console.log(obj)
                res.send({orders: obj.orders})
            }
        }).catch(error =>{ console.log("pzdc"); console.log(error)})
    })
})
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});

})