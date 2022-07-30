const Article = require('../models/models.article');


// Create and Save a new Article
exports.create = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Article can not be empty"
        });
    }

              // Create a Article
    const article = new Article({
     
        title: req.body.title || null,
        description:req.body.description || null,
	    reference: req.body.reference || null,
	    availability:req.body.availability || null,
        price:req.body.price || 0,
        tax:req.body.tax || null,
        city:req.body.city || null,
        gouvernomant: req.body.gouvernomant || null,
        etat: req.body.etat || null,
        customerId: req.body.customerId || null,
	    quantity:req.body.quantity || null,
        creationDate:new Date(),
        active: true,
        deleted: false,
        discount:req.body.discount || {onDiscount:false,percentage:0},
        images: req.body.images || [],
	    videos: req.body.videos || [],
	    features: req.body.features || [],
	    categories: req.body.categories || [],
	    priceHistory:[{price:req.body.price,updateDate:new Date()}]
    });
   
       
    // Save article in the database
    article.save()
    .then(data => {res.send(data)}).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the article."
        });
    });
        
    
       
  

};
// Find By Mail
exports.findByActive =(req,res) => {
    Article.find({active:true,deleted:false})
    .then(article => {
        res.send(article);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the article."
        });
    });
};
exports.findByDiscount =(req,res) => {
    Article.find({"discount.onDiscount":true,deleted:false,active:true})
    .then(article => {
        res.send(article);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the article."
        });
    });
};
exports.findByCategory =(req,res) => {
    Article.find({"categories.category":req.params.categoryId,deleted:false,active:true})
    .then(article => {
        res.send(article);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the article."
        });
    });
};
exports.findBySubCategory =(req,res) => {
    Article.find({"categories.subCategory":req.params.subCategoryId,deleted:false,active:true})
    .then(article => {
        res.send(article);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the article."
        });
    });
};
// Retrieve and return all articles from the database.
exports.findAll = (req, res) => {
    Article.find({deleted:false})
    .then(article => {
        res.send(article);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving article."
        });
    });
};

// Find a single article with a article's id
exports.findOne = (req, res) => {
    Article.findById(req.params.articleId)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "Article not found with id " + req.params.articleId
            });            
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Article not found with id " + req.params.articleId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Article with id " + req.params.articleId
        });
    });
};

// Update a article identified by the articleId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }

    // Find article and update it with the request body
    Article.findByIdAndUpdate(req.params.articleId, {
        title: req.body.title || null,
        description:req.body.description || null,
	    reference: req.body.reference || null,
	    availability:req.body.availability || null,
	    price:req.body.price || 0,
        tax:req.body.tax || 0.18,
	    quantity:req.body.quantity || 0,
        city:req.body.city || null,
        gouvernomant: req.body.gouvernomant || null,
        etat: req.body.etat || null,
        customerId: req.body.customerId || null,
        active: req.body.active ,
        deleted: req.body.deleted ,
        discount:req.body.discount || {onDiscount:false,percentage:0},
        images: req.body.images || [],
	    videos: req.body.videos || [],
	    features: req.body.features || [],
	    categories: req.body.categories || [],
	    priceHistory:req.body.priceHistory || [],
    }, {new: true})
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "Article not found with id " + req.params.articleId
            });
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Article not found with id " + req.params.articleId
            });                
        }
        return res.status(500).send({
            message: "Error updating Article with id " + req.params.articleId
        });
    });
};
// Update quantities of list of articles
exports.updateQty = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }
    var array = [];
    var length = req.body.data.length;
    req.body.data.forEach(element => {
     Article.findByIdAndUpdate(element.article, {
	    quantity:element.qty})
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "Article not found with id " + element.article
            });
        }
        array.push(article)
        if(array.length === length ){
           return res.status(200).send(true)
        }
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Article not found with id " + element.article
            });                
        }
        return res.status(500).send({
            message: "Error updating Article with id " + element.article
        });
    
    }
        );
})
    // Find article and update it with the request body

    };

// Delete a article with the specified articleId in the request permenantly
exports.delete = (req, res) => {
    Article.findByIdAndRemove(req.params.articleId)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "article not found with id " + req.params.articleId
            });
        }
        res.send({message: "article deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Article not found with id " + req.params.articleId
            });                
        }
        return res.status(500).send({
            message: "Could not delete article with id " + req.params.articleId
        });
    });
};