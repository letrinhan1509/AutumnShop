const axios = require('axios');
var express = require('express');
var router = express.Router();

const modelOrder = require('../models/model_order');    //nhúng model products vào controller này để sử dụng


            // API GET
    // Danh sách hoá đơn:
router.get('/', async function(req, res) { 
    try {
        let listOrder = await modelOrder.list_Orders();
        res.status(200).json({ "status": "Success", "data": listOrder });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi! Lấy danh sách đơn hàng thất bại!", "error": error });
    }
})
    // Đơn hàng theo mã đơn hàng:
router.get('/:id', async function (req, res) {
    try {
        let orderId = req.params.id;
        let order = await modelOrder.get_By_Id(orderId);
        if(order == -1)
            res.status(400).json({ "status": "Fail", "message": "Không tìm thấy mã đơn hàng này!" });
        else
            res.status(200).json({ "status": "Success", "data": order });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi! Lấy chi tiết 1 đơn hàng thất bại!", "error": error })
    }
});
    // Danh sách chi tiết đơn hàng theo mã đơn hàng:
router.get('/:id/chi-tiet-dhang', async function (req, res) {
    try {
        let orderId = req.params.id;
        let order = await modelOrder.get_detailOrder(orderId);
        res.status(200).json({"status": "Success", "message": "Lấy chi tiết đơn hàng theo mã đơn hàng thành công !", "data": order});
    } catch (error) {
        res.status(400).json({"status": "Fail", "message": "Lỗi...! Không thể lấy chi tiết đơn hàng theo mã đơn hàng !", "error": error})
    }
});
// Đơn hàng theo mã khách hàng:
router.get('/khach-hang/:id', async function (req, res) {
    try {
        let userId = req.params.id;
        let order = await modelOrder.get_By_userId(userId);
        if(order == -1)
            res.status(400).json({ "status": "Fail", "message": "Không có đơn hàng nào !" });
        else
            res.status(200).json({ "status": "Success", "message": "Lấy đơn hàng thành công !", "data": order});
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...! Không thể lấy đơn hàng theo mã khách hàng !", "error": error })
    }
});
    // Đơn hàng theo số điện thoại:
router.get('/so-dien-thoai/:phone', async function (req, res) {
    let phone = req.params.phone;
    try {
        let order = await modelOrder.get_By_Phone(phone);
        if(order == -1)
            res.status(400).json({ "status": "Fail", "message": "Không có đơn hàng nào !" });
        else
            res.status(200).json({ "status": "Success", "message": "Lấy đơn hàng thành công !", order: order});
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...! Không thể lấy đơn hàng theo mã khách hàng !", "error": error })
    }
});


            // API POST:
    // Tạo đơn hàng:
router.post('/tao-don-hang', async function(req, res) {
    let makh = req.body.order.makh;
    let tenkh = req.body.order.tenkh;
    let email = req.body.order.email;
    let sodienthoai = req.body.order.sodienthoai;
    let address = req.body.order.address;
    let ward = req.body.order.ward;
    let tongtien = req.body.sumpay;
    let makm = req.body.makm;
    let ship = req.body.ship;
    let ghichu = req.body.note;
    let hinhthuc = req.body.pay; 
    var today = new Date();
    var ngaydat = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let cart = req.body.order.cart;
    
    try {
        if(makm == undefined){
            console.log("Không có mã km");
            var url = "https://thongtindoanhnghiep.co/api/ward/" + ward;
            axios.get(url)
                .then(async function (response) {
                    let tpho = response.data.TinhThanhTitle;
                    let quan = response.data.QuanHuyenTitle;
                    let phuong = response.data.Title;
                    let diachi = address + ', ' + phuong + ', ' + quan + ', ' + tpho;
                    let query = await modelOrder.insert_Order(makh, tenkh, email, sodienthoai, diachi, ship, tongtien, ghichu, hinhthuc, ngaydat, cart);
                    res.status(200).json({"status": "Success", "message": "Tạo đơn hàng thành công !"});
                })
                .catch(function (error) {
                    res.status(400).json({ "status": "Fail", "message": "Lỗi... GET DETAIL DISTRICT !!!", "error": error });
                });
        } else {
            // Trường hợp đơn hàng có mã khuyến mãi:
            var url = "https://thongtindoanhnghiep.co/api/ward/" + ward;
            axios.get(url)
                .then(async function (response) {
                    let tpho = response.data.TinhThanhTitle;
                    let quan = response.data.QuanHuyenTitle;
                    let phuong = response.data.Title;
                    let diachi = address + ', ' + phuong + ', ' + quan + ', ' + tpho;
                    let query = await modelOrder.insert_Order_PromoCode(makh, tenkh, email, sodienthoai, diachi, ship, tongtien, ghichu, makm, hinhthuc, ngaydat, cart);
                    res.status(200).json({"status": "Success", "message": "Tạo đơn hàng thành công !"});
                })
                .catch(function (error) {
                    res.status(400).json({ "status": "Fail", "message": "Lỗi... GET DETAIL DISTRICT !!!", "error": error });
                });
        } 
    } catch (error) {
        res.status(400).json({"status": "Fail", "message": "Lỗi...! Tạo đơn hàng không thành công!", "error": error });
    }
});


            // API PUT:
    // Cập nhật trạng thái đơn hàng:
router.put('/cap-nhat-trang-thai', async function(req, res) {
    let data = {
        madonhang: req.body.madonhang,
        ngaygiao: req.body.ngaygiao,
        trangthai: req.body.trangthai
    };

    if(data.madonhang == undefined){
        res.status(400).json({ "status": "Fail", "message": "Không có id đơn hàng!" });
    }else{
        try {
            let query = await modelOrder.update_Order(data);
            res.status(200).json({ "status": "Success", "message": query });
        } catch (error) {
            res.status(400).json({ "status": "Fail", "message": "Lỗi...!", "error": error });
        }
    };
});



module.exports = router;