var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var app = express();

//para permitir las peticiones evita el error Access-Control-Allow-Origin'
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyparser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyparser.json())

mongoose.connect("mongodb://localhost:27017/products", { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;

    console.log('se establecio conexion');
});

/* mongoose.connection.openUri('mongodb://localhost:27017/products', (err, res) => {

    if (err) throw err;

    console.log('se establecio conexion');
}); */

//import rutas
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var loginRoutes = require('./routes/login');
var roleRoutes = require('./routes/role');
var departmentRoutes = require('./routes/department');
var cityRoutes = require('./routes/city');
var communeRoutes = require('./routes/commune');
var typeLocationRoutes = require('./routes/typeLocation');
var locationRoutes = require('./routes/location');
var contactRoutes = require('./routes/contact');
var companyRoutes = require('./routes/company');
var attributeRoutes = require('./routes/attribute');
var productRoutes = require('./routes/product');
var attributeProductRoutes = require('./routes/attributeProduct');
var productCompanyRoutes = require('./routes/productCompany');
var categoryRoutes = require('./routes/category');
var lineRoutes = require('./routes/line');
var sublineRoutes = require('./routes/subline');
var uploadRoutes = require('./routes/upload');
var imgRoutes = require('./routes/img');
var searchRoutes = require('./routes/search');

app.use('/search', searchRoutes);
app.use('/img', imgRoutes);
app.use('/upload', uploadRoutes);
app.use('/subline', sublineRoutes);
app.use('/line', lineRoutes);
app.use('/category', categoryRoutes);
app.use('/productCompany', productCompanyRoutes);
app.use('/attributeProduct', attributeProductRoutes);
app.use('/product', productRoutes);
app.use('/attribute', attributeRoutes);
app.use('/company', companyRoutes);
app.use('/contact', contactRoutes);
app.use('/location', locationRoutes);
app.use('/typeLocation', typeLocationRoutes);
app.use('/commune', communeRoutes);
app.use('/city', cityRoutes);
app.use('/department', departmentRoutes);
app.use('/role', roleRoutes);
app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);

app.listen(3000, () => {
    console.log('server runing port 3000');
});