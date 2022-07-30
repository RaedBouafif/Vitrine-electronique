const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
	id:String,
	title:String,
	description:String,
	reference: String,
	availability:String,
	price:Number,
	tax:Number,
	quantity:Number,
	city:String,
	gouvernomant:String,
	etat:String,
	customerId:String,
	creationDate:Date,
	active:Boolean,
	deleted: Boolean,
	discount:{onDiscount:Boolean,percentage:Number},
	images:[{path:String}],
	videos:[{path:String}],
	features:[{name:String,value:String}],
	categories:[{category:String,subCategory:String}],
	priceHistory:[{price:Number,updateDate:Date}]
	
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', ArticleSchema);