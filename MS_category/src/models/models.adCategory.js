const mongoose = require('mongoose');

const AdCategorySchema = mongoose.Schema({
	title:String,
	creationDate:Date,
	active:Boolean,
	deleted:Boolean,
	subCategories:[{
		title:String,
		creationDate:Date,
		active:Boolean,
		deleted:Boolean,
		families:[
			{
				title:String,
				creationDate:Date,
				active:Boolean,
				deleted:Boolean

			}
		]
	}]
	
}, {
    timestamps: true
});

module.exports = mongoose.model('AdCategory', AdCategorySchema);