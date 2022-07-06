const config = require('config');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
  }

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`)); 