const express = require('express')
const router = express.Router()
const { getListings, createListing, getListingsFilters  } = require('../controller/listing_Controller')

router.get('/', getListings)
router.get(`/filters`, getListingsFilters)
router.post('/', createListing)


module.exports = router