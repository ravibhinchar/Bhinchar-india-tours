const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Tour = require('./models/tourModel');

dotenv.config();
connectDB();

const tours = [
    {
        title: "Royal Heritage of Kumbhalgarh",
        destination: "Kumbhalgarh",
        price: 750,
        duration: "7D/6N",
        category: "palace",
        image: "assets/images/Kumbhalgarh-Fort-Udaipur.jpg",
        description: "Majestic walls rise high, guarding stories of strength and honor, where every stone holds a legacy of valor. Kumbhalgarh Fort stands proud, timeless and unyielding.",
        highlights: ["Historic Fort View", "Guided Tour", "Local Cuisine"],
        featured: true
    },
    {
        title: "Golden Desert Safari: Jaisalmer",
        destination: "Jaisalmer",
        price: 520,
        duration: "5D/4N",
        category: "desert",
        image: "assets/images/fort-jaisalmer.jpg",
        description: "Golden ramparts, timeless tales etched in sandstone majesty — wonder, history, and echoes of valor converge. Behold, Jaisalmer Fort, a citadel of dreams!",
        highlights: ["Camel Safari", "Camping under Stars", "Folk Dance"],
        featured: true
    },
    {
        title: "Spiritual Retreat at Mount Abu",
        destination: "Mount Abu",
        price: 660,
        duration: "4D/3N",
        category: "spiritual",
        image: "assets/images/Dilwara-Jain-Temples-Mount-Abu.jpg",
        description: "Calm and pure, the temple stands tall, where every stone tells a story of faith and beauty. Dilwara Jain Temple is a place of peace and wonder.",
        highlights: ["Temple Visit", "Lake Boating", "Sunset Point"],
        featured: true
    },
    {
        title: "Pink City Heritage Extravaganza",
        destination: "Jaipur",
        price: 850,
        duration: "6D/5N",
        category: "heritage",
        image: "assets/images/Hawa-Mahal-Rajasthan-Feature.jpg",
        description: "Explore the bustling streets and magnificent palaces of Jaipur, the iconic Pink City. Immerse yourself in the rich culture and vibrant bazaars.",
        highlights: ["Hawa Mahal", "Amer Fort", "Shopping"],
        featured: true
    },
    {
        title: "Lakes & Luxury in Udaipur",
        destination: "Udaipur",
        price: 950,
        duration: "5D/4N",
        category: "palace",
        image: "assets/images/Pichola-lake-in-Udaipur.jpg",
        description: "Experience the ultimate romance in the City of Lakes. Enjoy tranquil boat rides on Lake Pichola surrounded by majestic palaces.",
        highlights: ["Lake Boat Ride", "City Palace", "Luxury Stay"],
        featured: true
    },
    {
        title: "Bikaner Royal Architecture Tour",
        destination: "Bikaner",
        price: 600,
        duration: "4D/3N",
        category: "heritage",
        image: "assets/images/Rampuria-Haveli-Bikaner.jpg",
        description: "Discover the architectural marvels of Bikaner, famous for its grand havelis and intricate carvings that whisper tales of a bygone era.",
        highlights: ["Rampuria Haveli", "Desert Culture", "Local Sweets"],
        featured: false
    }
];

const importData = async () => {
    try {
        await Tour.deleteMany(); // Clear existing tours
        await Tour.insertMany(tours);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    // destroyData();
} else {
    importData();
}
