const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
  product: {
    type: String,
    required: [true, "Favor de incluir el producto vendido"]
  },
  amount: {
    type: Number, 
    required: [true, "Favor de incluir la cantidad de producto"]
  },
  totalPrice: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Sale', saleSchema);