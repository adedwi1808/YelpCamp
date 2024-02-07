const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const { title } = require("process");


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("Connection Open!!");
    })
    .catch(err => {
        console.error("Fail to Connect");
        console.error(err);
    })

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
    console.log("Serving on Port 3000");
});

app.get('/', (req, res) => {
    res.render("home")
});

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: "My Backyard", description: "Great" });
    await camp.save();
    res.send(camp);
});