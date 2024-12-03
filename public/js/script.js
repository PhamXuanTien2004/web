// Hàm để lấy dữ liệu lịch khám và hiển thị trong bảng
async function fetchAppointments() {
    try {
        const response = await fetch('/api/appointments');
        const appointments = await response.json();

        // Render dữ liệu vào bảng
        renderAppointments(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

// Hàm xóa lịch hẹn theo ID
function deleteAppointment(appointmentId) {
    fetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete appointment");
            }
            return response.json();
        })
        .then(data => {
            alert(data.message); // Hiển thị thông báo xóa thành công
            if (data.message === "Lịch hẹn đã bị xóa!") {
                // Gọi lại fetchAppointments để cập nhật giao diện
                fetchAppointments();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Không thể xóa lịch hẹn!');
        });
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
