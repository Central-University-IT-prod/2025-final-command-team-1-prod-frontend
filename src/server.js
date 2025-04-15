const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const CONFIG = require('./config');
require("dotenv").config();

(async () => {
    const app = express();

    // middleware
    app.use(cors())
    app.use(express.json())
    app.use(cookieParser())
    app.use(express.static("public"))
    app.use(express.urlencoded({ extended: true }))

    const hbs = exphbs.create({
        layoutsDir: `${__dirname}/views/layouts`,
        defaultLayout: 'main',
        extname: 'hbs',
    })

    app.engine('hbs', hbs.engine)
    app.set('view engine', 'hbs')
    app.set('views', __dirname + '/views')

    // routes
    const auth = require("./routes/auth")
    const homepage = require("./routes/homepage")
    const error = require('./routes/error')
    const deletePlace = require('./routes/deletePlace')
    const createPlace = require('./routes/createPlace')

    app.use('/auth', auth)
    app.use('/homepage', homepage)
    app.use('/error', error)
    app.use("/", auth)
    app.use("/", deletePlace)
    app.use("/", createPlace)
    app.get("/", (_, res) => {
        res.redirect('/homepage')
    })
    app.get('/*', (_req, res) => {
        res.render('errorPage', {message: "Страница не найдена"})
    })

    app.listen(CONFIG.appPort, () => console.log(`Server started on port ${CONFIG.appPort}`))
})()
