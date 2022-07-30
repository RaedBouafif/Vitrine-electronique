const mongoose = require('mongoose');

const DeliveryMethodSchema = mongoose.Schema({
	name:String,
	active:Boolean,
	deleted:Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('DeliveryMethod', DeliveryMethodSchema);