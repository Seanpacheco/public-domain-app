console.log('May Node be with you')

const express = require('express');
const bodyParser= require('body-parser');
const { response } = require('express');
const { ObjectId } = require('mongodb');
const app = express();
const MongoClient = require('mongodb').MongoClient
require('dotenv').config({
    path: './secrets/.env'
})

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())
app.use(express.static('public'));



const connectionString = process.env.DB_STRING

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
                res.sendFile(__dirname + '/views/index.html')
            })
            .catch(error => console.error(error))
    
       
    })

    app.get('/result/:id', async (request, response) => {
            try {
                let results = await playCollection.findOne({
                    "_id" : ObjectId(request.params.id)
                })
                
                response.render('titleResult.ejs',{plays: results})
                console.log(results)
            } catch (error) {
                response.status(500).send({message: error.message})
            }         
    })

    app.get('/search', async(req, res) => {
        try {
            let result = await playCollection.aggregate([
                {
                    "$search": {
                        "autocomplete": {
                            "query": `${req.query.query}`,
                            "path": "title",
                            "fuzzy": {
                                "maxEdits":2,
                                "prefixLength":3
                            }
                        }
                    }
                }    
            ]).toArray()
            res.send(result)
        }catch(error){
            response.status(500).send({message: error.message})
        }
    }) 

    // app.get("/get/:id", async (request, response) => {
    //     try {
    //         let results = await playCollection.findOne({
    //             "_id" : ObjectId(request.params.id)
    //         })
    //         response.send(results)
    //         console.log(results)
    //     } catch (error) {
    //         response.status(500).send({message: error.message})
    //     }
    // }
    // )
    
    app.post('/filterSearch', (req,res) => {
        rolesNum = req.body.roles
        genreInp = req.body.genre
        if(rolesNum === ''){
        playCollection.find({genre: genreInp}).toArray()
            .then(results => {
                console.log (results)
                res.render('result.ejs',{plays: results})
            })
            .catch(error => console.error(error))
        }else if (genreInp === ''){
            playCollection.find({roles: rolesNum}).toArray()
            .then(results => {
                console.log (results)
                res.render('result.ejs',{plays: results})
            })
            .catch(error => console.error(error))
        }else{
            playCollection.find({roles: rolesNum, genre: genreInp}).toArray()
            .then(results => {
                console.log (results)
                res.render('result.ejs',{plays: results})
            })
            .catch(error => console.error(error))
        }

    })


  })
app.listen(3000, function() {
    console.log('listening on 3000')
  })