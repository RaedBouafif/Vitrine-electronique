module.exports = (app) => {
    const category = require('../controllers/controllers.category');

    // Create a new category
    app.post('/category', category.create);
    
    // Retrieve all category
    app.get('/category', category.findAll);

    // Retrieve a single category with id
    app.get('/category/:categoryId', category.findOne);

    // Update a category with id
    app.put('/category/:categoryId', category.update);

    // Delete a category with id
    app.delete('/category/:categoryId', category.delete);


}