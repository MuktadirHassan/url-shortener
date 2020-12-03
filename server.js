const express = require('express')
require('dotenv/config')
const mongoose = require('mongoose')
const app = express()
const path = require('path')

// models
const shortUrl = require('./models/shortUrl')

// middlewares
app.use(express.urlencoded({ extended: false }))

// Connect to db
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nisgx.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,{
    useUnifiedTopology:true, useNewUrlParser: true
}, err => !err ? console.log('Connected!') : console.log(err)
)


// routes
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})


app.get('/allShortUrls', async (req,res) => {
    try {
        const shortUrls = await shortUrl.find()
        res.json(shortUrls)

    } catch (error) {
        res.json(error)
    }
    
})
app.post('/shortUrl', async (req, res) => {
    const fullUrl = req.body.fullUrl;
    try {
        await shortUrl.create({ full: fullUrl })
        res.redirect('/')
        
    } catch (error) {
        res.json(error)
    }
})

app.get('/:id', async (req, res) => {
    try {
        const getURL = await shortUrl.findOne({ short: req.params.id }) 
        if (getURL === null) return res.sendStatus(404)
        getURL.clicks++
        getURL.save()
        res.redirect(`${getURL.full}`)
    } catch (error) {
        res.json(error)
    }
})


app.listen(process.env.PORT || 5000);