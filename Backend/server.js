require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const BrainSomethingRoutes = require('./routes/reactionRecord');

// express app
const app = express()

// middleware
app.use(express.json())

// middleware for logging requests
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/reaction', BrainSomethingRoutes)

//connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () =>  {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })



