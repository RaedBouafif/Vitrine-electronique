const Customer = require('../models/models.customer');
const { body,check, validationResult } = require('express-validator');
var crypto = require('crypto')
const Token = require('../models/token');
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
  // confirm mail
  exports.confirmMail = (req, res) => {


    // Find a matching token
    Token.findOne({ token: req.body.token }).then(token=>{
        if(token){
            Customer.findOne({ _id: token._userId }).then(customer=>{
                if(customer.mailVerified){
                    res.send({code:0})
                }                
                else {
                    customer.mailVerified=true;
                    customer.save().then(data=>{
                        res.send({code:1})
                       
                    }).catch(err=>{
                        res.status(500).send({
                            message: err.message || "Some error occurred while updating the deliveryman."
                        });
                    })
                }
               
            }).catch(err=>{return res.status(400).send({ msg: 'We were unable to find a user for this token.' });})
        }
        else {   res.send({code:2})    }
    }).catch(err=>{
        return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
    })
};
// Create and generate a new Token
exports.createToken = (req, res) => {

if(!req.body) {
  return res.status(400).send({
      message: "body can not be empty"
  });
}

  // Create a verification token for this user
var token = new Token({ _userId: req.body.id, token: crypto.randomBytes(16).toString('hex') });
token.save().then(tokenObject=>{
res.send({token:tokenObject.token}) ;  
}).catch(err => {
res.status(500).send({
  message: err.message || "Some error occurred while creating the Token."
});
})


};
// Create and Save a new Customer
exports.create = (req, res) => {
          // Validate request
/*           const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          } */
    if(!req.body) {
        return res.status(400).send({
            message: "Customer can not be empty"
        });
    }

              // Create a Customer
    const customer = new Customer({
     
        firstname: req.body.firstname || null,
        lastname: req.body.lastname || null,
        phoneNumber: req.body.phoneNumber || null,
        addresses: req.body.addresses || null,
        function:req.body.function || null,
        mail: req.body.mail || null,
        login:req.body.login || null,
        password: req.body.password || null,
        registrationDate:new Date(),
        mailVerified: false,
        accountType:"signup",
        active: true,
        deleted: false
    });
   
       
    // Save customer in the database
    customer.save()
    .then(data => {
        // Create a verification token for this user
var token = new Token({ _userId: data._id, token: crypto.randomBytes(16).toString('hex') });
token.save().then(tokenObject=>{
    let obj ={ data:data,token:tokenObject.token }
    res.send(obj) ;  
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the Token."
    });
})

})
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the customer."
        });
    });
        
    
       
  

};
// Create and Save a new Customer
exports.add = (req, res) => {

if(!req.body) {
  return res.status(400).send({
      message: "Customer can not be empty"
  });
}

        // Create a Customer
const customer = new Customer({

  firstname: req.body.firstname || null,
  lastname: req.body.lastname || null,
  mail: req.body.mail || null,
  login:req.body.login || null,
  password: req.body.password || null,
  registrationDate:new Date(),
  mailVerified: true,
  accountType: req.body.accountType || '',
  active: true,
  deleted: false
});

 
// Save customer in the database
customer.save()
.then(data => {
    res.send(data) ; 
})
.catch(err => {
  res.status(500).send({
      message: err.message || "Some error occurred while creating the customer."
  });
});
};
// Find By Mail
exports.findByMail =(req,res) => {
    Customer.findOne({mail:req.params.mail})
    .then(customer => {
        res.send(customer);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the customer."
        });
    });
};
// login
exports.login =(req,res) => {
    Customer.findOne({login:req.params.login,password:req.params.password})
    .then(customer => {
        res.send(customer);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the customer."
        });
    });
};


// Retrieve and return all customers from the database.
exports.findAll = (req, res) => {
    Customer.find({deleted:false})
    .then(customer => {
        res.send(customer);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving customer."
        });
    });
};

// Find a single customer with a customer's id
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });            
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.customerId
        });
    });
};

// Update a customer identified by the customerId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }

    // Find customer and update it with the request body
    Customer.findByIdAndUpdate(req.params.customerId, {
        firstname: req.body.firstname || null,
        lastname: req.body.lastname || null,
        phoneNumber: req.body.phoneNumber || null,
        addresses: req.body.addresses || null,
        function:req.body.function || null,
        mail: req.body.mail || null,
        login:req.body.login || null,
        password: req.body.password || null,
        active: req.body.active ,
        deleted:req.body.deleted ,
    }, {new: true})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
        });
    });
};


// Delete a customer with the specified customerId in the request permenantly
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "customer not found with id " + req.params.customerId
            });
        }
        res.send({message: "customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete customer with id " + req.params.customerId
        });
    });
};