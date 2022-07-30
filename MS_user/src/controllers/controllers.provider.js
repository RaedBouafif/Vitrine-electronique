const Provider = require('../models/models.provider');
const { body,check, validationResult } = require('express-validator');
exports.validate = (method) => {
    switch (method) {
      case 'create': {
        return [ 
            check('firstName').exists(),
            check('lastName').exists(),
            check('email').exists().isEmail().withMessage('Invalid email'),
            check('phoneNumber').exists().isNumeric().isLength({ min: 8,max:8 }).withMessage('Invalid phoneNumber'),
            check('address').exists().isLength({max:100 }).withMessage('Address Too Long'),
          //  check('cin').exists().isNumeric().isLength({ min: 8,max:8 }).withMessage('Invalid CIN'),
          //  check('rib').optional({nullable: true}).isNumeric().isLength({ min: 20,max:20 }).withMessage('Invalid RIB'),
            check('password').exists().isLength({ min: 5 }).withMessage('must be at least 5 chars long').matches(/\d/).withMessage('must contain a number')  
        ]   
      }
      case 'update': {
        return [ 
         check('firstName').exists(),
         check('lastName').exists(),
         check('email').exists().isEmail().withMessage('Invalid email'),
         check('phoneNumber').optional({nullable: true}).exists().isNumeric().isLength({ min: 8,max:8 }).withMessage('Invalid phoneNumber'),
         check('address').optional({nullable: true}).exists().isLength({max:100 }).withMessage('Address Too Long'),
       //  check('cin').exists().isNumeric().isLength({ min: 8,max:8 }).withMessage('Invalid CIN'),
       //  check('rib').optional({nullable: true}).isNumeric().isLength({ min: 20,max:20 }).withMessage('Invalid RIB'),
         check('password').exists().isLength({ min: 5 }).withMessage('must be at least 5 chars long').matches(/\d/).withMessage('must contain a number')  
     ]   
       }
    }
  }

// Create and Save a new Provider
exports.create = (req, res) => {
          // Validate request
/*           const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          } */
    if(!req.body) {
        return res.status(400).send({
            message: "Provider can not be empty"
        });
    }

              // Create a Provider
    const provider = new Provider({
     
        designation:req.body.designation || null,
        description:req.body.description || null,
        phoneNumber:req.body.phoneNumber || null,
        mail:req.body.mail || null,
        link:req.body.link || null,
        address:req.body.address || null,
        postalCode:req.body.postalCode || null,
        city:req.body.city || null,
        country:req.body.country || null,
        creationDate:new Date(),
        active: true,
        deleted: false
    });
   
       
    // Save provider in the database
    provider.save()
    .then(data => {res.send(data)}).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the provider."
        });
    });
        
    
       
  

};
// Find By Mail
exports.findByMail =(req,res) => {
    Provider.findOne({mail:req.params.mail})
    .then(provider => {
        res.send(provider);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the provider."
        });
    });
};


// Retrieve and return all providers from the database.
exports.findAll = (req, res) => {
    Provider.find({deleted:false})
    .then(provider => {
        res.send(provider);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving provider."
        });
    });
};

// Find a single provider with a provider's id
exports.findOne = (req, res) => {
    Provider.findById(req.params.providerId)
    .then(provider => {
        if(!provider) {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.providerId
            });            
        }
        res.send(provider);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.providerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Provider with id " + req.params.providerId
        });
    });
};

// Update a provider identified by the providerId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }
    console.log(req.body.active)
    // Find provider and update it with the request body
    Provider.findByIdAndUpdate(req.params.providerId, {
        designation:req.body.designation || null,
        description:req.body.description || null,
        phoneNumber:req.body.phoneNumber || null,
        mail:req.body.mail || null,
        link:req.body.link || null,
        address:req.body.address || null,
        postalCode:req.body.postalCode || null,
        city:req.body.city || null,
        country:req.body.country || null,
        active: req.body.active ,
        deleted: req.body.deleted,
    }, {new: true})
    .then(provider => {
        if(!provider) {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.providerId
            });
        }
        res.send(provider);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.providerId
            });                
        }
        return res.status(500).send({
            message: "Error updating Provider with id " + req.params.providerId
        });
    });
};


// Delete a provider with the specified providerId in the request permenantly
exports.delete = (req, res) => {
    Provider.findByIdAndRemove(req.params.providerId)
    .then(provider => {
        if(!provider) {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.providerId
            });
        }
        res.send({message: "Provider deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.providerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete provider with id " + req.params.providerId
        });
    });
};