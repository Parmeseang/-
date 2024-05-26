const mongoose = require('mongoose');

// เชื่อม MongoDB
const dburl = 'mongodb://localhost:27017/productDB';
mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});


// ออกแบบ schema
let productSchema = new mongoose.Schema({
    img: String,
    name: String,
    gender: String,
    age: Number,
    university: String,
    group: String,
    ds: String,
    warp: String
});

// สร้างโมเดล
let Product = mongoose.model("Product", productSchema);

// ส่งออก
module.exports = Product;

// บันทึกข้อมูล
module.exports.saveProduct = function(data, callback) {
    let product = new Product(data);
    product.save(callback);
};
