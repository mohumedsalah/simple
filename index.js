const express = require('express');

const app = express();
app.use(express.json());

require('./shared/db')(app);
require('./shared/middleware')(app);
require('./shared/routes')(app);
