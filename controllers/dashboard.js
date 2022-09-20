const Play = require('../models/Play')

module.exports = {
    getDashboard: async (req, res) => {
        try {
          const favorites = await Play.find({ user: req.user.id });
          res.render("dashboard.ejs", { plays: favorites, user: req.user });
        } catch (err) {
          console.log(err);
        }
      },
}