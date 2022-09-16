const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const searchController = require('../controllers/search')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', homeController.getIndex); 

router.get('/plays/:id', searchController.searchId);

router.post('/filterSearch', searchController.searchFilter);

router.get('/searchDb', searchController.searchDb);


router.post('/login', authController.postLogin)

router.get('/logout', authController.logout)


router.post('/signup', authController.postSignup)
module.exports = router