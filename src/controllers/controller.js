const Booking = require('../models/Booking');
const path = require('path');

// Tạo mới lịch khám
const createAppointment = async (req, res) => {
    try {
        // Lấy dữ liệu từ body của request
        const { name, sex, phone_number, date_of_birth, doctor, time, appointment_date } = req.body;

        // Kiểm tra xem tất cả các trường có được cung cấp đầy đủ hay không
        if (!name || !sex || !phone_number || !date_of_birth || !doctor || !time || !appointment_date) {
            return res.status(400).json({ error: "Vui lòng cung cấp đầy đủ thông tin." });
        }

        // Chuyển đổi các trường ngày tháng thành đối tượng Date
        const formattedDateOfBirth = new Date(date_of_birth);
        const formattedAppointmentDate = new Date(appointment_date);

        // Kiểm tra nếu các ngày không hợp lệ
        if (isNaN(formattedDateOfBirth) || isNaN(formattedAppointmentDate)) {
            return res.status(400).json({ error: "Ngày sinh hoặc ngày khám không hợp lệ." });
        }
        else if (formattedDateOfBirth >= formattedAppointmentDate) {
            return res.status(400).json({ error: "Ngày sinh phải trước ngày khám." });
        }

        // Tạo một đối tượng Booking mới từ dữ liệu người dùng
        const newBooking = new Booking({
            name,
            sex,
            phone_number,
            date_of_birth: formattedDateOfBirth,
            doctor,
            time,
            appointment_date: formattedAppointmentDate,
        });

        // Lưu thông tin vào MongoDB
        await newBooking.save();

        // Trả về thông báo thành công
        res.status(201).json({ message: "Lịch khám đã được tạo thành công." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Đã có lỗi xảy ra. Vui lòng thử lại!" });
    }
};

// Lấy tất cả lịch khám
const getAppointments = async (req, res) => {
    try {
        const appointments = await Book.find();
        console.log('Appointments:', appointments);
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi tải danh sách lịch khám." });
    }
};

// Xóa lịch khám theo ID
const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy lịch cần xóa.' });
        }

        res.json({ message: 'Xóa thành công.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi xóa dữ liệu.' });
    }
};

// Trang chủ
const getHomePage = (req, res) => {
    // Xu lý logic
    return res.sendFile(path.join(__dirname, '../../public/index.html'));
};

module.exports = {
    createAppointment,
    // getAppointments,
    // deleteById,
    getHomePage
};
