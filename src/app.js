const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;
app.use(cookieParser());
const route = require('./routes');
const db = require('./config/db');


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Bật sử dụng cookies
}));
//Connecct to DB
db.connect();

app.use(morgan('combined'));
app.use(express.json());

route(app);

app.listen(port, () => {
    console.log(` listening on port ${port}`);
});
