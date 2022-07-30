const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({

	id:String,
    firstname:      String,
    lastname:      String,
	phoneNumber:   String,
	addresses:[{	address: String,
				postalCode:String,
				city:String}],
	function:String,
	registrationDate:Date,
	mail: String,
	login:String,
	password: String,
	active: Boolean,
	accountType:String,
	mailVerified: Boolean,
	deleted: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);