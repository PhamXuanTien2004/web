// Lắng nghe sự kiện click trên các liên kết
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Ngừng hành động mặc định của liên kết

        // Cuộn mượt mà đến phần tử tương ứng
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function saveData() {
    // Lấy dữ liệu từ các trường nhập liệu
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone_number").value.trim();
    const birthDate = document.getElementById("date_of_birth").value;
    const doctor = document.getElementById("dropdown").value;
    const time = document.getElementById("time_book").value;
    const dateBook = document.getElementById("date_book").value;
    const gender = document.querySelector('input[name="sex"]:checked')?.value || "Không xác định";

    // Kiểm tra nếu chưa nhập đủ thông tin
    if (!name || !phone || !birthDate || !doctor || !time || !dateBook) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    // Hiển thị dữ liệu
    const resultText = `
        <strong>Họ và tên:</strong> ${name}<br>
        <strong>Giới tính:</strong> ${gender}<br>
        <strong>Số điện thoại:</strong> ${phone}<br>
        <strong>Ngày tháng năm sinh:</strong> ${birthDate}<br>
        <strong>Bác sĩ đã chọn:</strong> ${doctor}<br>
        <strong>Thời gian khám:</strong> ${time}<br>
        <strong>Lịch khám:</strong> ${dateBook}
    `;

    // Hiển thị kết quả trong phần #result
    const resultDiv = document.getElementById("result");
    const displayData = document.getElementById("displayData");

    displayData.innerHTML = resultText;
    resultDiv.style.display = "block";
}

// Hàm để lưu dữ liệu form và gửi tới server
function saveData() {
    // Lấy giá trị từ các input trong form
    const name = document.getElementById("name").value;
    const sex = document.querySelector('input[name="sex"]:checked') ? document.querySelector('input[name="sex"]:checked').value : '';
    const phone_number = document.getElementById("phone_number").value;
    const date_of_birth = document.getElementById("date_of_birth").value;
    const doctor = document.getElementById("dropdown").value;
    const time = document.getElementById("time_book").value;
    const date = document.getElementById("date_book").value;

    // Tạo một đối tượng chứa dữ liệu từ form
    const appointmentData = {
        name,
        sex,
        phone_number,
        date_of_birth,
        doctor,
        time,
        date,
    };

    // Gửi dữ liệu tới API server qua HTTP POST
    fetch("/api/appointments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData), // Chuyển đổi đối tượng thành JSON
    })
    .then(response => response.json()) // Nếu server trả về JSON
    .then(data => {
        alert("Appointment saved successfully!"); // Thông báo lưu thành công
    })
    .catch(error => {
        console.error("Error:", error); // Log lỗi nếu có
        alert("There was an error saving the appointment.");
    });
}
