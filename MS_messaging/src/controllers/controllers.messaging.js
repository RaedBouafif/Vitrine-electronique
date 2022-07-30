const Messaging = require('../models/models.messaging');

  // confirm mail
  exports.send = (req, res) => {
    const mailOptions = {
        from: "accastillage@gmail.com",
        to: req.body.mail,
        subject: req.body.subject,
        generateTextFromHTML: true,
        html:req.body.body,
                           
    };
 

     
};
// Create and Save a new Messaging
exports.create = (req, res) => {

    if(!req.body) {
        return res.sendStatus(400).send({
            message: "Messaging can not be empty"
        });
    }

              // Create a Messaging
    const messaging = new Messaging({
        subject:req.body.subject || null,
	    body:req.body.body || null,
	    recipient:req.body.recipient || null,
	    sendingDate:new Date(),
	    sender:req.body.sender || null,
        read:false,
        reply:null
   
    });
   
       
    // Save messaging in the database
    messaging.save()
    .then(data => {res.send(data)}).catch(err => {
        res.sendStatus(500).send({
            message: err.message || "Some error occurred while creating the messaging."
        });
    });
        
    
       
  

};

// count read messages
exports.count = (req, res) => {
    Messaging.countDocuments({read:false})
    .then(messaging => {
        res.send(messaging.toString());
    }).catch(err => {
        res.sendStatus(500).send({
            message: err.message || "Some error occurred while retrieving messaging."
        });
    });
};
// Retrieve and return new  messagings from the database.
exports.findnew = (req, res) => {
    Messaging.find({read:false}).sort({sendingDate:-1})
    .then(messaging => {
        res.send(messaging);
    }).catch(err => {
        res.sendStatus(500).send({
            message: err.message || "Some error occurred while retrieving messaging."
        });
    });
};
// Retrieve and return all messagings from the database.
exports.findAll = (req, res) => {
    Messaging.find().sort({sendingDate:-1})
    .then(messaging => {
        res.send(messaging);
    }).catch(err => {
        res.sendStatus(500).send({
            message: err.message || "Some error occurred while retrieving messaging."
        });
    });
};

// Find a single messaging with a messaging's id
exports.findOne = (req, res) => {
    Messaging.findById(req.params.messagingId)
    .then(messaging => {
        if(!messaging) {
            return res.sendStatus(404).send({
                message: "Messaging not found with id " + req.params.messagingId
            });            
        }
        res.send(messaging);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.sendStatus(404).send({
                message: "Messaging not found with id " + req.params.messagingId
            });                
        }
        return res.sendStatus(500).send({
            message: "Error retrieving Messaging with id " + req.params.messagingId
        });
    });
};
// Update a messaging identified by the messagingId in the request
exports.readMessage = (req, res) => {

    if(!req.body) {
        return res.sendStatus(400).send({
            message: "can not be empty"
        });
    }

    // Find messaging and update it with the request body
    Messaging.findByIdAndUpdate(req.params.messagingId, {
	    read:true
    }, {new: true})
    .then(messaging => {
        if(!messaging) {
            return res.sendStatus(404).send({
                message: "Messaging not found with id " + req.params.messagingId
            });
        }
        res.send(messaging);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.sendStatus(404).send({
                message: "Messaging not found with id " + req.params.messagingId
            });                
        }
        return res.sendStatus(500).send({
            message: "Error updating Messaging with id " + req.params.messagingId
        });
    });
};
// Update a messaging identified by the messagingId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.sendStatus(400).send({
            message: "can not be empty"
        });
    }

    // Find messaging and update it with the request body
    Messaging.findByIdAndUpdate(req.params.messagingId, {
        subject:req.body.subject || null,
	    body:req.body.body || null,
	    recipient:req.body.recipient || null,
        sender:req.body.sender || null,
        reply:req.body.reply || null,
	    read:req.body.read || false
    }, {new: true})
    .then(messaging => {
        if(!messaging) {
            return res.sendStatus(404).send({
                message: "Messaging not found with id " + req.params.messagingId
            });
        }
        res.send(messaging);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.sendStatus(404).send({
                message: "Messaging not found with id " + req.params.messagingId
            });                
        }
        return res.sendStatus(500).send({
            message: "Error updating Messaging with id " + req.params.messagingId
        });
    });
};


// Delete a messaging with the specified messagingId in the request permenantly
exports.delete = (req, res) => {
    Messaging.findByIdAndRemove(req.params.messagingId)
    .then(messaging => {
        if(!messaging) {
            return res.sendStatus(404).send({
                message: "messaging not found with id " + req.params.messagingId
            });
        }
        res.send({message: "messaging deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.sendStatus(404).send({
                message: "Messaging not found with id " + req.params.messagingId
            });                
        }
        return res.sendStatus(500).send({
            message: "Could not delete messaging with id " + req.params.messagingId
        });
    });
};