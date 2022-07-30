const Admin = require('../models/models.admin');
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

// Create and Save a new Admin
exports.create = (req, res) => {
          // Validate request
/*           const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          } */
    if(!req.body) {
        return res.status(400).send({
            message: "Admin can not be empty"
        });
    }

              // Create a Admin
    const admin = new Admin({
     
        firstname: req.body.firstname || null,
        lastname: req.body.lastname || null,
        address: req.body.address || null,
        postalCode:req.body.postalCode || null,
        phoneNumber: req.body.phoneNumber || null,
        function:req.body.function || null,
        mail: req.body.mail || null,
        login:req.body.login || null,
        password: req.body.password || null,
        role:req.body.role || null,
        deleted: false
    });
   
       
    // Save admin in the database
    admin.save()
    .then(data => {res.send(data)}).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the admin."
        });
    });
        
    
       
  

};
// Find By Mail
exports.findByMail =(req,res) => {
    Admin.findOne({mail:req.params.mail})
    .then(admin => {
        res.send(admin);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the admin."
        });
    });
};
// login
exports.login =(req,res) => {
    Admin.findOne({login:req.params.login,password:req.params.password})
    .then(admin => {
        res.send(admin);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the admin."
        });
    });
};


// Retrieve and return all admins from the database.
exports.findAll = (req, res) => {
    Admin.find({deleted:false})
    .then(admin => {
        res.send(admin);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving admin."
        });
    });
};

// Find a single admin with a admin's id
exports.findOne = (req, res) => {
    Admin.findById(req.params.adminId)
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "Admin not found with id " + req.params.adminId
            });            
        }
        res.send(admin);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Admin not found with id " + req.params.adminId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Admin with id " + req.params.adminId
        });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }

    // Find admin and update it with the request body
    Admin.findByIdAndUpdate(req.params.adminId, {
        firstname: req.body.firstname || null,
        lastname: req.body.lastname || null,
        address: req.body.address || null,
        postalCode:req.body.postalCode || null,
        phoneNumber: req.body.phoneNumber || null,
        function:req.body.function || null,
        mail: req.body.mail || null,
        login:req.body.login || null,
        password: req.body.password || null,
        role:req.body.role || null,
        deleted:req.body.deleted ,
    }, {new: true})
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "Admin not found with id " + req.params.adminId
            });
        }
        res.send(admin);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Admin not found with id " + req.params.adminId
            });                
        }
        return res.status(500).send({
            message: "Error updating Admin with id " + req.params.adminId
        });
    });
};


// Delete a admin with the specified adminId in the request permenantly
exports.delete = (req, res) => {
    Admin.findByIdAndRemove(req.params.adminId)
    .then(admin => {
        if(!admin) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.adminId
            });
        }
        res.send({message: "admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Admin not found with id " + req.params.adminId
            });                
        }
        return res.status(500).send({
            message: "Could not delete admin with id " + req.params.adminId
        });
    });
};