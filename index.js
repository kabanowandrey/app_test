const express= require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const PORT = require('./config/config');
const app = express();



app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/CSS"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

const registrationRouter = require('./routes/registration-route');
const loginRouter = require('./routes/login-route');
const dashboardRouter = require('./routes/dashboard-route');
const logoutRouter = require('./routes/logout-route');



app.use('/', registrationRouter);
app.use('/', loginRouter);
app.use('/', dashboardRouter);
app.use('/', logoutRouter);

port = PORT
app.listen(port, () => console.log(`Server is running on ${port}`));