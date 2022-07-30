module.exports = (app) => {
    const review = require('../controllers/controllers.review');

    // Create a new review
    app.post('/review', review.create);
    
    // FindByCustomer
    app.get('/getByCustomer/:customerId', review.findByCustomer);
    
      // FindByArticle
      app.get('/getByArticle/:articleId', review.findByArticle);

    // Retrieve all review
    app.get('/review', review.findAll);

    // Retrieve a single review with id
    app.get('/review/:reviewId', review.findOne);

    // Update a review with id
    app.put('/review/:reviewId', review.update);

    // Delete a review with id
    app.delete('/review/:reviewId', review.delete);


}