path = require('path')
module.exports = {
    getIndex: (req,res) => {
        // res.sendFile(path.join(__dirname, '../views', 'index.html'));
        res.render('index.ejs',{
            user: req.user
        });
    } 
}