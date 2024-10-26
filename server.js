const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/User");
const Restaurant = require("./models/Restaurant");
const Order = require("./models/Order");
const DeliveryPerson = require("./models/DeliveryPerson");

const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/deliverypersons", deliveryRoutes);

mongoose
  .connect("mongodb://localhost:27017/eatez", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("No se pudo conectar a MongoDB:", err));

app.get("/", (req, res) => {
  res.send("¡Hola, mundo! Bienvenido a la API de Eatez.");
});

app.post("/api/users", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/restaurants", async (req, res) => {
  const { name, address, cuisine, rating, menu } = req.body;

  try {
    const newRestaurant = new Restaurant({
      name,
      address,
      cuisine,
      rating,
      menu,
    });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/orders", async (req, res) => {
  const { user, restaurant, items, total } = req.body;

  try {
    const newOrder = new Order({ user, restaurant, items, total });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/deliverypersons", async (req, res) => {
  const { name, phone, email, vehicle } = req.body;

  try {
    const newDeliveryPerson = new DeliveryPerson({
      name,
      phone,
      email,
      vehicle,
    });
    await newDeliveryPerson.save();
    res.status(201).json(newDeliveryPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/deliverypersons", async (req, res) => {
  try {
    const deliveryPerson = await DeliveryPerson.find();
    res.status(200).json(deliveryPerson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
