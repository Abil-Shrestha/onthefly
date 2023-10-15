import express from 'express'
import DestinationController from '../controllers/destinations.js'


const router = express.Router()

router.get('/', DestinationController.getDestinations)
router.get('/:id', DestinationController.getDestinationById)
router.post('/', DestinationController.createDestination)
router.delete('/:id', DestinationController.deleteDestination)
router.patch('/:id', DestinationController.updateDestination)

export default router