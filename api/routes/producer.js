var express = require('express');
var router = express.Router();
var db = require('../models/database')
const modelUser = require('../models/model_user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


        // API GET:

// NHÀ SẢN XUẤT THEO ID:
router.get('/nha-sx-id/:id', async function (req, res) {
    try {
        let producerId = req.params.id;
        let producer = await modelProducer.getById(producerId);
        console.log(producer.mansx);
        if(producer == -1){
            res.json({"status": "Success", "message": "Không tìm thấy nhà sản xuất này trong DB!"});
        }else
            res.json({"status": "Success", "data": producer});
    } catch (error) {
        res.json({"status": "Fail", "error": error})
    }
});
// API POST:
    // Thêm nhà sản xuất:
router.post('/api/v1/nha-san-xuat/them', async function(req, res) {
    let producerId = req.body.producerId;
    let name = req.body.name;
    let origin = req.body.origin;
    let data = {
        mansx: producerId,
        tennsx: name,
        xuatxu: origin
    }
    let producer = await modelProducer.getById(producerId);
    try {
        if(producer.mansx == producerId){
            res.json({"status": "Fail", "message": "Đã có mã nhà sản xuất trong DB. Vui lòng nhập mã khác!"});
        }else{
            let query = await modelProducer.insertProducer(data);
            res.json({"status": "Success", "message": "Thêm nhà sản xuất thành công!"});
        }
    } catch (error) {
        res.json({"status": "Fail", "message": "Lỗi cú pháp! Thêm nhà sản xuất không thành công!", "error": error});
    }
});
    // Cập nhật thông tin nhà sản xuất:
router.post('/nha-san-xuat/cap-nhat', async function(req, res) {
    let producerId = req.body.producerId;
    let name = req.body.name;
    let origin = req.body.origin;
    if(producerId == null){
        res.json({"status": "Fail", "message": "Không có id nhà sản xuất!"});
    }
    try {
        let query = await modelProducer.updateProducer(producerId, name, origin);
        res.json({"status": "Success", "message": "Cập nhật nhà sản xuất thành công!"});
    } catch (error) {
        res.json({"status": "Fail", "message": "Lỗi cú pháp! Cập nhật nhà sản xuất không thành công!", "error": error});
    }
});
    // Xoá nhà sản xuất:
router.post('/nha-san-xuat/xoa', async function(req, res) {
    let producerId = req.body.producerId;
    if(producerId == null){
        res.json({"status": "Fail", "message": "Không có id nhà sản xuất!"});
    }
    try {
        let query = await modelProducer.deleteProducer(producerId);
        if(query == 1){
            res.json({"status": "Success", "message": "Xoá nhà sản xuất thành công!"});
        }else
            res.json({"status": "Success", "message": "Có ràng buộc khoá ngoại. Không thể xoá nhà sản xuất!"});
    } catch (error) {
        res.json({"status": "Fail", "message": "Lỗi cú pháp! Xoá nhà sản xuất không thành công!", "error": error});
    }
});



module.exports = router;