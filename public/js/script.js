// Biến toàn cục lưu trữ tham chiếu đến các phần tử DOM
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone_number");
const birthDateInput = document.getElementById("date_of_birth");
const doctorDropdown = document.getElementById("dropdown");
const timeInput = document.getElementById("time_book");
const dateInput = document.getElementById("date_book");
const resultDiv = document.getElementById("result");
const displayData = document.getElementById("displayData");

// Hàm hiển thị dữ liệu người dùng nhập
function displayFormData() {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const birthDate = birthDateInput.value;
    const doctor = doctorDropdown.value;
    const time = timeInput.value;
    const dateBook = dateInput.value;
    const gender = document.querySelector('input[name="sex"]:checked')?.value || "Không xác định";

    // Kiểm tra nếu thiếu thông tin
    if (!name || !phone || !birthDate || !doctor || !time || !dateBook) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    // Hiển thị thông tin
    displayData.innerHTML = `
        <strong>Họ và tên:</strong> ${name}<br>
        <strong>Giới tính:</strong> ${gender}<br>
        <strong>Số điện thoại:</strong> ${phone}<br>
        <strong>Ngày tháng năm sinh:</strong> ${birthDate}<br>
        <strong>Bác sĩ đã chọn:</strong> ${doctor}<br>
        <strong>Thời gian khám:</strong> ${time}<br>
        <strong>Lịch khám:</strong> ${dateBook}
    `;
    resultDiv.style.display = "block";
}

// Hàm gửi dữ liệu tới server
function saveAppointment() {
    const name = nameInput.value.trim();
    const sex = document.querySelector('input[name="sex"]:checked')?.value || "Không xác định";
    const phone_number = phoneInput.value.trim();
    const date_of_birth = birthDateInput.value;
    const doctor = doctorDropdown.value;
    const time = timeInput.value;
    const date = dateInput.value;

    // Kiểm tra nếu thiếu thông tin
    if (!name || !phone_number || !date_of_birth || !doctor || !time || !date) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const appointmentData = {
        name,
        sex,
        phone_number,
        date_of_birth,
        doctor,
        time,
        date,
    };

    // Gửi dữ liệu tới API server
    fetch("/api/appointments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
    })
        .then(response => response.json())
        .then(data => {
            alert("Lưu lịch hẹn thành công!"); // Thông báo lưu thành công
            displayFormData(); // Cập nhật giao diện hiển thị
        })
        .catch(error => {
            console.error("Lỗi:", error);
            alert("Không thể lưu lịch hẹn. Vui lòng thử lại.");
        });
}
