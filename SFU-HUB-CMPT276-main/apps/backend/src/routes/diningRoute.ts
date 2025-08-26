import express from 'express';
import diningController from '../controllers/restaurantsController.js';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/restaurants', diningController.getRestaurants);

export default router;
