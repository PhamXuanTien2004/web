const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./db"); // Import connectDB từ file db.js
const appointmentsRouter = require("./router/appointments.js");
const Appointment = require("./models/appointment"); // Import model Appointment
const app = express();
const PORT = 3000;

// Kết nối MongoDB qua db.js
connectDB();

// Cấu hình thư mục public để phục vụ file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Middleware để parse JSON
app.use(express.json());

// Routes
app.use("/api/appointments", appointmentsRouter);

// Home route (trả về trang HTML)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // Chỉ định đường dẫn tệp HTML
});

app.use('/js', express.static(path.join(__dirname, 'public/js'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));


// Route để nhận dữ liệu và lưu vào MongoDB
app.post("/api/appointments", async (req, res) => {
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

// Start server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
