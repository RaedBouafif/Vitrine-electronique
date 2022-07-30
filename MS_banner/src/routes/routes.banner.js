module.exports = (app) => {
    const banner = require('../controllers/controllers.banner');

    // Create a new banner
    app.post('/banner', banner.create);
    
    // Retrieve all banner
    app.get('/banner', banner.findAll);

    // Retrieve a single banner with id
    app.get('/banner/:bannerId', banner.findOne);

    // Update a banner with id
    app.put('/banner/:bannerId', banner.update);

    // Delete a banner with id
    app.delete('/banner/:bannerId', banner.delete);


}