const express = require("express");
const router = express.Router();
const Delivery = require("../models/DeliveryPerson");

router.post("/", async (req, res) => {
  const { name, phone, vehicleType } = req.body;

  try {
    const newDelivery = new Delivery({ name, phone, vehicleType });
    await newDelivery.save();
    res.status(201).json(newDelivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery)
      return res.status(404).json({ message: "Repartidor no encontrado" });
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!delivery)
      return res.status(404).json({ message: "Repartidor no encontrado" });
    res.json(delivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery)
      return res.status(404).json({ message: "Repartidor no encontrado" });
    res.json({ message: "Repartidor eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
