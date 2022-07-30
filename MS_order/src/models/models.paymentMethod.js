const mongoose = require('mongoose');

const PaymentMethodSchema = mongoose.Schema({
	name:String,
	active:Boolean,
	deleted:Boolean
	
}, {
    timestamps: true
});

module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema);
