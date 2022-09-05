const express = require('express')
const router = express.Router()
const todosController = require('../controllers/search')

router.get('/plays:id', searchController.searchId)

router.get('/searchDb', searchController.searchDb )

router.post('/searchFilter', searchController.searchFilter)

module.exports = router