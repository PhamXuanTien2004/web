const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('../config/db');
const router = require('./routers/router');

// Kết nối MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.static('public')); // Đảm bảo rằng thư mục public chứa các tệp tĩnh như CSS, JS
app.use('/api/v1', router);



// Khai báo thư mục tĩnh, nếu chưa có
app.use(express.static(path.join(__dirname, '../public'))); // Đảm bảo thư mục public chứa các tệp tĩnh

// Khai báo route chính cho trang chủ
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));  // Đảm bảo file index.html được trả về từ thư mục public
});

//router
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


module.exports = app;