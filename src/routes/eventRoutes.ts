import { Router } from 'express';
import { createEvent, getEvents, getEventDetails } from '../controllers/eventController';

const router = Router();

router.post('/events', createEvent);
router.get('/events', getEvents);
router.get('/events/:id', getEventDetails);

export default router;
