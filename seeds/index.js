const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "61a87f0b95399e130f41b90b",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam quo sit illo repellat non harum quia dolorem ipsum! Porro eaque harum quos explicabo, debitis voluptatum nobis quam quisquam animi repellat.',
            price,
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            },
            images: [ { url:
                'https://res.cloudinary.com/dv7ir4yrz/image/upload/v1638749537/YelpCamp/k8wzxt94mis8akark04m.jpg',
               filename: 'YelpCamp/k8wzxt94mis8akark04m' },
             { url:
                'https://res.cloudinary.com/dv7ir4yrz/image/upload/v1638749537/YelpCamp/iuaxl4cjdw8pypeyndpw.jpg',
               filename: 'YelpCamp/iuaxl4cjdw8pypeyndpw' } ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});