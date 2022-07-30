const mongoose = require('mongoose');

const ProviderSchema = mongoose.Schema({

    id:String,
    designation:      String,
    description:      String,
	phoneNumber:   String,
	mail: String,
	link:String,
	address: String,
	postalCode:String,
	city:String,
	country:String,
	creationDate:Date,
	active: Boolean
	 ,
	deleted: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Provider', ProviderSchema);