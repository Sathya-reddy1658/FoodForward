var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'FoodForward', loggedIn: req.session.loggedIn });
});

router.get('/about', function(req, res, next) {
  res.render('about'); 
});

router.get('/Charity', function(req, res, next) {
  res.render('Charity', { title: 'Charity' }); 
});

router.get('/feeding', function(req, res, next) {
  res.render('awards', { title: 'Feeding' }); 
});

router.get('/partner', function(req, res, next) {
  res.render('login'); 
});

router.get('/login', function(req, res, next) {
  // Here you can add your login validation logic
  req.session.loggedIn = true; // For demonstration purposes, setting loggedIn to true
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  req.session.loggedIn = false;
  res.redirect('/');
});

router.get('/thankLogin', function(req, res, next) {
  res.render('thanklogin'); 
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' }); 
});

router.get('/donate', function(req, res, next) {
  res.render('donate'); 
});

router.get('/donate/NGO', function(req, res, next) {
  let restaurant = req.query.restaurant;
  res.render('ngo', { restaurant: restaurant }); 
});

router.get('/person', function(req, res, next) {
  let name = req.query.name;
  let restaurant = req.query.restaurant;
  res.render('singleNGO', { name: name, restaurant: restaurant }); 
});

router.get('/thankyou', function(req, res, next) {
  let name = req.query.name;
  let restaurant = req.query.restaurant;
  res.render('thankyou', { name: name, restaurant: restaurant });
});

module.exports = router;
