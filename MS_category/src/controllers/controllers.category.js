const Category = require('../models/models.category');


// Create and Save a new Category
exports.create = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Category can not be empty"
        });
    }

              // Create a Category
    const category = new Category({
     
        categoryName: req.body.categoryName || null,
        image:req.body.image || null,
        active: true,
	    subCategories: req.body.subCategories || []
    });
   
       
    // Save category in the database
    category.save()
    .then(data => {res.send(data)}).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the category."
        });
    });
        
    
       
  

};

// Retrieve and return all categorys from the database.
exports.findAll = (req, res) => {
    Category.find()
    .then(category => {
        res.send(category);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving category."
        });
    });
};

// Find a single category with a category's id
exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId)
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });            
        }
        res.send(category);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Category with id " + req.params.categoryId
        });
    });
};

// Update a category identified by the categoryId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }

    // Find category and update it with the request body
    Category.findByIdAndUpdate(req.params.categoryId, {
        categoryName: req.body.categoryName || null,
        image:req.body.image || null,
        active:req.body.active ,
	    subCategories: req.body.subCategories || []
    }, {new: true})
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });
        }
        res.send(category);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Error updating Category with id " + req.params.categoryId
        });
    });
};


// Delete a category with the specified categoryId in the request permenantly
exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.params.categoryId)
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });
        }
        res.send({message: "category deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Could not delete category with id " + req.params.categoryId
        });
    });
};