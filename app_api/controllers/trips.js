const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //register model
const Model = mongoose.model('trips');

//GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        // Uncomment the following line to show results of querey
        // on the console
        // console.log(q);

    if(!q)
    { // database returned no data
        return res
                .status(404)
                .json(err);
    } else { // return resulting trip list
        return res
            .status(200)
            .json(q);
    }

};

// GET: /trips/:tripCode - lists a single trip
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode }) // return single record
        .exec();

    // Uncomment the following line to show results of querey
    // on the console
    // console.log(q);
    
    if(!q)
    { // database returned no data
            return res
                    .status(404)
                    .json(err);
    } else { // return resulting trip list
            return res
                .status(200)
                .json(q);
    }
    
};

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

        if(!q)
        { // Database returned no data
            return res
                .status(400)
                .json(err);
        } else {
            return res
                .status(201)
                .json(q);
        }

};

// PUT: /trips/:tripCode - Updates a Trip
const tripsUpdateTrip = async (req, res) => {
    try {
      // Uncomment for debugging
      console.log(req.params);
      console.log(req.body);
  
      const q = await Model.findOneAndUpdate(
        { code: req.params.tripCode }, // Find trip by code
        {
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description,
        },
        { new: true } // Return the updated document
      ).exec();
  
      if (!q) {
        return res.status(400).json({ message: 'Failed to update trip' });
      } else {
        return res.status(201).json(q); // Return updated trip
      }
  
      // Uncomment to log the updated trip
      // console.log(q);
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }
  };

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
};