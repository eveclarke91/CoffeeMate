var Coffee = require('../models/coffees');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/coffeesdb');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});


router.findAll = function(req, res) {
    // Use the Coffee model to find all coffeea
    Coffee.find(function(err, coffees) {
        if (err)
            res.send(err);

        res.json(coffees);
    });
}

router.addCoffee = function(req, res) {

    var coffee = new Coffee();

    coffee.coffeename = req.body.coffeename;
    coffee.coffeeshop = req.body.coffeeshop;
    coffee.coffeeprice = req.body.coffeeprice;

    console.log('Adding coffee: ' + JSON.stringify(coffee));

    // Save the coffee and check for errors
    coffee.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Coffee Added!', data: coffee });
    });
}


router.findOne = function(req, res) {

    // Use the Coffee model to find a single coffeezzz
    Coffee.findById(req.params.id,function(err, coffee) {
        if (err)
            res.json({ message: 'Coffee NOT Found!', errmsg : err } );
        else
            res.json(coffee);
    });
}

function getByValue(arr, id) {

    var result  = arr.filter(function(o){return o.id == id;} );

    return result ? result[0] : null; // or undefined
}

router.incrementUpvotes = function(req, res) {

    Coffee.findById(req.params.id, function(err,coffee) {
        if (err)
            res.send(err);
        else {
            coffee.upvotes += 1;
            coffee.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Coffee Upvoted!', data: coffee });
            });
        }
    });
}
router.deleteCoffee = function(req, res) {

    Coffee.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Coffee Deleted!'});
    });
}

router.update = function(req, res){

    Coffee.findById(req.body.id, function(err,coffee) {
        if (err)
            res.send(err);
        else {
            coffee.coffeename = req.body.coffeename;
            coffee.coffeeshop = req.body.coffeeshop;
            coffee.coffeeprice = req.body.coffeeprice;

            coffee.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Coffee Upvoted!', data: coffee });
            });
        }
    });

}

module.exports = router;

