const mongoose = require('mongoose');

const MessagingSchema = mongoose.Schema({
	subject:String,
	body:String,
	recipient:String,
	sendingDate:Date,
	sender:{name:String,address:String,city:String,PostalCode:String,mail:String,phoneNumber:String},
	read:Boolean,
	reply:String
	
}, {
    timestamps: true
});

module.exports = mongoose.model('Messaging', MessagingSchema);