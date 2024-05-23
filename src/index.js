const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

// Import routes
const customerRoutes = require('./routes/customer');
const ventaRoutes = require('./routes/ventas');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',  // Tu usuario de MySQL
    password: 'Emmanuelcasta34*',  // Tu contraseña de MySQL
    database: 'mydb'  // El nombre de tu base de datos
}, 'single'));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', customerRoutes);
app.use('/', ventaRoutes);
// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
