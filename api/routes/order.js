var express = require('express');
var router = express.Router();

const modelOrder = require('../models/model_order');
const modelProduct = require('../models/model_product'); //nhúng model products vào controller này để sử dụng
const modelCatalog = require('../models/model_catalog');


            // API
        // API GET
    // Danh sách hoá đơn:
router.get('/api/v1/don-hang', async function(req, res) { 
    try {
        let listOrder = await modelOrder.list();
        if(listOrder == -1){
            res.json({"status": "Fail", "message": "Không có đơn hàng nào!"});
        }else
            res.json({"status": "Success", "data": listOrder});
    } catch (error) {
        res.json({"status": "Fail", "error": error});
    }
})


    // Lọc đơn hàng theo id.
router.get('/api/v1/id/:id', async function (req, res) {
    try {
        let orderId = req.params.id;
        let order = await modelOrder.getOrderId(orderId);
        res.json({"status": "Success", "data": order});
    } catch (error) {
        res.json({"status": "Fail", "error": error})
    }
});


        // API POST:
    // Cập nhật trạng thái đơn hàng:
router.post('/api/v1/trang-thai-don-hang/cap-nhat', async function(req, res) {
    let orderId = req.body.orderId;
    let delivery = req.body.delivery;
    let status = req.body.status;
    if(orderId == null){
        res.json({"status": "Fail", "message": "Không có id đơn hàng!"});
    }
    try {
        let query = await modelOrder.updateOrder(orderId, delivery, status);
        res.json({"status": "Success", "message": "Cập nhật đơn hàng thành công!"});
    } catch (error) {
        res.json({"status": "Fail", "message": "Lỗi cú pháp!", "error": error});
    }
});
    // Tạo đơn hàng:
router.post('/tao-don-hang', async function(req, res) {

});



module.exports = router;