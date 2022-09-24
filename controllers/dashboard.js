const Play = require('../models/Play')
const Favorite = require('../models/Favorite')

module.exports = {
    getDashboard: async (req, res) => {
        try {
          const favorites = await Favorite.find({ userId: req.user.id });
          res.render("dashboard.ejs", { plays: favorites, user: req.user });
        } catch (err) {
          console.log(err);
        }
      },
}