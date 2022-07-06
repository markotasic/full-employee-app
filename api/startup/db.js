const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/employee-app')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(() => console.log('Could not connect to MongoDB...'));
}