const mongoose = require('mongoose');

const AdSchema = mongoose.Schema({
	title:String,
	description:String,
	price:Number,
	creationDate:Date,
	status: String,
	family: String,
	subCategory:String,
	category:String,
	customer:{id:String,name:String,mail:String,phoneNumber:String,}
	
}, {
    timestamps: true
});

module.exports = mongoose.model('Ad', AdSchema);