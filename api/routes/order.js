var express = require('express');
var router = express.Router();

const modelOrder = require('../models/model_order');    //nhúng model products vào controller này để sử dụng


            // API GET
    // Danh sách hoá đơn:
router.get('/danh-sach-dh', async function(req, res) { 
    try {
        let listOrder = await modelOrder.list_Orders();
        res.json({"status": "Success", "data": listOrder});
    } catch (error) {
        res.json({"status": "Fail", "error": error});
    }
})
    // Đơn hàng theo mã đơn hàng:
router.get('/id=:id', async function (req, res) {
    try {
        let orderId = req.params.id;
        let order = await modelOrder.get_By_Id(orderId);
        if(order == -1)
            res.json({ "status": "Fail", "message": "Không tìm thấy mã đơn hàng này!"});
        else
            res.json({"status": "Success", "data": order});
    } catch (error) {
        res.json({"status": "Fail", "error": error})
    }
});
    // Chi tiết đơn hàng theo mã đơn hàng:
router.get('/chi-tiet-dhang/id=:id', async function (req, res) {
    try {
        let orderId = req.params.id;
        let order = await modelOrder.get_detailOrder(orderId);
        res.json({"status": "Success", "data": order});
    } catch (error) {
        res.json({"status": "Fail", "error": error})
    }
});
// Đơn hàng theo mã khách hàng:
router.get('/khach-hang/id=:id', async function (req, res) {
    try {
        let userId = req.params.id;
        let order = await modelOrder.get_By_userId(userId);
        if(order == -1)
            res.json({ "status": "Fail", "message": "Không có đơn hàng nào!" });
        else
            res.json({ "status": "Success", "data": order});
    } catch (error) {
        res.json({ "status": "Fail", "message": "Lỗi cú pháp...!", "error": error })
    }
});


            // API POST:
    // Tạo đơn hàng:
router.post('/tao-don-hang', async function(req, res) {
    let makh = req.body.makh;
    let tongtien = req.body.tongtien;
    let makm = req.body.makm;
    var today = new Date();
    var ngaydat = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
    if(makh == '' || tongtien == ''){
        res.json({"status": "Fail", "message": "Tạo đơn hàng không thành công! Thiếu thông tin!"});
    }else{
        try {
            let data = {
                masp: masp,
                makh: makh,
                noidung: noidung,
                ngaybl: ngaybl,
            };
            let query = await modelOrder.insert_Order(makh, tongtien, makm, ngaydat);
            res.json({"status": "Success", "message": "Tạo đơn hàng thành công!", "result": query});
        } catch (error) {
            res.json({"status": "Fail", "error": error });
        }
    }
});


            // API PUT:
    // Cập nhật trạng thái đơn hàng:
router.put('/cap-nhat-trang-thai', async function(req, res) {
    let orderId = req.body.orderId;
    let delivery = req.body.delivery;
    let status = req.body.status;
    if(orderId == ''){
        res.json({"status": "Fail", "message": "Không có id đơn hàng!"});
    }else{
        try {
            let query = await modelOrder.updateOrder(orderId, delivery, status);
            res.json({"status": "Success", "message": "Cập nhật đơn hàng thành công!"});
        } catch (error) {
            res.json({"status": "Fail", "message": "Lỗi cú pháp!", "error": error});
        }
    }
});



module.exports = router;