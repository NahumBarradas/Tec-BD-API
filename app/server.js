const express = require('express');
const app = express();
const {sequelize} = require('./models/index');
const cors = require('cors');

//Settings
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes'));
app.use(cors({
    origin: '*',
}));

app.listen(3000, function () {
    console.log(`Listening on port http://localhost:${PORT}`);

    sequelize.authenticate().then(() => {
        console.log('Connexión establecida correctamente')
    })
})