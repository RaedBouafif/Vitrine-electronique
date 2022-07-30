module.exports = (app) => {
    const deliveryMethod = require('../controllers/controllers.deliveryMethod');

    // Create a new deliveryMethod
    app.post('/deliveryMethod', deliveryMethod.create);
    
    // Retrieve all deliveryMethod
    app.get('/deliveryMethod', deliveryMethod.findAll);

    // Retrieve a single deliveryMethod with id
    app.get('/deliveryMethod/:deliveryMethodId', deliveryMethod.findOne);

    // Update a deliveryMethod with id
    app.put('/deliveryMethod/:deliveryMethodId', deliveryMethod.update);

    // Delete a deliveryMethod with id
    app.delete('/deliveryMethod/:deliveryMethodId', deliveryMethod.delete);


}