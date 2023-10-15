import express from 'express'

import TripsDestinationsController from '../controllers/trip_dest.js'

const router = express.Router()

router.get('/', TripsDestinationsController.getTripsDestinations)
router.get('/trips/:destination_id', TripsDestinationsController.getAllTripsByDestId)
router.get('/destinations/:trip_id', TripsDestinationsController.getAllDestinations)
router.post('/', TripsDestinationsController.createTripDestination)

export default router