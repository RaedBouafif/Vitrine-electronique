const Banner = require('../models/models.banner');


// Create and Save a new Banner
exports.create = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Banner can not be empty"
        });
    }

              // Create a Banner
    const banner = new Banner({
     
        title: req.body.title || null,
        description:req.body.description || null,
        location: req.body.location || null,
        link: req.body.link || null,
	    type:req.body.type || null,
	    image:req.body.image || null,
        creationDate:new Date(),
        active: true,
    });
   
       
    // Save banner in the database
    banner.save()
    .then(data => {res.send(data)}).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the banner."
        });
    });
        
    
       
  

};

// Retrieve and return all banners from the database.
exports.findAll = (req, res) => {
    Banner.find()
    .then(banner => {
        res.send(banner);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving banner."
        });
    });
};

// Find a single banner with a banner's id
exports.findOne = (req, res) => {
    Banner.findById(req.params.bannerId)
    .then(banner => {
        if(!banner) {
            return res.status(404).send({
                message: "Banner not found with id " + req.params.bannerId
            });            
        }
        res.send(banner);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Banner not found with id " + req.params.bannerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Banner with id " + req.params.bannerId
        });
    });
};

// Update a banner identified by the bannerId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }

    // Find banner and update it with the request body
    Banner.findByIdAndUpdate(req.params.bannerId, {
        title: req.body.title || null,
        description:req.body.description || null,
        location: req.body.location || null,
        link: req.body.link || null,
	    type:req.body.type || null,
	    image:req.body.image || null,
        active: req.body.active ,

    }, {new: true})
    .then(banner => {
        if(!banner) {
            return res.status(404).send({
                message: "Banner not found with id " + req.params.bannerId
            });
        }
        res.send(banner);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Banner not found with id " + req.params.bannerId
            });                
        }
        return res.status(500).send({
            message: "Error updating Banner with id " + req.params.bannerId
        });
    });
};


// Delete a banner with the specified bannerId in the request permenantly
exports.delete = (req, res) => {
    Banner.findByIdAndRemove(req.params.bannerId)
    .then(banner => {
        if(!banner) {
            return res.status(404).send({
                message: "banner not found with id " + req.params.bannerId
            });
        }
        res.send({message: "banner deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Banner not found with id " + req.params.bannerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete banner with id " + req.params.bannerId
        });
    });
};