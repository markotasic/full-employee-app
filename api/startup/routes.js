const express = require('express');
const fileUpload = require('express-fileupload');
const user = require('../routes/userRoutes');
const cors = require('cors');
const auth = require('../routes/authRoutes');

module.exports = function (app) {
    app.use(express.json());
    app.use(cors());
    app.use(fileUpload());
    app.use('/uploads', express.static('uploads'))
    app.use('/api/users', user);
    app.use('/api/auth', auth);
}