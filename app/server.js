const express = require('express');
const app = express();
const {sequelize} = require('./models/index');
const cors = require('cors');
const compression = require('compression');

//Settings
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(compression());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes'));

app.listen(3000, function () {
    console.log(`Listening on port http://localhost:${PORT}`);

    sequelize.authenticate().then(() => {
        console.log('Connexión establecida correctamente')
    })
})