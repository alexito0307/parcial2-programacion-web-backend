const asyncHandler = require("express-async-handler");
const Sale = require("../models/salesModel");

//GET
const getSale = asyncHandler( async(req,res) => {
  const sale = await Sale.find();
  res.status(200).json({sale})
})

// POST
const createSale = asyncHandler(async (req, res) => {
  // 1) Verifica que llegue el body completo
  console.log('Creating sale with data:', req.body);

  const { name, address, items } = req.body;
  if (!name || !address || !Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('Datos de venta incompletos');
  }

  // 2) Calcula total server-side
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  // 3) Mapea los items según tu itemSchema
  const itemsToSave = items.map(i => ({
  productId: i.id,   // deja la cadena tal cual
  name:      i.name,
  price:     i.price,
  qty:       i.qty
}));

  // 4) Guarda en Mongo
  const sale = await Sale.create({
    customerName:    name,
    shippingAddress: address,
    items:           itemsToSave,
    totalPrice
  });

  // 5) Log de confirmación
  console.log('Sale saved:', sale);

  // 6) Responde al cliente
  res.status(201).json(sale);
});



//UPDATE
const updateSale = asyncHandler(async (req, res) => {
  // 1) Busca el pedido existente
  const sale = await Sale.findById(req.params.id);
  if (!sale) {
    res.status(404);
    throw new Error('Pedido no encontrado');
  }

  const { customerName, shippingAddress, items } = req.body;
  if (!customerName || !shippingAddress || !Array.isArray(items)) {
    res.status(400);
    throw new Error('Datos para actualizar incompletos');
  }

  // 2) Recalcula el total SERVER-SIDE
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  // 3) Sobrescribe los campos
  sale.customerName    = customerName;
  sale.shippingAddress = shippingAddress;
  sale.items           = items;
  sale.totalPrice      = totalPrice;

  // 4) Guarda el documento
  const updatedSale = await sale.save();
  console.log('Sale updated:', updatedSale);

  // 5) Devuelve la versión actualizada
  res.status(200).json(updatedSale);
});


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