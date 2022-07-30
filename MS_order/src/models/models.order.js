const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
	reference:String,
	orderDate:Date,
	customer:String,
	deliveryAddress:String,
	deliveryMethod:String,
	paymentMethod:String,
	status:String,
	paymentStatus:Boolean,
	total:Number,
	totalTTC:Number,
	details:[
		{
			article:String,
			quantity:Number,
			unitPrice:Number
		}
	]
	
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);