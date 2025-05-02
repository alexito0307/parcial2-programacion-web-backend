const express = require('express');
const router = express.Router();
const { getSale, createSale, updateSale, deleteSale } = require('../controllers/salesControllers')

router.get("/", getSale);
router.post("/", createSale);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

module.exports = router;