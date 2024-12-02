const express = require("express");
const bodyParser = require("body-parser");
const appointmentsRouter = require("./models/appointments.js");
const PORT = 3000;
const path = require("path");
const mongoose = require('mongoose');

const app = express();

app.use(express.json()); // Middleware để parse JSON

// Middleware để phục vụ static files từ thư mục "public"
app.use(express.static(path.join(__dirname, "public")));

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/pxt_hospital', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});

// Routes
app.use("/api/appointments", appointmentsRouter);

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to PXT Hospital API");
});

const Appointment = require("./models/appointment");  // Import Model

// Route để nhận dữ liệu và lưu vào MongoDB
app.post("/models/appointments", async (req, res) => {
    try {
        // Lấy dữ liệu từ body của request
        const { name, sex, phone_number, date_of_birth, doctor, time, date } = req.body;

        // Tạo một appointment mới từ dữ liệu nhận được
        const newAppointment = new Appointment({
            name,
            sex,
            phone_number,
            date_of_birth,
            doctor,
            time,
            date,
        });

        // Lưu appointment vào MongoDB
        await newAppointment.save();

        // Trả về response khi lưu thành công
        res.status(201).send("Appointment saved successfully!");
    } catch (err) {
        res.status(500).send("Error saving appointment: " + err.message);
    }
});

fetch("/models/appointments", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify("appointment.js")  // Dữ liệu từ form
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error("Error:", error);
});


// Start server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
