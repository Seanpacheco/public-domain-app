const Search = require('../models/Search')

module.exports = {
    plays: async (request, response) => {
        try {
            let results = await playCollection.findOne({
                "_id" : ObjectId(request.params.id)
            })
            
            response.render('play.ejs',{plays: results})
            console.log(results)
        } catch (error) {
            response.status(500).send({message: error.message})
        }         
    },
    searchDb: async(req, res) => {
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
    },
    searchFilter: (req,res) => {
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

    },
    searchId: async (request, response) => {
        try {
            let results = await playCollection.findOne({
                "_id" : ObjectId(request.params.id)
            })
            
            response.render('play.ejs',{plays: results})
            console.log(results)
        } catch (error) {
            response.status(500).send({message: error.message})
        }         
    },
}