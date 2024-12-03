const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment"); // Import model Appointment

// Lấy danh sách lịch khám
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find(); // Dùng Mongoose để truy vấn
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Thêm lịch khám mới
router.post("/", async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body); // Tạo một đối tượng Appointment mới từ dữ liệu client gửi lên
        await newAppointment.save(); // Lưu vào MongoDB
        res.status(201).json({ message: "Lịch khám đã được thêm!", id: newAppointment._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Xóa lịch khám
router.delete("/:id", async (req, res) => {
    try {
        const result = await Appointment.deleteOne({ _id: req.params.id }); // Xóa bằng Mongoose
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Không tìm thấy lịch khám!" });
        } else {
            res.json({ message: "Lịch khám đã bị xóa!" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
