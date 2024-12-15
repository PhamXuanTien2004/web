const express = require('express');
const mongoose = require('mongoose');
const appointmentRoutes = require('../src/routers/router');
const path = require('path');
const app = express();
const PORT = 3000;

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Kết nối MongoDB thành công'))
  .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// Phục vụ các file tĩnh từ thư mục 'public'
app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Đảm bảo thư mục public chứa các tệp tĩnh
app.use(express.urlencoded({ extended: true })); // Middleware xử lý form-urlencoded
// Định tuyến
app.use('/api/v1', appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Server chạy trên cổng ${PORT}`);
});