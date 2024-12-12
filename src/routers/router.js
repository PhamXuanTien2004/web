const express = require('express');
const { createAppointment, getAppointments, deleteAppointment } = require('../controllers/bookingController');
const homeController = require('../controllers/homeController');
const router = express.Router();

// Route trang chủ
router.get('/', homeController.getHomePage);

// Route tạo mới lịch khám
router.post('/appointment', createAppointment);

// Route lấy danh sách lịch khám
router.get('/appointments', getAppointments);

// Route xóa lịch khám
router.delete('/appointment/:id', deleteAppointment);

module.exports = router;
