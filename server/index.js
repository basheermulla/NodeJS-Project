// Requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const connectDB = require('./config/db');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

// Use configuration files
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// Connect Database
connectDB();

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
const { SECRET } = process.env;

/********************************//* Middlewares *//********************************/
// Cross-Origin Resource Sharing (CORS) is a mechanism 
// that gives permission for one origin (domain) to access another origin
app.use(cors());

// built in middleware function in Express starting from v4.16.0. 
// It parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// cookie parser middleware
app.use(cookieParser());

// Parse incoming request bodies in a middleware before the handlers, 
// available under the 'req.body' property
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Create a session middleware
app.use(sessions({
    secret: SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

let session = '';

app.get('/', function (req, res) {
    // Access the session as req.session
    session = req.session;
    
    if (session.page_views) {
        session.page_views++;
        console.log(session.page_views)
        res.send("You visited this page " + req.session.page_views + " times");
    } else {
        session.page_views = 1;
        //console.log(session.page_views)
        res.send("Welcome to this page for the first time!");
    }
});

/*app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});*/

/*************************//* Routers - Logic goes here *//*************************/

const authRouter = require('./routers/authRouter');
app.use('/auth', authRouter);

const employeesRouter = require('./routers/employeesRouter');
app.use('/employees', employeesRouter);

const departmentsRouter = require('./routers/departmentsRouter');
app.use('/departments', departmentsRouter);

const shiftsRouter = require('./routers/shiftsRouter');
app.use('/shifts', shiftsRouter);

// server listening
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})