module.exports = (app) => {
    const settings = require('../controllers/controllers.settings');

    // Create a new settings
    app.post('/settings', settings.create);
    
    // Retrieve all settings
    app.get('/settings', settings.find);

    // Retrieve a single settings with id
    app.get('/settings/:settingsId', settings.findOne);

    // Update a settings with id
    app.put('/settings/:settingsId', settings.update);

    // Delete a settings with id
    app.delete('/settings/:settingsId', settings.delete);


}