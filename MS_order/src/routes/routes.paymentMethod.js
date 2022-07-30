module.exports = (app) => {
    const paymentMethod = require('../controllers/controllers.paymentMethod');

    // Create a new paymentMethod
    app.post('/paymentMethod', paymentMethod.create);
    
    // Retrieve all paymentMethod
    app.get('/paymentMethod', paymentMethod.findAll);

    // Retrieve a single paymentMethod with id
    app.get('/paymentMethod/:paymentMethodId', paymentMethod.findOne);

    // Update a paymentMethod with id
    app.put('/paymentMethod/:paymentMethodId', paymentMethod.update);

    // Delete a paymentMethod with id
    app.delete('/paymentMethod/:paymentMethodId', paymentMethod.delete);


}