const asyncHandler = require("express-async-handler");
const Sale = require("../models/salesModel");

//GET
const getSale = asyncHandler( async(req,res) => {
  const sale = await Sale.find();
  res.status(200).json({sale})
})

//POST
const createSale = asyncHandler(async (req, res) => {
  const { product, amount, totalPrice } = req.body;
  const sale = await Sale.create({ product, amount, totalPrice });
  res.status(201).json(sale);
});

//UPDATE
const updateSale = asyncHandler( async(req,res) => {
  const sale = await Sale.findById(req.params.id); //Checar si esta
  if(!sale) {
    res.status(400);
    throw new Error("Sale no encontrada");
  }
  const saleNueva = await Sale.findByIdAndUpdate(req.params.id, req.body, { 
    new: true
  });
  res.status(200).json(saleNueva);
})

//DELETE
const deleteSale = asyncHandler ( async(req,res) => {
  const sale = await Sale.findById(req.params.id); //Checar si esta
  if(!sale) {
    res.status(400);
    throw new Error("Sale no encontrada");
  }
  await sale.deleteOne();
  res.status(200).json({"id": req.params.id});
})

module.exports = {
  getSale,
  createSale,
  updateSale,
  deleteSale
}