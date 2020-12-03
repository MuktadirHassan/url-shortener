const mongoose = require('mongoose')
const express = require('express')
const app = express()

mongoose.connect('mongodb://localhost/shortUrl',{
    useUnifiedTopology:true, useNewUrlParser: true
}, err => console.log(err))

app.get('/',(req,res) => {
    return res.json({
        'text':'Hello world!'
    })
})


app.listen(process.env.PORT || 5000);