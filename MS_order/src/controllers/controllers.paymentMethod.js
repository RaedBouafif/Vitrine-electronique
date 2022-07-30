const PaymentMethod = require('../models/models.paymentMethod');


// Create and Save a new PaymentMethod
exports.create = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "PaymentMethod can not be empty"
        });
    }

              // Create a PaymentMethod
    const paymentMethod = new PaymentMethod({
     
        name:req.body.name || null,
        active: true,
	    deleted: false
    });
   
       
    // Save paymentMethod in the database
    paymentMethod.save()
    .then(data => {res.send(data)}).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the paymentMethod."
        });
    });
        
    
       
  

};

// Retrieve and return all paymentMethods from the database.
exports.findAll = (req, res) => {
    PaymentMethod.find({deleted:false})
    .then(paymentMethod => {
        res.send(paymentMethod);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving paymentMethod."
        });
    });
};

// Find a single paymentMethod with a paymentMethod's id
exports.findOne = (req, res) => {
    PaymentMethod.findById(req.params.paymentMethodId)
    .then(paymentMethod => {
        if(!paymentMethod) {
            return res.status(404).send({
                message: "PaymentMethod not found with id " + req.params.paymentMethodId
            });            
        }
        res.send(paymentMethod);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "PaymentMethod not found with id " + req.params.paymentMethodId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving PaymentMethod with id " + req.params.paymentMethodId
        });
    });
};

// Update a paymentMethod identified by the paymentMethodId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }

    // Find paymentMethod and update it with the request body
    PaymentMethod.findByIdAndUpdate(req.params.paymentMethodId, {
        name:req.body.name || null,
        active: req.body.active ,
	    deleted: req.body.deleted 
    }, {new: true})
    .then(paymentMethod => {
        if(!paymentMethod) {
            return res.status(404).send({
                message: "PaymentMethod not found with id " + req.params.paymentMethodId
            });
        }
        res.send(paymentMethod);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "PaymentMethod not found with id " + req.params.paymentMethodId
            });                
        }
        return res.status(500).send({
            message: "Error updating PaymentMethod with id " + req.params.paymentMethodId
        });
    });
};


// Delete a paymentMethod with the specified paymentMethodId in the request permenantly
exports.delete = (req, res) => {
    PaymentMethod.findByIdAndRemove(req.params.paymentMethodId)
    .then(paymentMethod => {
        if(!paymentMethod) {
            return res.status(404).send({
                message: "paymentMethod not found with id " + req.params.paymentMethodId
            });
        }
        res.send({message: "paymentMethod deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "PaymentMethod not found with id " + req.params.paymentMethodId
            });                
        }
        return res.status(500).send({
            message: "Could not delete paymentMethod with id " + req.params.paymentMethodId
        });
    });
};