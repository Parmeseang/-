//ระบบ เปลี่ยนpage
const express = require('express')
const router = express.Router()
const Product = require('../model/product')
// อัพโหลดไฟล
const path = require('path');
const multer = require('multer')

// const Storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'./public/images/products')
//     },
//     filename:function(req,file,cb){
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const extension = path.extname(file.originalname);
//         cb(null, uniqueSuffix + extension);
//     }
// })

// const upload = multer({
//     storage:Storage
// })

router.get('/',(req,res)=>{
 
    res.render('index')
})

router.get('/create',(req,res)=>{
 
    res.render('create')
})
router.get('/myprofile',(req,res)=>{
 
    res.render('myprofile')
})
router.get('/profileroom',(req,res)=>{
 
    res.render('profileroom')
})
router.get('/edit',(req,res)=>{
 
    res.render('edit')
})

module.exports = router
