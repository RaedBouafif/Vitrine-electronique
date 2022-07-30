const Ad = require('../models/models.ad');


// Create and Save a new Ad
exports.create = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Ad can not be empty"
        });
    }

              // Create a Ad
    const ad = new Ad({
     
        title: req.body.title || null,
        description:req.body.description || null,
	    price:req.body.price || 0,
        creationDate:new Date(),
        status:req.body.status || "",
        family: req.body.family || "",
        subCategory:req.body.subCategory || "",
        category:req.body.category || "",
        customer: req.body.customer || {id:"",name:"",mail:"",phoneNumber:"",}
    });
   
       
    // Save ad in the database
    ad.save()
    .then(data => {res.send(data)}).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the ad."
        });
    });
        
    
       
  

};


// Retrieve and return all ads from the database.
exports.findAll = (req, res) => {
    Ad.find()
    .then(ad => {
        res.send(ad);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving ad."
        });
    });
};

// Find a single ad with a ad's id
exports.findOne = (req, res) => {
    Ad.findById(req.params.adId)
    .then(ad => {
        if(!ad) {
            return res.status(404).send({
                message: "Ad not found with id " + req.params.adId
            });            
        }
        res.send(ad);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Ad not found with id " + req.params.adId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Ad with id " + req.params.adId
        });
    });
};

// Update a ad identified by the adId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }

    // Find ad and update it with the request body
    Ad.findByIdAndUpdate(req.params.adId, {
        title: req.body.title || null,
        description:req.body.description || null,
	    price:req.body.price || 0,
        status:req.body.status || "",
        family: req.body.family || "",
        subCategory:req.body.subCategory || "",
        category:req.body.category || "",
        customer: req.body.customer || {id:"",name:"",mail:"",phoneNumber:"",}
    }, {new: true})
    .then(ad => {
        if(!ad) {
            return res.status(404).send({
                message: "Ad not found with id " + req.params.adId
            });
        }
        res.send(ad);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Ad not found with id " + req.params.adId
            });                
        }
        return res.status(500).send({
            message: "Error updating Ad with id " + req.params.adId
        });
    });
};


// Delete a ad with the specified adId in the request permenantly
exports.delete = (req, res) => {
    Ad.findByIdAndRemove(req.params.adId)
    .then(ad => {
        if(!ad) {
            return res.status(404).send({
                message: "ad not found with id " + req.params.adId
            });
        }
        res.send({message: "ad deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Ad not found with id " + req.params.adId
            });                
        }
        return res.status(500).send({
            message: "Could not delete ad with id " + req.params.adId
        });
    });
};