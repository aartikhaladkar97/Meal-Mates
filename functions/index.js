const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Submit restaurant
app.post("/submit-restaurant", async (req, res) => {
  const { name, contact, email, restaurantName, address } = req.body;
  const slug = restaurantName.toLowerCase().replace(/\s+/g, "-");

  try {
    const docRef = await db.collection("MealMatesRestaurant").add({
      name,
      contact,
      email,
      restaurantName,
      address,
      slug,
      reviewed: false,
      verified: false,
    });

    res.status(200).send({ message: "Restaurant submitted successfully", id: docRef.id });
  } catch (err) {
    res.status(500).send({ error: "Submission failed" });
  }
});

// Update restaurant
app.post("/update-restaurant/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.collection("MealMatesRestaurant").doc(id).update(req.body);
    res.send({ message: "Restaurant updated successfully" });
  } catch (err) {
    res.status(500).send({ error: "Update failed." });
  }
});

// Get all restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const snapshot = await db.collection("MealMatesRestaurant").get();
    const restaurants = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch restaurants" });
  }
});

// Get offers
app.get("/restaurants/:id/offers", async (req, res) => {
  const { id } = req.params;
  try {
    const snapshot = await db.collection("MealMatesRestaurant").doc(id).collection("offers").get();
    const offers = snapshot.docs.map(doc => doc.data());
    res.status(200).json(offers);
  } catch (err) {
    res.status(500).json({ error: "Failed to get offers" });
  }
});

// Add offer
app.post("/restaurants/:id/offers", async (req, res) => {
  const { id } = req.params;
  const offer = req.body;
  try {
    await db.collection("MealMatesRestaurant").doc(id).collection("offers").add(offer);
    res.status(200).json({ message: "Offer added" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add offer" });
  }
});

exports.MealMatesApi = functions.https.onRequest(app);
