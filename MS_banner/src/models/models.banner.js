const mongoose = require('mongoose');

const BannerSchema = mongoose.Schema({
	title:String,
	description:String,
	location: String,
	type:String,
	link:String,
	image:String,
	creationDate:Date,
	active:Boolean,
}, {
    timestamps: true
});

module.exports = mongoose.model('Banner', BannerSchema);