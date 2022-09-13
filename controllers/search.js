const Play = require('../models/Play')

module.exports = {
    plays: async (request, response) => {
        try {
            let results = await Play.findOne({
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
            let result = await Play.aggregate([
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
    searchFilter: async (req,res) => {
        try{
            rolesNum = req.body.roles
            genreInp = req.body.genre
            console.log(genreInp)
            if(rolesNum === ''){
                const searchResult = await Play.find({genre: genreInp})
                console.log (searchResult)
                res.render('result.ejs',{plays: searchResult})
            }else if (genreInp === ''){
                const searchResult = await Play.find({roles: rolesNum})
                console.log (searchResult)
                res.render('result.ejs',{plays: searchResult})
            }else{
                const searchResult = await Play.find({roles: rolesNum, genre: genreInp})
                console.log (searchResult)
                res.render('result.ejs',{plays: searchResult})
            }
        }catch(err){
            console.log(err)
        }

    },
    searchId: async (request, response) => {
        try {
            let results = await Plays.findOne({
                "_id" : ObjectId(request.params.id)
            })
            
            response.render('play.ejs',{plays: results})
            console.log(results)
        } catch (error) {
            response.status(500).send({message: error.message})
        }         
    },
}