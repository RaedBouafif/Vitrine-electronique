const DeliveryMethod = require('../models/models.deliveryMethod');


// Create and Save a new DeliveryMethod
exports.create = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "DeliveryMethod can not be empty"
        });
    }

              // Create a DeliveryMethod
    const deliveryMethod = new DeliveryMethod({
        name:req.body.name || null,
        active: true,
	    deleted: false
    });
   
       
    // Save deliveryMethod in the database
    deliveryMethod.save()
    .then(data => {res.send(data)}).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the deliveryMethod."
        });
    });
        
    
       
  

};

// Retrieve and return all deliveryMethods from the database.
exports.findAll = (req, res) => {
    DeliveryMethod.find({deleted:false})
    .then(deliveryMethod => {
        res.send(deliveryMethod);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving deliveryMethod."
        });
    });
};

// Find a single deliveryMethod with a deliveryMethod's id
exports.findOne = (req, res) => {
    DeliveryMethod.findById(req.params.deliveryMethodId)
    .then(deliveryMethod => {
        if(!deliveryMethod) {
            return res.status(404).send({
                message: "DeliveryMethod not found with id " + req.params.deliveryMethodId
            });            
        }
        res.send(deliveryMethod);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "DeliveryMethod not found with id " + req.params.deliveryMethodId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving DeliveryMethod with id " + req.params.deliveryMethodId
        });
    });
};

// Update a deliveryMethod identified by the deliveryMethodId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }

    // Find deliveryMethod and update it with the request body
    DeliveryMethod.findByIdAndUpdate(req.params.deliveryMethodId, {
        name:req.body.name || null,
        active: req.body.active ,
	    deleted: req.body.deleted
    }, {new: true})
    .then(deliveryMethod => {
        if(!deliveryMethod) {
            return res.status(404).send({
                message: "DeliveryMethod not found with id " + req.params.deliveryMethodId
            });
        }
        res.send(deliveryMethod);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "DeliveryMethod not found with id " + req.params.deliveryMethodId
            });                
        }
        return res.status(500).send({
            message: "Error updating DeliveryMethod with id " + req.params.deliveryMethodId
        });
    });
};


// Delete a deliveryMethod with the specified deliveryMethodId in the request permenantly
exports.delete = (req, res) => {
    DeliveryMethod.findByIdAndRemove(req.params.deliveryMethodId)
    .then(deliveryMethod => {
        if(!deliveryMethod) {
            return res.status(404).send({
                message: "deliveryMethod not found with id " + req.params.deliveryMethodId
            });
        }
        res.send({message: "deliveryMethod deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "DeliveryMethod not found with id " + req.params.deliveryMethodId
            });                
        }
        return res.status(500).send({
            message: "Could not delete deliveryMethod with id " + req.params.deliveryMethodId
        });
    });
};