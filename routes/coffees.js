var coffees = require('../models/coffees');
var express = require('express');
var router = express.Router();

router.findAll = function(req, res) {
    // Return a JSON representation of our list
    res.json(coffees);
}

router.addCoffee = function(req, res) {
    //Add a new coffee to our list
    var id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id
    // parameters to store
    // id (for id)
    // req.body.paymenttype (for paymenttype)
    // req.body.amount (for amount)
    // 0 (for upvotes)
    var currentSize = coffees.length;

    coffees.push({id: id, coffeename: req.body.coffeename, coffeeshop: req.body.coffeeshop, coffeeprice: req.body.coffeeprice,  upvotes: 0});


    if((currentSize + 1) == coffees.length)
        res.json({ message: 'Coffee Added!'});
    else
        res.json({ message: 'Coffee NOT Added!'});
}


router.findOne = function(req, res) {

    var coffee = getByValue(coffees,req.params.id);

    if(coffee != null)
        res.json(coffee);
    else
        res.json({ message: 'Coffee NOT Found!'});
}

function getByValue(arr, id) {

    var result  = arr.filter(function(o){return o.id == id;} );

    return result ? result[0] : null; // or undefined
}

router.incrementUpvotes = function(req, res) {
    //Add 1 to upvotes property of the selected coffee based on its id
    var coffee = getByValue(coffees,req.params.id);
    coffee.upvotes += 1;
}

router.deleteCoffee = function(req, res) {
    //Delete the selected coffee based on its id
    var coffee = getByValue(coffees,req.params.id);
    var index = coffees.indexOf(coffee);

    var currentSize = coffees.length;
    coffees.splice(index, 1);

    if((currentSize - 1) == coffees.length)
        res.json({ message: 'Coffee Deleted!'});
    else
        res.json({ message: 'Coffee NOT Deleted!'});
}

module.exports = router;

