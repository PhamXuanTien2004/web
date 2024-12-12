const mongoose = require('mongoose');

// Định nghĩa schema cho cuộc hẹn
const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sex: { type: String, required: true },
    phone_number: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    doctor: { type: String, required: true },
    time: { type: String, required: true },
    appointment_date: { type: Date, required: true }
});

// Tạo model từ schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
