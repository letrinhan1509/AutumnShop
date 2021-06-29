const express = require('express');
const router = express.Router();

const db = require('../models/database');
const modelDiscount = require('../models/model_discount');


            // API GET
    // Danh sách tất cả các khuyến mãi:
router.get('/', async function(req, res) { 
    try {
        let list = await modelDiscount.list_Discounts();
        res.status(200).json({ "status": "Success", "discount": list });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "error": error })
    }
});
    // Danh sách tất cả các voucher:
router.get('/voucher', async function(req, res) { 
    try {
        let list = await modelDiscount.list_Discounts();
        res.status(200).json({ "status": "Success", "voucher": list });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "error": error })
    }
});


// API POST:
// Thêm voucher:
router.post('/them-voucher', async function(req, res) {
    let tenkm = req.body.tenkm;
    let dieukien = req.body.dieukien;
    let giagiam = req.body.giagiam;
    let ghichu = req.body.ghichu;
    let ngaybd = req.body.ngaybd;
    let ngaykt = req.body.ngaykt;
    console.log(req.body);
    console.log(ngaybd);
});


module.exports = router;