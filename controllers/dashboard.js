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
      updateAssignment: async (req, res) => {
        try {
            const assign = `assignments.${req.params.role}`
            await Favorite.findOneAndUpdate(
              { _id: req.params.id },
              {
                $set: { [assign] : `${req.body.assignment}` }
              },
              {
                new: true,
                upsert: true
              }
            );
            console.log("role assigned!");
            res.redirect('back');
          } catch (err) {
            console.log(err);
          }
      },
      deleteFavorite: async (req, res) => {
        try {
          // Delete favorite from db
          await Favorite.findOneAndDelete({_id: req.params.id});
          console.log("Deleted Favorite");
          res.redirect("back");
        } catch (err) {
          console.log(err);
          res.redirect("back");
        }
      },
}