const express = require('express')
const router = express.Router()
const { getListings, createListing } = require('../controller/listing_Controller')

router.get('/', getListings)
router.post('/', createListing)

module.exports = router