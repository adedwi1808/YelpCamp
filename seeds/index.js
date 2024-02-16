const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("Connection Open!!");
    })
    .catch(err => {
        console.error("Fail to Connect");
        console.error(err);
    })

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let index = 0; index < 50; index++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://source.unsplash.com/collections/483251`,
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae assumenda necessitatibus laudantium, illum minima vel eos pariatur inventore debitis delectus aut corporis architecto veniam corrupti veritatis? Nam eum minus saepe.`,
            price: price
        })
        await camp.save()
    }
}

seedDB()
.then(() => {
mongoose.connection.close()
});