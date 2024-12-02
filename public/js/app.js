// Hàm để lấy dữ liệu lịch khám và hiển thị trong bảng
async function fetchAppointments() {
    try {
        const response = await fetch('/api/appointments');
        const appointments = await response.json();

        // Lấy phần tbody của bảng
        const tableBody = document.querySelector('#appointmentTable tbody');
        tableBody.innerHTML = ''; // Xóa hết dữ liệu cũ trong tbody

        // Thêm từng lịch khám vào bảng
        appointments.forEach((appointment, index) => {
            const row = document.createElement('tr');

            // Tạo các ô dữ liệu cho mỗi cột
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${appointment.name}</td>
                <td>${appointment.sex}</td>
                <td>${appointment.phone_number}</td>
                <td>${new Date(appointment.date_of_birth).toLocaleDateString()}</td>
                <td>${appointment.doctor}</td>
                <td>${appointment.time}</td>
                <td>${new Date(appointment.date).toLocaleDateString()}</td>
            `;

            // Thêm hàng vào tbody
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}



// Gọi hàm để lấy dữ liệu khi trang được tải
window.onload = fetchAppointments;
