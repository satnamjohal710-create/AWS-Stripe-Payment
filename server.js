const express = require("express");
const app = express();
const { resolve } = require("path");
const port = process.env.PORT || 3000;

// Importing the dotenv module to use environment variables:
require("dotenv").config();

const api_key = process.env.SECRET_KEY;
const stripe = require("stripe")(api_key);

// Setting up the static folder:
app.use(express.static(resolve(__dirname, process.env.STATIC_DIR)));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Render home page:
app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

// Render success page:
app.get("/success", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/success.html");
  res.sendFile(path);
});

// Render cancel page:
app.get("/cancel", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/cancel.html");
  res.sendFile(path);
});

// CONFIG API endpoint (shares public key with frontend):
app.get("/api/config", (req, res) => {
  res.json({
    publishableKey: process.env.PUBLISHABLE_KEY || ""
  });
});

// STRIPE CHECKOUT SESSION API endpoint (retrieves session details):
app.get("/checkout-session", async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Missing session ID" });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(id);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create checkout session dynamically using inline price_data:
app.post("/api/create-checkout-session", async (req, res) => {
  const { amount, name, email, description } = req.body;
  
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid payment amount. Must be a positive number." });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  // Resolve host dynamically using request headers:
  const origin = req.headers.referer
    ? new URL(req.headers.referer).origin
    : process.env.DOMAIN || `http://localhost:${port}`;

  // Stripe amounts are represented in cents (e.g. $10.00 is 1000 cents)
  const amountInCents = Math.round(parseFloat(amount) * 100);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      success_url: `${origin}/success?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name || "Custom Payment",
              description: description || "Direct transaction via payment portal",
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
    });
    res.json({
      id: session.id,
    });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Server listening:
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
  console.log(`You may access you app at: ${process.env.DOMAIN}`);
});
