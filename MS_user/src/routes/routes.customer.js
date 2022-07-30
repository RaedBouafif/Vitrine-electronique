module.exports = (app) => {
    const customer = require('../controllers/controllers.customer');

   // Create a new customer
   app.post('/confirmCustomerMail', customer.confirmMail);

      // Create a new token
      app.post('/newToken', customer.createToken);

    // Create a new customer
    app.post('/customer', customer.create);

    // Create a new customer with social account
    app.post('/addCustomer', customer.add);
    // FindByMail
    app.get('/getCustomerByMail/:mail', customer.findByMail);

    // Login
    app.get('/connectCustomer/:login/:password', customer.login);

    // Retrieve all customer
    app.get('/customer', customer.findAll);

    // Retrieve a single customer with id
    app.get('/customer/:customerId', customer.findOne);

    // Update a customer with id
    app.put('/customer/:customerId', customer.update);

    // Delete a customer with id
    app.delete('/customer/:customerId', customer.delete);
}