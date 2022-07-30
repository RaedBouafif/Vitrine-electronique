module.exports = (app) => {
    const messaging = require('../controllers/controllers.messaging');

    // sendemail
    app.post('/sendMail', messaging.send);

    // Create a new messaging
    app.post('/messaging', messaging.create);
    
    // Retrieve count messaging
    app.get('/countMessage', messaging.count);
    
    // Retrieve all new messaging
    app.get('/newMessaging', messaging.findnew);

    // Retrieve all messaging
    app.get('/messaging', messaging.findAll);

    // Retrieve a single messaging with id
    app.get('/messaging/:messagingId', messaging.findOne);

    // read Message
    app.put('/readMessage/:messagingId', messaging.readMessage);

    // Update a messaging with id
    app.put('/messaging/:messagingId', messaging.update);

    // Delete a messaging with id
    app.delete('/messaging/:messagingId', messaging.delete);


}