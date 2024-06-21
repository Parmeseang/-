const mongoose = require('mongoose');

// เชื่อม MongoDB
const dburl2 = 'mongodb://localhost:27017/gardmsg';
const connection2 = mongoose.createConnection(dburl2, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connection2.on('connected', () => {
    console.log('Connected to MongoDB2');
});

connection2.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

// ออกแบบ schema
let gardSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// สร้างโมเดล
let GardModel = connection2.model("massage", gardSchema);

// ส่งออก
module.exports = GardModel;

// บันทึกข้อมูล
module.exports.savegard = function(data, callback) {
    let gard = new GardModel(data);
    gard.save(callback);
};
