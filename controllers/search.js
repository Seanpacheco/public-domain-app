const Favorite = require('../models/Favorite')
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
            const rolesNum = req.body.roles
            const genreInp = req.body.genre
            console.log(genreInp)
            console.log(rolesNum)
            console.log(req.user)
            if(rolesNum === ''){
                const searchResult = await Play.find({genre: genreInp})
                console.log (searchResult)
                res.render('results.ejs',{plays: searchResult, user: req.user, genreInp: genreInp, rolesNum: rolesNum})
            }else if (genreInp === ''){
                const searchResult = await Play.find({roles: rolesNum})
                console.log (searchResult)
                res.render('results.ejs',{plays: searchResult, user: req.user, genreInp: genreInp, rolesNum: rolesNum})
            }else{
                const searchResult = await Play.find({roles: rolesNum, genre: genreInp})
                console.log (searchResult)
                res.render('results.ejs',{plays: searchResult, user: req.user, genreInp: genreInp, rolesNum: rolesNum})
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
    addToFavorites: async(req,res)=>{
        console.log(req.user)
        try{
            await Favorite.create({title: req.body.title, playwright: req.body.playwright, userId: req.user.id, img: req.body.img, roles: req.body.numOfRoles, genre: (req.body.genres).split(','), year: req.body.year, synopsis: req.body.synopsis, characters: (req.body.characters).split(',')})
            req.flash('success', { msg: 'Added to Favorites' })
            // stops the browser from constantly loading.
            // res.status(204).send()
            res.redirect(307,'back')
        } catch(error){
            console.error(error)
        }
    },
}