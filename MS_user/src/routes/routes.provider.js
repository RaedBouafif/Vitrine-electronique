module.exports = (app) => {
    const provider = require('../controllers/controllers.provider');

    // Create a new provider
    app.post('/provider', provider.create);
    
    // FindByMail
    app.get('/getProviderByMail/:mail', provider.findByMail);


    // Retrieve all provider
    app.get('/provider', provider.findAll);

    // Retrieve a single provider with id
    app.get('/provider/:providerId', provider.findOne);

    // Update a provider with id
    app.put('/provider/:providerId', provider.update);

    // Delete a provider with id
    app.delete('/provider/:providerId', provider.delete);
}