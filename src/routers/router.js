const express = require('express');
const { getHomePage, createAppointment, getAppointments, deleteById } = require('../controllers/controller');
const router = express.Router();

// Route trang chủ
router.get('/', getHomePage);

// // Route tạo mới lịch khám
router.post('/appointments', createAppointment);

// // // Route lấy danh sách lịch khám
// router.get('/appointments', getAppointments);

// // Route xóa lịch khám
// router.delete('/appointments/:id', deleteById);

module.exports = router;
