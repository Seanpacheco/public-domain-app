module.exports = {
    getIndex: (req,res) => {
        res.sendFile(__dirname + '/views/index.html')
    } 
}