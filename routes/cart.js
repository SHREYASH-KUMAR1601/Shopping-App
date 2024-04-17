const express = require("express");
const { isLoggedIn } = require("../middleware");
const User = require("../models/User");
const Product = require("../models/product");
const router = express.Router();
const stripe = require('stripe')('sk_test_51P50QuSHzSBUbpG84Ahi15ERhrKZJ15ZCPljZaIdxBlgxEtcCgOPtHTlC54MMn2y0llmP9WgaNf0CbYpsxNVpvqB00LuCvQliy')


router.get("/user/cart", isLoggedIn, async (req, res) => {
  let userId = req.user._id;
  let user = await User.findById(userId).populate("cart");
  //   console.log(user, "sam");
  let totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
  //   console.log(totalAmount);

  res.render("cart/cart", { user, totalAmount });
});

router.post("/user/:productId/add", isLoggedIn, async (req, res) => {
  let { productId } = req.params;
  let userId = req.user._id;
  let user = await User.findById(userId);
  //   console.log(user, "sam");
  let product = await Product.findById(productId);
  user.cart.push(product);
  await user.save();
  res.redirect("/user/cart");
});


router.get("/checkout/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    console.log(req.params);
    let user = await User.findById(userId).populate("cart");
    if (!user) {
      return res.status(404).send("User not found");
    }
    let totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
    console.log(user.cart);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: totalAmount * 100,
          },
          quantity: user.cart.length,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:4242/success',
      cancel_url: 'http://localhost:4242/cancel',
    });
    res.redirect(303,session.url);
    console.log(session);
    // Send the session ID back to the client
    // res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
