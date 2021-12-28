import mongoose from "mongoose";

import subscriberSchema from './../schemas/subscriber.js';

// the name you want to give in db, corresponding schema
const subscriber = mongoose.model('Subscriber', subscriberSchema);

export default subscriber;