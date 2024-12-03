const mongoose = require('mongoose');

// Định nghĩa schema cho cuộc hẹn
const appointmentSchema = new mongoose.Schema({
    name: String,
    sex: String,
    phone_number: String,
    date_of_birth: Date,
    doctor: String,
    time: String,
    date: Date,
});

// Tạo model từ schema
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
