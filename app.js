const express = require('express');
let app = express();
const route = require('../ExpenseTracker-S/routes/route');
const sequelize = require('./util/db');
const expense = require('./models/expensedb');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(route);
sequelize.sync().then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err)
})


