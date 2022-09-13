console.log('May Node be with you')
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");

const homeRoutes = require('./routes/home')

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())
app.use(express.static('public'));
//Using EJS for views
app.set("view engine", "ejs");

connectDB()

app.use('/', homeRoutes)



// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//     const db = client.db('public-domain') 
//     const playCollection = db.collection('plays')
//     let rolesNum
//     let genreInp = ''

//     app.set('view engine', 'ejs')

    
    

//     app.get('/', (req, res) => {
//         playCollection.find().toArray()
//             .then(results => {
//                 console.log (results)
//                 res.sendFile(__dirname + '/views/index.html')
//             })
//             .catch(error => console.error(error))
    
       
//     })

//     app.get('/plays/:id', async (request, response) => {
//         try {
//             let results = await playCollection.findOne({
//                 "_id" : ObjectId(request.params.id)
//             })
            
//             response.render('play.ejs',{plays: results})
//             console.log(results)
//         } catch (error) {
//             response.status(500).send({message: error.message})
//         }         
// })

//     // app.get('/result/:id', async (request, response) => {
//     //         try {
//     //             let results = await playCollection.findOne({
//     //                 "_id" : ObjectId(request.params.id)
//     //             })
                
//     //             response.render('titleResult.ejs',{plays: results})
//     //             console.log(results)
//     //         } catch (error) {
//     //             response.status(500).send({message: error.message})
//     //         }         
//     // })

//     app.get('/search', async(req, res) => {
//         try {
//             let result = await playCollection.aggregate([
//                 {
//                     "$search": {
//                         "autocomplete": {
//                             "query": `${req.query.query}`,
//                             "path": "title",
//                             "fuzzy": {
//                                 "maxEdits":2,
//                                 "prefixLength":3
//                             }
//                         }
//                     }
//                 }    
//             ]).toArray()
//             res.send(result)
//         }catch(error){
//             response.status(500).send({message: error.message})
//         }
//     }) 

//     // app.get("/get/:id", async (request, response) => {
//     //     try {
//     //         let results = await playCollection.findOne({
//     //             "_id" : ObjectId(request.params.id)
//     //         })
//     //         response.send(results)
//     //         console.log(results)
//     //     } catch (error) {
//     //         response.status(500).send({message: error.message})
//     //     }
//     // }
//     // )
    
//     app.post('/filterSearch', (req,res) => {
//         rolesNum = req.body.roles
//         genreInp = req.body.genre
//         if(rolesNum === ''){
//         playCollection.find({genre: genreInp}).toArray()
//             .then(results => {
//                 console.log (results)
//                 res.render('result.ejs',{plays: results})
//             })
//             .catch(error => console.error(error))
//         }else if (genreInp === ''){
//             playCollection.find({roles: rolesNum}).toArray()
//             .then(results => {
//                 console.log (results)
//                 res.render('result.ejs',{plays: results})
//             })
//             .catch(error => console.error(error))
//         }else{
//             playCollection.find({roles: rolesNum, genre: genreInp}).toArray()
//             .then(results => {
//                 console.log (results)
//                 res.render('result.ejs',{plays: results})
//             })
//             .catch(error => console.error(error))
//         }

//     })


//   })
app.listen(3000, function() {
    console.log('listening on 3000')
  })