const Image = require('../models/models.gallery');
var fs = require('fs');
var s3 = require('../config/aws')
const BUCKET = 's3mydeals01'
// Upload Image
exports.upload = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Body can not be empty"
        });
    }
    var name = new Date().getTime()+"-"+req.file.filename
    s3.putObject({
        Bucket: BUCKET,
        Body: fs.readFileSync(req.file.destination+req.file.filename),
        Key: name,
        ACL:'public-read',
        Expires:new Date(2040,12,31,0,0,0,0)
      })
        .promise()
        .then(response => { res.send(`${s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: name })}`.split("?").shift().toString())
        })
        .catch(err => {
            res.sendStatus(500).send({
                message: err.message || "Some error occurred while uploading the image."
            });
       
        })

   

};
// Create and Save a new Image
exports.create = (req, res) => {

    if(!req.body) {
        return res.sendStatus(400).send({
            message: "Image can not be empty"
        });
    }

              // Create a Image
    const image = new Image({
	    path:req.body.path || "",
	    title:req.body.title || "",
	    description:req.body.description || "",
	    creationDate:new Date(),
	    active:false
   
    });
   
       
    // Save image in the database
    image.save()
    .then(data => {res.send(data)}).catch(err => {
        res.sendStatus(500).send({
            message: err.message || "Some error occurred while creating the image."
        });
    });
        
    
       
  

};


// Retrieve and return all images from the database.
exports.findAll = (req, res) => {
    Image.find()
    .then(image => {
        res.send(image);
    }).catch(err => {
        res.sendStatus(500).send({
            message: err.message || "Some error occurred while retrieving image."
        });
    });
};

// Find a single image with a image's id
exports.findOne = (req, res) => {
    Image.findById(req.params.imageId)
    .then(image => {
        if(!image) {
            return res.sendStatus(404).send({
                message: "Image not found with id " + req.params.imageId
            });            
        }
        res.send(image);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.sendStatus(404).send({
                message: "Image not found with id " + req.params.imageId
            });                
        }
        return res.sendStatus(500).send({
            message: "Error retrieving Image with id " + req.params.imageId
        });
    });
};

// Update a image identified by the imageId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.sendStatus(400).send({
            message: "can not be empty"
        });
    }

    // Find image and update it with the request body
    Image.findByIdAndUpdate(req.params.imageId, {
        path:req.body.path || "",
	    title:req.body.title || "",
	    description:req.body.description || "",
	    active:req.body.active
    }, {new: true})
    .then(image => {
        if(!image) {
            return res.sendStatus(404).send({
                message: "Image not found with id " + req.params.imageId
            });
        }
        res.send(image);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.sendStatus(404).send({
                message: "Image not found with id " + req.params.imageId
            });                
        }
        return res.sendStatus(500).send({
            message: "Error updating Image with id " + req.params.imageId
        });
    });
};


// Delete a image with the specified imageId in the request permenantly
exports.delete = (req, res) => {
    Image.findByIdAndRemove(req.params.imageId)
    .then(image => {
        if(!image) {
            return res.sendStatus(404).send({
                message: "image not found with id " + req.params.imageId
            });
        }
        res.send({message: "image deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.sendStatus(404).send({
                message: "Image not found with id " + req.params.imageId
            });                
        }
        return res.sendStatus(500).send({
            message: "Could not delete image with id " + req.params.imageId
        });
    });
};