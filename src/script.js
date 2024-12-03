// Hàm để lấy dữ liệu lịch khám và hiển thị trong bảng
async function fetchAppointments() {
    try {
        const response = await fetch('/api/appointments');
        const appointments = await response.json();

        // Hiển thị dữ liệu ngay lập tức khi nhận được
        renderAppointments(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

// Hàm để xóa một lịch khám theo ID
async function deleteAppointment(appointmentId) {
    try {
        const response = await fetch(`/api/appointments/${appointmentId}`, {
            method: 'DELETE',
        });

        const result = await response.json();
        alert(result.message); // Hiển thị thông báo từ server

        if (response.ok) {
            // Đồng bộ lại bảng ngay sau khi xóa thành công
            fetchAppointments();
        }
    } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Không thể xóa lịch hẹn!');
    }
}

// Hàm hiển thị danh sách lịch hẹn vào bảng
function renderAppointments(appointments) {
    const tbody = document.querySelector("#appointmentTable tbody");
    tbody.innerHTML = ''; // Xóa dữ liệu cũ

    appointments.forEach((appointment, index) => {
        const tr = document.createElement("tr");
        tr.id = `appointment-${appointment._id}`; // Gán ID duy nhất cho dòng

        tr.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.sex}</td>
            <td>${appointment.phone_number}</td>
            <td>${new Date(appointment.date_of_birth).toLocaleDateString()}</td>
            <td>${appointment.doctor}</td>
            <td>${appointment.time}</td>
            <td>${new Date(appointment.date).toLocaleDateString()}</td>
            <td><button onclick="deleteAppointment('${appointment._id}')">XÓA</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Gọi hàm để lấy dữ liệu khi trang được tải
window.onload = fetchAppointments;
