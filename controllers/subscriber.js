// import the subscriber model in order to create a new one
import Subscriber from '../models/subscriber.js';

export const createSubscriber = async (req, res) => {
    const { name, subscriberToChannel, subscribeDate} = req.body;
    const subscriber = new Subscriber({ name, subscriberToChannel, subscribeDate});
    
    // always use try and catch block
    // if there exist an error in the database,
    // you won't be handling this error
    try {
        // creates a new subscriber
        const newSubscriber = await subscriber.save();
        // status code 201 means successfully created
        res.status(201).send(newSubscriber);
    }
    catch(err) {
        // status code 400 means that something wrong 
        // with the user input
        res.status(400).json({ message: err.message })
    }
    
};

export const getSubscribers = async (req, res) => {
    // console.log(req.query);
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    }
    catch (err) {
        // Status code 500 means that something wrong
        // with your server
        res.status(500).json({ message: err.message })
    }
};

export const getSubscriberById = async (req, res) => {
    try {
        // TODO: try writing this with findOne as well
        const subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null){
            res.status(404).json({ message: 'Can not find subscriber'})
        }
        else {
            res.json(subscriber);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateSubscriberById = async (req, res) => {
    const { id } = req.params;
    // TODO: Try to do this using findOneAndUpdate
    // Or, updateOne()
    try {
        const subscriber = await Subscriber.findById(id);
        const { name, subscriberToChannel, subscribeDate } = req.body;
        if (subscriber == null) {
            res.status(404).json({ message: 'Can not find subscriber'})
        }
        else {
            if (name) {
                subscriber.name = name
            }
            if (subscriberToChannel) {
                subscriber.subscriberToChannel = subscriberToChannel
            }
            if (subscribeDate) {
                subscriber.subscribeDate = subscribeDate;
            }
            await subscriber.save();
            res.send(subscriber)
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

};


export const deleteSubscriberById = async (req, res) => {

    // TO DO: Complete with these two methods

    // You can either use deleteOne
    // https://rahmanfadhil.com/express-rest-api

    const { id } = req.params;
    try {
        const deletedSubscriber = await Subscriber.deleteOne({ _id: id });
        if (deletedSubscriber.deletedCount == 0 ) {
            res.status(404).json({ message: 'Can not find subscriber'})
        }
        else {
            res.json(`Person with ${id} is deleted`);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
    // OR, remove() followed by an findById()
    // https://www.digitalocean.com/community/tutorials/build-a-restful-api-using-node-and-express-4
};
