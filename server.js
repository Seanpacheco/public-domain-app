console.log('May Node be with you')

const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }))

const connectionString = 'mongodb+srv://Sean:gpVcS8bh4xXB8Zc@cluster0.0bzz7.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('public-domain') 
    const playCollection = db.collection('plays')
    let rolesNum
    let genreInp = ''

    app.set('view engine', 'ejs')
    

    app.get('/', (req, res) => {
        playCollection.find().toArray()
            .then(results => {
                console.log (results)
                res.render('index.ejs',{plays: results})
            })
            .catch(error => console.error(error))
    
       
    })
    app.post('/Search', (req,res) => {
        rolesNum = req.body.roles
        genreInp = req.body.genre
        if(rolesNum === ''){
        playCollection.find({genre: genreInp}).toArray()
            .then(results => {
                console.log (results)
                res.render('index.ejs',{plays: results})
            })
            .catch(error => console.error(error))
        }else if (genreInp === ''){
            playCollection.find({roles: rolesNum}).toArray()
            .then(results => {
                console.log (results)
                res.render('index.ejs',{plays: results})
            })
            .catch(error => console.error(error))
        }else{
            playCollection.find({roles: rolesNum, genre: genreInp}).toArray()
            .then(results => {
                console.log (results)
                res.render('index.ejs',{plays: results})
            })
            .catch(error => console.error(error))
        }

    })
    
    // app.get('/Search', (req, res) => {
    //     rolesNum = req.body.roles
    //     genreInp = req.body.genre
    //     playCollection.find({roles:rolesNum, genre:genreInp}).toArray()
    //         .then(results => {
    //             console.log (results)
    //             res.render('index.ejs',{plays: results})
    //         })
    //         .catch(error => console.error(error))
        
           
    // })








  })
app.listen(3000, function() {
    console.log('listening on 3000')
  })