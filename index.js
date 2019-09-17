const express = require('express');

const app = express();
app.use(express.json());

require('./shared/db').connect(app);
require('./shared/middleware')(app);
require('./shared/routes')(app);

app.listen(process.env.PORT || '8000', () =>
  console.log('sever listens to port : 8000')
);
