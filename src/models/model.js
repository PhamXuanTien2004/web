const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    doctor: { type: String, required: true },
    appointmentTime: { type: String, required: true },
    appointmentDate: { type: Date, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);
