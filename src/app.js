const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('../config/db');

// Kết nối MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.static('public')); // Đảm bảo rằng thư mục public chứa các tệp tĩnh như CSS, JS

// Routes cho API
app.use('/api/v1/appointments', require('../src/routers/bookingRouter')); // API xử lý lịch khám

// Khai báo thư mục tĩnh, nếu chưa có
app.use(express.static(path.join(__dirname, '../public'))); // Đảm bảo thư mục public chứa các tệp tĩnh

// Import các routes
const initWebRoute = require('./routers/homeRouters');
initWebRoute(app); // Khởi tạo routes cho trang chủ

// Sử dụng các router cho các chức năng booking và delete
const bookingRouter = require('../src/routers/bookingRouter');
const deleteRouter = require('../src/routers/deleteRouter');

// Đảm bảo sử dụng đúng các tuyến đường
app.use('/api/v1/appointments', bookingRouter);  // Xử lý API cho lịch khám
app.use('/api/v1/appointments', deleteRouter);  // API cho xóa lịch khám (nếu cần)

// Khai báo route chính cho trang chủ
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));  // Đảm bảo file index.html được trả về từ thư mục public
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
