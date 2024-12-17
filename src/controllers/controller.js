const Booking = require('../models/Booking');

const path = require('path');


// Tạo mới lịch khám
const createAppointment = async (req, res) => {
    try {
        const { name, sex, phone_number, date_of_birth, doctor, time, appointment_date } = req.body;

        // Chuyển đổi các trường ngày tháng thành đối tượng Date
        const formattedDateOfBirth = new Date(date_of_birth);
        const formattedAppointmentDate = new Date(appointment_date);

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
        const appointments = await Booking.find();
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

// Sửa thông tin theo ID
const updateByID = async (req, res) => {
    try {
        const id = req.params.id;
        let data = await Booking.findById(id);
        if (!data) {
            return res.status(404).json({ message: 'Không tìm thấy lịch cần sửa.' });
        }
        data.name = req.body.name;
        // Tìm lịch khám theo ID và cập nhật thông tin
        const booking = await Booking.findByIdAndUpdate(id, data, { new: true });

        // sửa thông tin nếu muốn
        res.status(200).json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra l��i khi sửa dữ liệu.' });
    }
};


// Lấy thông tin theo ID
const getById = async (req, res) => {
    try {
        const id = req.params.id;
        let data = await Booking.findById(id);
        if (!data) {
            return res.status(404).json({ message: 'Không tìm thấy lịch cần sửa.' });
        }
        // sửa thông tin nếu muốn
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra l��i khi sửa dữ liệu.' });
    }
};

// Trang chủ
const getHomePage = (req, res) => {
    // Xu lý logic
    return res.sendFile(path.join(__dirname, '../../public/index.html'));
};

module.exports = {
    createAppointment,
    getAppointments,
    deleteById,
    getHomePage,
    updateByID,
    getById
};
