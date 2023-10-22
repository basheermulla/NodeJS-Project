/****************************************************************************************************************************************/
/********************************************************//* Requires *//****************************************************************/
/****************************************************************************************************************************************/
/****************************************************************************************************************************************/
/****************************************//*   Fire the server by run ----->   npm start    *//******************************************/
/****************************************************************************************************************************************/
/****************************************************************************************************************************************/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const connectDB = require('./config/db');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require("path");

/*******************************************************************************/
/*********************//* Use Environment Variable *//**************************/
/*******************************************************************************/
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const { SECRET } = process.env;
const { MONGO_URI } = process.env;

/*******************************************************************************/
/*************************//* Connect Database *//******************************/
/*******************************************************************************/
connectDB();

const store = new MongoDBStore({
    uri: MONGO_URI,
    collection: 'mySessions'
  });
  

/****************************************************************************************************************************************/
/******************************************************//* Middlewares *//***************************************************************/
/****************************************************************************************************************************************/

// set static directories
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// cookie parser middleware
app.use(cookieParser());

// Cross-Origin Resource Sharing (CORS) is a mechanism 
// that gives permission for one origin (domain) to access another origin

const whitelist = ['http://127.0.0.1:3001', 'http://127.0.0.1'];

const corsOptions = {
    origin: whitelist,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

// Add headers before the routes are defined
app.use(function (req, res, next) {
    //console.log(req.headers.referer);
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', whitelist);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie")

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader(
        'Access-Control-Expose-Headers',
        'data, etag, Access-Control-Allow-Origin, Access-Control-Allow-Credentials');
        
        // Pass to next layer of middleware
    next();
});

// built in middleware function in Express starting from v4.16.0. 
// It parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// Parse incoming request bodies in a middleware before the handlers, 
// available under the 'req.body' property
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/*******************************************************************************/
/********************//* Create a session middleware *//************************/
/*******************************************************************************/
const now = new Date();
const night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // the next day, ...
    0, 0, 0 // ...at 00:00:00 hours
);

const msToMidnight = night.getTime() - now.getTime();

const sessionMiddleware = session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: msToMidnight,
        httpOnly: false,
        //sameSite: 'None',
        //secure: true
    },
    store: store
});

app.use(sessionMiddleware);

/****************************************************************************************************************************************/
/**********************************************//* Routers - Logic goes here *//*********************************************************/
/****************************************************************************************************************************************/
const authRouter = require('./routers/authRouter');
app.use('/auth', authRouter);

const employeesRouter = require('./routers/employeesRouter');
app.use('/employees', employeesRouter);

const departmentsRouter = require('./routers/departmentsRouter');
app.use('/departments', departmentsRouter);

const shiftsRouter = require('./routers/shiftsRouter');
app.use('/shifts', shiftsRouter);

const actionsRouter = require('./routers/actionsRouter');
app.use('/actions', actionsRouter);

const usersRouter = require('./routers/usersRouter');
app.use('/users', usersRouter);

/****************************************************************************************************************************************/
/**********************************//* Render HTML file in Node.js and Express.js framework *//******************************************/
/****************************************************************************************************************************************/
app.get('/authPage', (req, res) => {
    res.sendFile(path.join(__dirname, "../" + 'client/login.html'));
});

app.get('/employeePage', (req, res) => {
    res.sendFile(path.join(__dirname, "../" + 'client/employees.html'));
});

app.get('/departmentPage', (req, res) => {
    res.sendFile(path.join(__dirname, "../" + 'client/departments.html'));
});

app.get('/shiftPage', (req, res) => {
    res.sendFile(path.join(__dirname, "../" + 'client/shifts.html'));
});

app.get('/newEmployeePage', (req, res) => {
    res.sendFile(path.join(__dirname, "../" + 'client/newEmployees.html'));
});

app.get('/editEmployeePage', (req, res) => {
    res.sendFile(path.join(__dirname, "../" + 'client/editEmployees.html'));
});

app.get('/newDepartmentPage', (req, res) => {
    res.sendFile(path.join(__dirname, "../" + 'client/newDepartment.html'));
});

app.get('/editDepartmentPage', (req, res) => {
    res.sendFile(path.join(__dirname, "../" + 'client/editDepartment.html'));
});

app.get('/usersPage', (req, res) => {
    res.sendFile(path.join(__dirname, "../" + 'client/users.html'));
});

/****************************************************************************************************************************************/
/******************************************************//* server listening *//**********************************************************/
/****************************************************************************************************************************************/
app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});