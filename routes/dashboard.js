const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const searchController = require('../controllers/search')
const dashboardController = require('../controllers/dashboard')
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get('/dashboard', ensureAuth, dashboardController.getDashboard);

router.put("/updateAssignment/:id&:role", dashboardController.updateAssignment);

router.delete("/deleteFavorite/:id", dashboardController.deleteFavorite);
module.exports = router