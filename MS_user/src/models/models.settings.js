const mongoose = require('mongoose');

const SettingsSchema = mongoose.Schema({

	description: String,
	mailList:[{
		mail:String,name:String
	}],
	links:[{
		link:String,name:String,active:Boolean
	}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Settings', SettingsSchema);