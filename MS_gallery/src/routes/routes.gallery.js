module.exports = (app) => {
    const image = require('../controllers/controllers.gallery');
    const upload = require('../config/upload')

    // Upload an image
    app.post('/upload',upload.single('file'),image.upload);

    // Create a new image
    app.post('/image', image.create);
    

    // Retrieve all image
    app.get('/image', image.findAll);

    // Retrieve a single image with id
    app.get('/image/:imageId', image.findOne);


    // Update a image with id
    app.put('/image/:imageId', image.update);

    // Delete a image with id
    app.delete('/image/:imageId', image.delete);


}