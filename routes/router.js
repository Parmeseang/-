//ระบบ เปลี่ยนpage
const express = require('express')
const router = express.Router()
const Product = require('../model/product')
const GardModel  = require('../model/gard')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true })); // Add this line
const JWT_SECRET = process.env.JWT_SECRET;

// อัพโหลดไฟล
const path = require('path');
const multer = require('multer')

const Storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/products');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, uniqueSuffix + extension);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only images are allowed!'));
    }
};

const upload = multer({
    storage: Storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // จำกัดขนาดไฟล์ 5MB
    fileFilter: fileFilter
});
// ฐานข้อมูลผู้ใช้
const users = [
    { id: 1, username: 'boss', password: 'sj1112', role: 'user' },
    { id: 2, username: '2', password: 'sj1112', role: 'user' }
];

// Route สำหรับการล็อกอินและสร้าง JWT
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log('Received username:', username);
    console.log('Received password:', password);

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
    
// Middleware สำหรับตรวจสอบและยืนยัน Token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        console.log(token)
        console.log('ไม่พบ Token ใน header Authorization');
        return res.status(401).json({ message: 'ไม่พบ Token ใน header Authorization' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // เก็บข้อมูลผู้ใช้ที่ถูก decode จาก token ไว้ใน req.user
        console.log('Token verified:', decoded);
        next(); // ผ่าน middleware ไปต่อ
    } catch (error) {
        console.log('การยืนยันตัวตนล้มเหลว:', error.message);
        // ดัก error ที่เกิดขึ้นจากการ verify token ที่ไม่ถูกต้อง
        return res.status(401).json({ message: 'การยืนยันตัวตนล้มเหลว. Token ไม่ถูกต้องหรือหมดอายุ' });
    }
};

router.get('/myprofile', authenticateToken, (req, res) => {
    console.log('Authenticated user:', req.user);
    const user = users.find(u => u.id === req.user.userId);

    if (user) {
        res.json({ userProfile: user });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
// router.get('/myprofile',(req, res) => {
//     res.render('myprofile')
// });

// กำหนดเส้นทางสำหรับการอัพโหลดไฟล์
router.post('/insert', upload.single('img'), (req, res) => {
    console.log(req.body);
    if (!req.file) {
        return res.status(400).send({ message: 'Please upload a file!' });
    }
    
    console.log(req.file.filename);
    let raw = new Product({
        name: req.body.name,
        warp: req.body.warp,
        img: req.file.filename,
        gender: req.body.gender,
        age: req.body.age,
        university: req.body.university,
        group: req.body.group,
        ds: req.body.ds
    });
    
    console.log(raw);
    Product.saveProduct(raw, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: 'Error saving product' });
        }
        res.redirect('/');
    });
});
router.post('/ingard', (req, res) => {

    console.log(req.body);
    let raw = new GardModel({
        name: req.body.name,
        comment: req.body.cm
    });
    
    console.log(raw);
    GardModel.savegard(raw, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: 'Error saving gard' });
        }
        res.redirect('/');
    });
});

router.get('/', async (req, res) => {
    try {
        // Aggregation Pipeline เพื่อแยกกลุ่มข้อมูล
        const data1 = await Product.aggregate([
            {
                $group: {
                    _id: '$university',
                    total: { $sum: 1 }
                }
            }
        ]).catch(err => { throw new Error('Error aggregating data1: ' + err.message); });

        const data2 = await Product.aggregate([
            {
                $group: {
                    _id: '$group',
                    total: { $sum: 1 }
                }
            }
        ]).catch(err => { throw new Error('Error aggregating data2: ' + err.message); });

        const gardData = await GardModel.find({}).catch(err => { throw new Error('Error finding gardData: ' + err.message); });

        // ส่งข้อมูลไปยัง template
        console.log(data1, data2, gardData);
        res.render('index', { data1, data2, data: gardData });
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).send('Error occurred while fetching data');
    }
});


router.get('/create',(req,res)=>{
 
    res.render('create')
})
router.get('/login',(req,res)=>{
 
    res.render('login')
})
router.get('/profileroom',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('profileroom',{product:doc})
      })
})
router.get('/edit',(req,res)=>{
 
    res.render('edit')
})
router.get('/gard',(req,res)=>{
 
    res.render('gard')
})

module.exports = router
