const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const searchController = require('../controllers/search')
const dashboardController = require('../controllers/dashboard')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', homeController.getIndex); 

router.get('/dashboard', ensureAuth, dashboardController.getDashboard);

router.get('/plays/:id', searchController.searchId);

router.post('/filterSearch', searchController.searchFilter);

router.get('/searchDb', searchController.searchDb);

router.post('/addToFavorites', searchController.addToFavorites);

router.post('/login', authController.postLogin);

router.get('/logout', authController.logout);


router.post('/signup', authController.postSignup);
module.exports = router