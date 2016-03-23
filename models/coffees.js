var mongoose = require('mongoose');

var CoffeeSchema = new mongoose.Schema({
    coffeename: String,
    coffeeshop: String,
    coffeeprice: Number,
    upvotes: {type: Number, default: 0}
});

module.exports = mongoose.model('Coffee', CoffeeSchema);

