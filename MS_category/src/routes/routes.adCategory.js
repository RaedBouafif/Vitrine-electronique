module.exports = (app) => {
    const adCategory = require('../controllers/controllers.adCategory');

    // Create a new adCategory
    app.post('/adCategory', adCategory.create);
    
    // Retrieve all adCategory
    app.get('/adCategory', adCategory.findAll);

    // Retrieve a single adCategory with id
    app.get('/adCategory/:adCategoryId', adCategory.findOne);

    // Update a adCategory with id
    app.put('/adCategory/:adCategoryId', adCategory.update);

    // Delete a adCategory with id
    app.delete('/adCategory/:adCategoryId', adCategory.delete);


}