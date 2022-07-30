module.exports = (app) => {
    const order = require('../controllers/controllers.order');

    // Create a new order
    app.post('/order', order.create);

    // Retrieve all order beloning to a customer
    app.get('/getOrderByCustomer/:customerId', order.findByCustomer); 

    // Retrieve all order
    app.get('/order', order.findAll);

    // Retrieve a single order with id
    app.get('/order/:orderId', order.findOne);

    // Update a order with id
    app.put('/order/:orderId', order.update);

    // Update a order status with id
    app.put('/orderStatus/:orderId', order.updateStatus);

    // Delete a order with id
    app.delete('/order/:orderId', order.delete);


}
