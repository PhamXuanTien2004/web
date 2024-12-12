const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/pxt_hospital', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Failed to connect MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
