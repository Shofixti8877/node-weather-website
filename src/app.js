const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3001

// define path for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Amit Reif'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Amit Reif'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'this is some helpful text',
        title: 'Help',
        name: 'Amit Reif'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'must enter address'
        })
        return
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            res.send({
                error
            })
            return
        }
        forecast(latitude, longitude, (error, data) => {
            if(error) {
                res.send({
                    error
                })
                return
            }
            res.send({
                location,
                forecast: data,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({ error: 'you must provide a search term'})
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: 'Help',
        name: 'Amit Reif'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Amit Reif'

    })
})

app.listen(port, () => {
    console.log(`server is up on port ${port}.`);
})