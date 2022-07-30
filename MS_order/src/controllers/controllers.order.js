const Order = require('../models/models.order');


// Create and Save a new Order
exports.create = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Order can not be empty"
        });
    }

              // Create a Order
    const order = new Order({

        reference:req.body.reference || null,
	    orderDate:req.body.orderDate || new Date(),
	    customer:req.body.customer || null,
	    deliveryAddress:req.body.deliveryAddress || null,
	    deliveryMethod:req.body.deliveryMethod || null,
        paymentMethod:req.body.paymentMethod || null,
        paymentStatus:false,
	    status:req.body.status || null,
	    total:req.body.total || 0,
        totalTTC:req.body.totalTTC || 0,
	    details: req.body.details || []
    });
   
       
    // Save order in the database
    order.save()
    .then(data => {res.send(data)}).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the order."
        });
    });
        
    
       
  

};
// Retrieve and return customer orders from the database .
exports.findByCustomer = (req, res) => {
    Order.find({customer:req.params.customerId})
    .then(order => {
        res.send(order);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving order."
        });
    });
};
// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
    Order.find()
    .then(order => {
        res.send(order);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving order."
        });
    });
};

// Find a single order with a order's id
exports.findOne = (req, res) => {
    Order.findById(req.params.orderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });            
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Order with id " + req.params.orderId
        });
    });
};

// Update a order identified by the orderId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }

    // Find order and update it with the request body
    Order.findByIdAndUpdate(req.params.orderId, {
        reference:req.body.reference || null,
	    customer:req.body.customer || null,
	    deliveryAddress:req.body.deliveryAddress || null,
	    deliveryMethod:req.body.deliveryMethod || null,
	    paymentMethod:req.body.paymentMethod || null,
	    status:req.body.status || null,
        total:req.body.total || 0,
        totalTTC:req.body.totalTTC || 0,
	    details: req.body.details || []
    }, {new: true})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Error updating Order with id " + req.params.orderId
        });
    });
};
// Update an order status identified by the orderId in the request
exports.updateStatus = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }

    // Find order and update it with the request body
    Order.findByIdAndUpdate(req.params.orderId, {
        status:req.body.status || null,
        paymentStatus:req.body.paymentStatus
	
    }, {new: true})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Error updating Order with id " + req.params.orderId
        });
    });
};


// Delete a order with the specified orderId in the request permenantly
exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });
        }
        res.send({message: "order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Could not delete order with id " + req.params.orderId
        });
    });
};