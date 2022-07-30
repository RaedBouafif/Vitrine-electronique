module.exports = (app) => {
    const article = require('../controllers/controllers.article');

    // Create a new article
    app.post('/article', article.create);
    
    // FindByActive
    app.get('/getActiveArticles', article.findByActive);

    // FindByDiscount
    app.get('/getByDiscount', article.findByDiscount);

    // FindByCategory
    app.get('/getByCategory/:categoryId', article.findByCategory);
    
      // FindBysubCategory
      app.get('/getBySubCategory/:subCategoryId', article.findBySubCategory);

    // Retrieve all article
    app.get('/article', article.findAll);

    // Retrieve a single article with id
    app.get('/article/:articleId', article.findOne);

    // Update a article with id
    app.put('/article/:articleId', article.update);

    // Update quantity of list of articls
    app.put('/updateQty', article.updateQty);

    // Delete a article with id
    app.delete('/article/:articleId', article.delete);


}