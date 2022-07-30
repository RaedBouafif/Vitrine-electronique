const AdCategory = require('../models/models.adCategory');


// Create and Save a new AdCategory
exports.create = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "AdCategory can not be empty"
        });
    }

              // Create a AdCategory
    const adCategory = new AdCategory({
     
        title: req.body.title || null,
        creationDate:new Date(),
        active: true,
        deleted:false,
	    subCategories: req.body.subCategories || []
    });
   
       
    // Save adCategory in the database
    adCategory.save()
    .then(data => {res.send(data)}).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the adCategory."
        });
    });
        
    
       
  

};

// Retrieve and return all adCategorys from the database.
exports.findAll = (req, res) => {
    AdCategory.find({deleted:false})
    .then(adCategory => {
        res.send(adCategory);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving adCategory."
        });
    });
};

// Find a single adCategory with a adCategory's id
exports.findOne = (req, res) => {
    AdCategory.findById(req.params.adCategoryId)
    .then(adCategory => {
        if(!adCategory) {
            return res.status(404).send({
                message: "AdCategory not found with id " + req.params.adCategoryId
            });            
        }
        res.send(adCategory);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "AdCategory not found with id " + req.params.adCategoryId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving AdCategory with id " + req.params.adCategoryId
        });
    });
};

// Update a adCategory identified by the adCategoryId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }

    // Find adCategory and update it with the request body
    AdCategory.findByIdAndUpdate(req.params.adCategoryId, {
        title: req.body.title || null,
        deleted:req.body.deleted || false,
        active:req.body.active ,
	    subCategories: req.body.subCategories || []
    }, {new: true})
    .then(adCategory => {
        if(!adCategory) {
            return res.status(404).send({
                message: "AdCategory not found with id " + req.params.adCategoryId
            });
        }
        res.send(adCategory);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "AdCategory not found with id " + req.params.adCategoryId
            });                
        }
        return res.status(500).send({
            message: "Error updating AdCategory with id " + req.params.adCategoryId
        });
    });
};


// Delete a adCategory with the specified adCategoryId in the request permenantly
exports.delete = (req, res) => {
    AdCategory.findByIdAndRemove(req.params.adCategoryId)
    .then(adCategory => {
        if(!adCategory) {
            return res.status(404).send({
                message: "adCategory not found with id " + req.params.adCategoryId
            });
        }
        res.send({message: "adCategory deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "AdCategory not found with id " + req.params.adCategoryId
            });                
        }
        return res.status(500).send({
            message: "Could not delete adCategory with id " + req.params.adCategoryId
        });
    });
};