function myp() {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token')); // ควรจะแสดง token ที่เก็บอยู่
    if (token) {
        let url = "http://localhost:3000/myprofile?token=" + token;
        console.log(url); // ตรวจสอบ URL ว่ามี token หรือไม่
        window.location.href = url;
    } else {
        console.error('Token not found');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Token not found. Please login first.'
        });
    }
}