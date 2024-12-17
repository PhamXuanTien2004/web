const express = require('express');
const { getHomePage, createAppointment, getAppointments, deleteById, updateByID, getById } = require('../controllers/controller');
const router = express.Router();

// Route trang chủ
router.get('/', getHomePage);

// // Route tạo mới lịch khám
router.post('/appointments', createAppointment);

// // // Route lấy danh sách lịch khám
router.get('/appointments', getAppointments);

// // Route xóa lịch khám
router.delete('/appointments/:id', deleteById);

// // Route xem chi tiết thông tin lịch khám
router.get('/appointments/:id', getById);

router.put('/appointments/:id', updateByID);

module.exports = router;
