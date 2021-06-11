var express = require('express');
var router = express.Router();

const modelProducer = require('../models/model_producer');


            // API GET:
    // Danh sách tất cả nhà sản xuất:
router.get('/danh-sach', async function (req, res) {
    try {
      let listProducer = await modelProducer.list_producer();
      res.json({ "status": "Success", "data": listProducer });
    } catch (error) {
      res.json({ "status": "Fail", "error": error })
    }
  });
    // Nhà sản xuất theo id:
router.get('/nha-sx-id/:id', async function (req, res) {
    try {
        let producerId = req.params.id;
        let producer = await modelProducer.get_By_Id(producerId);
        console.log(producer.mansx);
        if(producer == -1){
            res.json({"status": "Fail", "message": "Không tìm thấy nhà sản xuất này trong DB!"});
        }else
            res.json({"status": "Success", "data": producer});
    } catch (error) {
        res.json({"status": "Fail", "error": error})
    }
});


            // API POST:
    // Thêm nhà sản xuất:
router.post('/them-nha-sx', async function(req, res) {
    let producerId = req.body.producerId;
    let name = req.body.name;
    let origin = req.body.origin;
    if(producerId == '' || name == ''){
        res.json({"status": "Fail", "message": "Thiếu thông tin nhà sản xuất!"});
    }else{
        let data = {
            mansx: producerId,
            tennsx: name,
            xuatxu: origin
        }
        try {
            let query = await modelProducer.insert_producer(data);
            res.json({"status": "Success", "message": "Thêm nhà sản xuất thành công!"});
        } catch (error) {
            res.json({"status": "Fail", "message": "Lỗi cú pháp! Thêm nhà sản xuất không thành công!", "error": error});
        }
    }
});
    // Cập nhật thông tin nhà sản xuất:
router.post('/cap-nhat-nha-sx', async function(req, res) {
    let producerId = req.body.producerId;
    let name = req.body.name;
    let origin = req.body.origin;
    if(producerId == '' || name == ''){
        res.json({"status": "Fail", "message": "Không có id nhà sản xuất!"});
    }else{
        try {
            let query = await modelProducer.update_producer(producerId, name, origin);
            res.json({"status": "Success", "message": "Cập nhật nhà sản xuất thành công!"});
        } catch (error) {
            res.json({"status": "Fail", "message": "Lỗi cú pháp! Cập nhật nhà sản xuất không thành công!", "error": error});
        }
    }
});
    // Xoá nhà sản xuất:
router.post('/xoa-nha-sx', async function(req, res) {
    let producerId = req.body.producerId;
    if(producerId == ''){
        res.json({"status": "Fail", "message": "Không có id nhà sản xuất!"});
    }else{
        try {
            let query = await modelProducer.delete_producer(producerId);
            if(query == 1){
                res.json({"status": "Success", "message": "Xoá nhà sản xuất thành công!"});
            }else
                res.json({"status": "Fail", "message": "Có ràng buộc khoá ngoại. Không thể xoá nhà sản xuất!"});
        } catch (error) {
            res.json({"status": "Fail", "message": "Lỗi cú pháp! Xoá nhà sản xuất không thành công!", "error": error});
        }
    }
});



module.exports = router;