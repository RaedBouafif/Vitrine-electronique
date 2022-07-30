const Settings = require('../models/models.settings');


// Create and Save a new Settings
exports.create = (req, res) => {
          // Validate request
/*           const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          } */
    if(!req.body) {
        return res.status(400).send({
            message: "Settings can not be empty"
        });
    }

              // Create a Settings
    const settings = new Settings({
     
        description: req.body.description || null,
        mailList: req.body.mailList || [],
        links: req.body.links || [],
    });
   
       
    // Save settings in the database
    settings.save()
    .then(data => {res.send(data)}).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the settings."
        });
    });
        
    
       
  

};



// Retrieve and return all settingss from the database.
exports.find = (req, res) => {
    Settings.find()
    .then(settings => {
        res.send(settings[0]);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving settings."
        });
    });
};

// Find a single settings with a settings's id
exports.findOne = (req, res) => {
    Settings.findById(req.params.settingsId)
    .then(settings => {
        if(!settings) {
            return res.status(404).send({
                message: "Settings not found with id " + req.params.settingsId
            });            
        }
        res.send(settings);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Settings not found with id " + req.params.settingsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Settings with id " + req.params.settingsId
        });
    });
};

// Update a settings identified by the settingsId in the request
exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }

    // Find settings and update it with the request body
    Settings.findByIdAndUpdate(req.params.settingsId, {
        description: req.body.description || null,
        mailList: req.body.mailList || [],
        links: req.body.links || [],
    }, {new: true})
    .then(settings => {
        if(!settings) {
            return res.status(404).send({
                message: "Settings not found with id " + req.params.settingsId
            });
        }
        res.send(settings);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Settings not found with id " + req.params.settingsId
            });                
        }
        return res.status(500).send({
            message: "Error updating Settings with id " + req.params.settingsId
        });
    });
};


// Delete a settings with the specified settingsId in the request permenantly
exports.delete = (req, res) => {
    Settings.findByIdAndRemove(req.params.settingsId)
    .then(settings => {
        if(!settings) {
            return res.status(404).send({
                message: "settings not found with id " + req.params.settingsId
            });
        }
        res.send({message: "settings deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Settings not found with id " + req.params.settingsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete settings with id " + req.params.settingsId
        });
    });
};