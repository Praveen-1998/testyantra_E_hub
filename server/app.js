const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const db = require('./config/database');
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connecting to mongodb Database
mongoose.connect(db.database, { useNewUrlParser: true }).then(result => {
    console.log("mongodb connected");
    app.listen(4000)
    console.log("app is listening to port no 4000")
}).catch(err => {
    console.log(err)
})

// Requiring Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const imageupload = require('./routes/imageupload.route');
const showimage = require('./routes/showimage.route')
const clientDetails = require('./routes/clientDetails');
const billableEmployeesDetails = require('./routes/billableEmployees');
const billableEmployeesPackageDetails = require('./routes/billableEmployeesPackageDetails');
const CreateEmployeeRoute = require('./routes/createEmployee');
const NonBillableEmployeeRoute = require('./routes/nonBillableEmployees');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'))



app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Using routes
app.use(cors());
app.use(indexRouter);
app.use(usersRouter);
app.use(imageupload);
app.use(showimage);
app.use(clientDetails);
app.use(billableEmployeesDetails);
app.use(billableEmployeesPackageDetails);
app.use(CreateEmployeeRoute);
app.use(NonBillableEmployeeRoute);


app.use(function(req, res, next) {
    next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});