module.exports = (app) => {
    const ad = require('../controllers/controllers.ad');

    // Create a new ad
    app.post('/ad', ad.create);
    
    // Retrieve all ad
    app.get('/ad', ad.findAll);

    // Retrieve a single ad with id
    app.get('/ad/:adId', ad.findOne);

    // Update a ad with id
    app.put('/ad/:adId', ad.update);

    // Delete a ad with id
    app.delete('/ad/:adId', ad.delete);


}