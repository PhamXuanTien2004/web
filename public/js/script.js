document.getElementById('bookingForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  // Lấy giá trị của các trường input
  const sexInput = document.querySelector('input[name="sex"]:checked');

  const formData = {
    name: document.getElementById("name")?.value.trim() || '',
    sex: sexInput?.value || '',
    phone_number: document.getElementById("phone_number")?.value.trim() || '',
    date_of_birth: document.getElementById("dob")?.value || '',
    doctor: document.getElementById("doctor")?.value || '',
    time: document.getElementById("time")?.value || '',
    appointment_date: document.getElementById("appointment_date")?.value || '',
  };

  // Hiển thị thông tin để kiểm tra
  console.log("Dữ liệu form gửi đi:", formData);

  // Kiểm tra dữ liệu trước khi gửi
  if (Object.values(formData).some(value => !value)) {
    alert("Vui lòng điền đầy đủ thông tin.");
    return;
  }

  try {
    // Gửi yêu cầu POST để thêm lịch khám mới
    const response = await fetch('/api/v1/appointments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Lịch khám đã được thêm thành công.");
      document.getElementById("bookingForm").reset();
      await fetchAppointments();  // Kiểm tra xem hàm này có hoạt động bình thường không.
    } else {
      console.error("Lỗi từ máy chủ:", result);
      alert(`Lỗi: ${result.error || "Không thể thêm lịch khám."}`);
    }
  } catch (error) {
    console.error("Lỗi trong quá trình gọi API:", error);
    alert("Đã có lỗi xảy ra khi gửi yêu cầu.");
  }

});



// Hàm lấy danh sách lịch khám
// async function fetchAppointments() {
//   try {
//     const appointmentsResponse = await fetch('/api/v1/appointments');
//     if (!appointmentsResponse.ok) {
//       throw new Error(`HTTP Error! status: ${appointmentsResponse.status}`);
//     }
//     const appointments = await appointmentsResponse.json();

//     const tableBody = document.querySelector('.appointmentTable tbody');
//     tableBody.innerHTML = ''; // Xóa nội dung bảng cũ

//     appointments.forEach((appointment, index) => {
//       const row = `
//         <tr data-id="${appointment._id}">
//             <td>${index + 1}</td>
//             <td>${appointment.name}</td>
//             <td>${appointment.doctor}</td>
//             <td>${new Date(appointment.appointment_date).toLocaleDateString('vi-VN')}</td>
//             <td>
//               <button class="delete-btn">Xóa</button>
//               <button class="update-btn">Sửa</button>
//             </td>
//         </tr>
//       `;
//       tableBody.innerHTML += row;
//     });
//     addEventListeners(); // Gọi lại hàm thêm sự kiện cho các nút
//   } catch (error) {
//     console.error('Lỗi khi lấy danh sách lịch khám:', error);
//     alert('Đã xảy ra lỗi khi tải danh sách lịch khám.');
//   }
// }


// // Hàm thêm sự kiện cho nút Xóa và Sửa
// function addEventListeners() {
//   const deleteButtons = document.querySelectorAll('.delete-btn');
//   deleteButtons.forEach((button) => {
//     button.addEventListener('click', async function () {
//       const appointmentId = this.closest('tr').dataset.id;

//       // Xác nhận hành động xóa
//       if (confirm("Bạn có chắc chắn muốn xóa lịch khám này?")) {
//         await deleteAppointment(appointmentId);
//       }
//     });
//   });

//   const updateButtons = document.querySelectorAll('.update-btn');
//   updateButtons.forEach((button) => {
//     button.addEventListener('click', async function () {
//       const appointmentId = this.closest('tr').dataset.id;
//       const appointment = await getAppointmentById(appointmentId);
//       if (appointment) {
//         populateForm(appointment); // Điền dữ liệu vào biểu mẫu
//       }
//     });
//   });
// }

// // Hàm lấy thông tin lịch khám theo ID
// async function getAppointmentById(id) {
//   try {
//     const response = await fetch(`/api/v1/appointments/${id}`);
//     if (response.ok) {
//       return await response.json();
//     }
//     alert("Không tìm thấy lịch khám.");
//     return null;
//   } catch (error) {
//     console.error("Lỗi khi lấy thông tin lịch khám:", error);
//     return null;
//   }
// }

// // Hàm điền thông tin vào biểu mẫu
// async function populateForm(appointment) {
//   document.getElementById("name").value = appointment.name;
//   document.querySelector(`input[name="sex"][value="${appointment.sex}"]`).checked = true;
//   document.getElementById("phone_number").value = appointment.phone_number;
//   document.getElementById("dob").value = appointment.date_of_birth.split("T")[0];
//   document.getElementById("doctor").value = appointment.doctor;
//   document.getElementById("time").value = appointment.time;
//   document.getElementById("appointment_date").value = appointment.appointment_date.split("T")[0];
// }

// // Hàm xóa lịch khám
// async function deleteAppointment(id) {
//   try {
//     const response = await fetch(`/api/v1/appointments/${id}`, {
//       method: 'DELETE',
//     });

//     const result = await response.json();
//     alert(result.message);

//     if (response.ok) {
//       // Xóa dòng khỏi bảng
//       const rowToDelete = document.querySelector(`tr[data-id="${id}"]`);
//       if (rowToDelete) {
//         rowToDelete.remove();
//       }
//     }
//   } catch (error) {
//     console.error('Lỗi khi xóa:', error);
//     alert('Không thể xóa lịch khám. Vui lòng thử lại.');
//   }
// }