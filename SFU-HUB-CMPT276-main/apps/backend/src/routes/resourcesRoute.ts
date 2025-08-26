import express from 'express';
import resourcesController from '../controllers/resourcesController.js';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', resourcesController.getResources);

export default router;
