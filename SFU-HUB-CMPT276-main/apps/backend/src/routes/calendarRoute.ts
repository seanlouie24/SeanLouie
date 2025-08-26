import express from 'express';
import calendarController from '../controllers/calendarController.js';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/events', calendarController.getEvents);
router.post('/events', calendarController.postEvent);

export default router;
