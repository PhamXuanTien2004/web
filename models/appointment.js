const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const { getDatabase } = require("../db");

// Lấy danh sách lịch khám
router.get("/", async (req, res) => {
    try {
        const db = getDatabase();
        const appointments = await db.collection("appointments").find({}).toArray();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Thêm lịch khám mới
router.post("/", async (req, res) => {
    try {
        const db = getDatabase();
        const newAppointment = req.body;
        const result = await db.collection("appointments").insertOne(newAppointment);
        res.status(201).json({ message: "Lịch khám đã được thêm!", id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Xóa lịch khám
router.delete("/:id", async (req, res) => {
    const { ObjectId } = require("mongodb");
    try {
        const db = getDatabase();
        const id = req.params.id;
        const result = await db.collection("appointments").deleteOne({ _id: new ObjectId(id) });
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
