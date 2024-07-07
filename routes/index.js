require("dotenv").config();
var express = require('express');
var router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Home route
router.get('/', function(req, res) {
  res.render('index', { 
    title: 'FoodForward', 
    loggedIn: req.session.loggedIn || false 
  });
});

// About page
router.get('/about', function(req, res) {
  res.render('about'); 
});

// Location selection page
router.get('/location', function(req, res) {
  res.render('location'); 
});

router.get('/successful', function(req, res) {
  res.render('locationSuccessFul'); 
});

// Charity page
router.get('/Charity', function(req, res) {
  res.render('Charity', { title: 'Charity' }); 
});

// Stripe donation route
router.post('/stripe', async function(req, res) {
  try {
    const donationAmount = req.body.amount ? parseFloat(req.body.amount) : 10;

    if (isNaN(donationAmount) || donationAmount <= 0) {
      throw new Error("Invalid donation amount.");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Food Forward Donation',
            description: 'Donation from Poor People',
          },
          unit_amount: donationAmount * 100, // Convert to cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/complete`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    res.redirect(session.url);
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Stripe complete page
router.get("/complete", function(req, res) {
  res.render("complete");
});
router.get("/cancel", function(req, res) {
  res.render("cancel");
});

router.get('/feeding', function(req, res) {
  res.render('awards', { title: 'Feeding' });
});

router.get('/partner', function(req, res) {
  res.render('login'); 
});

router.get('/login', function(req, res) {
  req.session.loggedIn = true;
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send("Logout failed.");
    }
    res.redirect('/');
  });
});

router.get('/thankLogin', function(req, res) {
  res.render('thanklogin'); 
});

router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Contact' });
});

router.get('/donate', function(req, res) {
  res.render('donate'); 
});

router.get('/donate/NGO', function(req, res) {
  const restaurant = req.query.restaurant || "Unknown Restaurant";
  res.render('ngo', { restaurant });
});

// Person page
router.get('/person', function(req, res) {
  const name = req.query.name || "Unknown Name";
  const restaurant = req.query.restaurant || "Unknown Restaurant";
  res.render('singleNGO', { name, restaurant });
});

// Thank you page
router.get('/thankyou', function(req, res) {
  const name = req.query.name || "Unknown Name";
  const restaurant = req.query.restaurant || "Unknown Restaurant";
  res.render('thankyou', { name, restaurant });
});

module.exports = router;
