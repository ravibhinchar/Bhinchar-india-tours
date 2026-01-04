const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Tour = require('./models/tourModel');

dotenv.config();
connectDB();

const tours = [
    {
        title: "Experience The Great Holiday On Kumbhalgarh-Fort-Udaipur",
        destination: "Kumbhalgarh",
        price: 750,
        duration: "7D/6N",
        image: "assets/images/Kumbhalgarh-Fort-Udaipur.jpg",
        description: "Majestic walls rise high, guarding stories of strength and honor, where every stone holds a legacy of valor. Kumbhalgarh Fort stands proud, timeless and unyielding.",
        featured: true
    },
    {
        title: "Winter holiday to the Jaisalmer Fort",
        destination: "Jaisalmer",
        price: 520,
        duration: "7D/6N",
        image: "assets/images/fort-jaisalmer.jpg",
        description: "Golden ramparts, timeless tales etched in sandstone majesty — wonder, history, and echoes of valor converge. Behold, Jaisalmer Fort, a citadel of dreams!",
        featured: true
    },
    {
        title: "Dilwara Temple's Sacred Getaway",
        destination: "Mount Abu",
        price: 660,
        duration: "7D/6N",
        image: "assets/images/Dilwara-Jain-Temples-Mount-Abu.jpg",
        description: "Calm and pure, the temple stands tall, where every stone tells a story of faith and beauty. Dilwara Jain Temple is a place of peace and wonder.",
        featured: true
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
