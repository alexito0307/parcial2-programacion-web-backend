const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true }
});

const saleSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Favor de incluir el nombre del cliente']
  },
  shippingAddress: {
    type: String,
    required: [true, 'Favor de incluir la dirección de envío']
  },
  items: [itemSchema],
  totalPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sale', saleSchema);