const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Directory for static html to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Shola"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shola'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helptext: 'Help Page',
        name: 'Shola',
        title: 'Help'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }

     geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
            if(error){
                return res.send({error})
            }
            forecast(longtitude, latitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                 })
            })
        })
    
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
        console.log(req.query.search)
        res.send({
            products: []
        })
})


app.get('/help/*', (req,res) => {
    res.render('error', {
        msg: 'This article cannot be found',
        name: 'Shola',
        title: '404'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        msg: 'Page not found',
        name: 'Shola',
        title: '404'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})

