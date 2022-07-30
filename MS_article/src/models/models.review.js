const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
	customer:String,
	article:String,
	note: Number,
	comment:String,
	creationDate:Date,
	active:Boolean
	
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', ReviewSchema);