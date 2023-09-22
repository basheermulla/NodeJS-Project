// Requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const connectDB = require('./config/db');

// Use configuration files
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// Connect Database
connectDB();

/********************************//* Middlewares *//********************************/
// Cross-Origin Resource Sharing (CORS) is a mechanism 
// that gives permission for one origin (domain) to access another origin
app.use(cors());

// built in middleware function in Express starting from v4.16.0. 
// It parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json())

// Parse incoming request bodies in a middleware before the handlers, 
// available under the 'req.body' property
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/*************************//* Routers - Logic goes here *//*************************/

const authRouter = require('./routers/authRouter');
app.use('/auth', authRouter);

const employeesRouter = require('./routers/employeesRouter');
app.use('/employees', employeesRouter);

app.get('/', function (req, res) {
    res.send('Hello World')
})

// server listening
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})