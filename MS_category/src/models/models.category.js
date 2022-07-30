const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
	id:String,
	categoryName:String,
	image:String,
	active:Boolean,
	subCategories:[{name:String,active:Boolean}]
	
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);