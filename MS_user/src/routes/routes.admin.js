module.exports = (app) => {
    const admin = require('../controllers/controllers.admin');

    // Create a new admin
    app.post('/admin', admin.create);
    
    // FindByMail
    app.get('/getAdminByMail/:mail', admin.findByMail);

    // Login
    app.get('/connect/:login/:password', admin.login);

    // Retrieve all admin
    app.get('/admin', admin.findAll);

    // Retrieve a single admin with id
    app.get('/admin/:adminId', admin.findOne);

    // Update a admin with id
    app.put('/admin/:adminId', admin.update);

    // Delete a admin with id
    app.delete('/admin/:adminId', admin.delete);


}