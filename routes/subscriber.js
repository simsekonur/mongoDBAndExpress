import express from "express";

const router = express.Router();

// import the controllers to the routes
// and use them
import { createSubscriber, 
    getSubscribers, 
    getSubscriberById, 
    updateSubscriberById,
    deleteSubscriberById} from '../controllers/subscriber.js';

router.get('/', getSubscribers);
router.post('/', createSubscriber);
router.get('/:id', getSubscriberById);
router.post('/:id', updateSubscriberById);
router.delete('/:id', deleteSubscriberById);

export default router;