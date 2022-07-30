const Review = require('../models/models.review');


// Create and Save a new Review
exports.create = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Review can not be empty"
        });
    }

              // Create a Review
    const review = new Review({
     
        customer: req.body.customer || null,
        article: req.body.article || null,
        note: req.body.note || null,
        comment: req.body.comment || null,
        creationDate:new Date(),
        active: true,
    });
   
       
    // Save review in the database
    review.save()
    .then(data => {res.send(data)}).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the review."
        });
    });
        
    
       
  

};

exports.findByCustomer =(req,res) => {
    Review.find({"customer":req.params.customerId})
    .then(review => {
        res.send(review);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the review."
        });
    });
};
exports.findByArticle =(req,res) => {
    Review.find({"article":req.params.articleId})
    .then(review => {
        res.send(review);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the review."
        });
    });
};
// Retrieve and return all reviews from the database.
exports.findAll = (req, res) => {
    Review.find()
    .then(review => {
        res.send(review);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving review."
        });
    });
};

// Find a single review with a review's id
exports.findOne = (req, res) => {
    Review.findById(req.params.reviewId)
    .then(review => {
        if(!review) {
            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });            
        }
        res.send(review);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Review with id " + req.params.reviewId
        });
    });
};

// Update a review identified by the reviewId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }

    // Find review and update it with the request body
    Review.findByIdAndUpdate(req.params.reviewId, {
        customer: req.body.customer || null,
        article: req.body.article || null,
        note: req.body.note || null,
        comment: req.body.comment || null,
        active: req.body.active ,
        
    }, {new: true})
    .then(review => {
        if(!review) {
            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });
        }
        res.send(review);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });                
        }
        return res.status(500).send({
            message: "Error updating Review with id " + req.params.reviewId
        });
    });
};


// Delete a review with the specified reviewId in the request permenantly
exports.delete = (req, res) => {
    Review.findByIdAndRemove(req.params.reviewId)
    .then(review => {
        if(!review) {
            return res.status(404).send({
                message: "review not found with id " + req.params.reviewId
            });
        }
        res.send({message: "review deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });                
        }
        return res.status(500).send({
            message: "Could not delete review with id " + req.params.reviewId
        });
    });
};