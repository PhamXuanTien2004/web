const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); // Đảm bảo rằng bạn đã import 'path' để sử dụng cho static files
const connectDB = require("./db"); // Import connectDB từ file db.js
const appointmentsRouter = require("./router/appointments.js");
const Appointment = require("./models/appointment"); // Import model Appointment

const app = express();
const PORT = 3000;

// Kết nối MongoDB qua db.js
connectDB();

// Middleware để parse JSON và phục vụ static files
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Static files từ thư mục "public"

// Routes
app.use("/api/appointments", appointmentsRouter);

// Home route (trả về trang HTML)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Chỉ định đường dẫn tệp HTML
});

// Route để nhận dữ liệu và lưu vào MongoDB
app.post("/models/appointments", async (req, res) => {
    try {
        const { name, sex, phone_number, date_of_birth, doctor, time, date } = req.body;
        const newAppointment = new Appointment({
            name,
            sex,
            phone_number,
            date_of_birth,
            doctor,
            time,
            date,
        });

        await newAppointment.save();
        res.status(201).send("Appointment saved successfully!");
    } catch (err) {
        res.status(500).send("Error saving appointment: " + err.message);
    }
});

// Lấy danh sách lịch khám
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find({}); // Lấy tất cả các cuộc hẹn
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
