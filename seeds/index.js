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
    for (let index = 0; index < 300; index++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '65dc0f4340b8f34229aee8db',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dmx4ahlac/image/upload/v1708834134/YelpCamp/atza29jeguvjggbdwgkb.png',
                    filename: 'YelpCamp/atza29jeguvjggbdwgkb'
                }
            ],
            geometry: { 
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                     cities[random1000].latitude
                    ] 
            },
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