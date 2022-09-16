const Play = require('../models/Play')

module.exports = {
    searchDb: async(req, res) => {
        try {
            const result = await Play.aggregate([
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
            ])
            res.send(result)
        }catch(error){
            res.status(500).send({message: error.message})
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
                res.render('result.ejs',{plays: searchResult, user: req.user})
            }else if (genreInp === ''){
                const searchResult = await Play.find({roles: rolesNum})
                console.log (searchResult)
                res.render('result.ejs',{plays: searchResult, user: req.user})
            }else{
                const searchResult = await Play.find({roles: rolesNum, genre: genreInp})
                console.log (searchResult)
                res.render('result.ejs',{plays: searchResult, user: req.user})
            }
        }catch(err){
            console.log(err)
        }

    },
    searchId: async (req, res) => {
        try {
            const results = await Play.findById(req.params.id)          
            res.render('play.ejs',{plays: results, user: req.user})
            console.log(results)
        } catch (error) {
            res.status(500).send({message: error.message})
        }         
    },
}