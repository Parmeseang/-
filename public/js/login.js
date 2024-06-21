const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// คีย์ลับสำหรับการเซ็นและยืนยัน JWT
const JWT_SECRET = 'your_jwt_secret_key';

// ตัวอย่างฐานข้อมูลผู้ใช้ (ในแอปจริง ๆ ควรเป็นฐานข้อมูลที่แท้จริง)
const users = [
    { id: 1, username: 'user1', password: 'password1', role: 'user' },
    { id: 2, username: 'admin', password: 'admin123', role: 'admin' }
];

// เส้นทางสำหรับการยืนยันตัวตนผู้ใช้และสร้าง JWT
app.post('/login', (req, res) => {
    // สมมติว่ามีการส่ง username และ password มาใน request body
    const { username, password } = req.body;

    // ค้นหาข้อมูลผู้ใช้ในฐานข้อมูล
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'การยืนยันตัวตนล้มเหลว. ไม่พบผู้ใช้งาน.' });
    }

    // สร้าง JWT พร้อมข้อมูลผู้ใช้
    const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    // ส่ง JWT กลับเป็น response
    res.json({ token });
});

// เส้นทางที่ปกป้อง (Protected route) (ต้องการ JWT สำหรับการเข้าถึง)
app.get('/profile', verifyToken, (req, res) => {
    // ถ้า JWT ถูกต้อง, คุณสามารถเข้าถึงข้อมูลผู้ใช้จาก req.user
    res.json({ user: req.user });
});

// Middleware สำหรับการตรวจสอบ JWT
function verifyToken(req, res, next) {
    // รับ JWT จาก headers ของ request
    const token = req.headers['authorization'];

    // ตรวจสอบว่ามีการส่ง JWT มาหรือไม่
    if (!token) {
        return res.status(403).json({ message: 'จำเป็นต้องมี Token สำหรับการยืนยันตัวตน.' });
    }

    try {
        // ยืนยัน JWT
        const decoded = jwt.verify(token, JWT_SECRET);
        // แนบข้อมูลผู้ใช้ที่ถอดรหัสได้ใน req.user
        req.user = decoded;
        next(); // ไปยัง middleware ต่อไป
    } catch (error) {
        return res.status(401).json({ message: 'การยืนยันตัวตนล้มเหลว. Token ไม่ถูกต้อง.' });
    }
}

// เริ่มต้นเซิร์ฟเวอร์
app.listen(3000, () => {
    console.log('เซิร์ฟเวอร์กำลังทำงานที่ http://localhost:3000');
});
