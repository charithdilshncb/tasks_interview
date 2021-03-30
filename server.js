const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')
const dbConfig = require('./config.js')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const port = 3000
const AuthRoute = require('./src/routes/Auth.js')
const PromoRoute = require('./src/routes/Promo.js')

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
},
).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.json({ "message": "Welcome" });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

app.use('/api/auth', AuthRoute)
app.use('/api/promo', PromoRoute)