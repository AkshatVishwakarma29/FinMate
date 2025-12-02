const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const email = 'demo@finmate.com';
        const password = 'password123';

        let user = await User.findOne({ email });
        if (user) {
            console.log('Demo user already exists');
            process.exit();
        }

        user = new User({
            name: 'Demo User',
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        console.log('Demo user created');
        console.log('Email: demo@finmate.com');
        console.log('Password: password123');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedUser();
