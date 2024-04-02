const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//Connecct to DB
db.connect();

app.use(morgan('combined'));
app.use(express.json());

route(app);

app.listen(port, () => {
    console.log(` listening on port ${port}`);
});
