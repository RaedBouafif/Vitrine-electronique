const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
	id:String,
    firstname:String,
    lastname:String,
	address: String,
	postalCode:String,
	function:String, 
	mail: String,
	phoneNumber:String,
	login:String,
	password: String,
	role:Number,
	deleted: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);