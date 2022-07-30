const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
	path:String,
	title:String,
	description:String,
	creationDate:Date,
	active:Boolean
	
}, {
    timestamps: true
});

module.exports = mongoose.model('Image', ImageSchema);