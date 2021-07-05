const express = require('express');
const router = express.Router();

const db = require('../models/database');
const modelDiscount = require('../models/model_discount');
const authController = require('../controllers/authController');


            // API GET
    // Danh sách tất cả các khuyến mãi theo sản phẩm:
router.get('/', async function(req, res) { 
    try {
        let list = await modelDiscount.list_Discounts();
        res.status(200).json({ "status": "Success", "message": "Lấy danh sách khuyến mãi theo sản phẩm thành công !", "discount": list });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...! Lấy danh sách khuyến mãi theo sản phẩm thất bại !!!", "error": error });
    }
});
    // Danh sách các khuyến mãi theo sản phẩm:
router.get('/san-pham', async function(req, res) { 
    try {
        let list = await modelDiscount.list_Dis_Product();
        res.status(200).json({ "status": "Success", "message": "Lấy danh sách khuyến mãi theo sản phẩm thành công !", "discount": list });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...! Lấy danh sách khuyến mãi theo sản phẩm thất bại !!!", "error": error });
    }
});
    // Danh sách các voucher:
router.get('/voucher', async function(req, res) { 
    try {
        let list = await modelDiscount.list_Vouchers();
        res.status(200).json({ "status": "Success", "message": "Lấy danh sách voucher thành công !", "voucher": list });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...! Lấy danh sách voucher thất bại !!!", "error": error });
    }
});
    // Chi tiết 1 khuyến mãi theo "mã khuyến mãi":
router.get('/:id', async function(req, res) { 
    let makm = req.params.id;
    try {
        let list = await modelDiscount.get_By_discountId(makm);
        if(list == -1)
            res.status(400).json({ "status": "Fail", "message": "Không có chương trình khuyến mãi này trong database !!!" });
        else
            res.status(200).json({ "status": "Success", "message": "GET chi tiết 1 khuyến mãi thành công !", "discount": list });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...! GET chi tiết khuyến mãi thất bại !!!", "error": error });
    }
});
    // Chi tiết 1 khuyến mãi voucher theo mã voucher:
router.get('/check-voucher/:ma', async function(req, res) { 
    let maVoucher = req.params.ma;
    //let today = new Date();
    //let ngayhientai = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    try {
        let voucher = await modelDiscount.check_By_voucherName(maVoucher);
        if(voucher == false)
            res.status(400).json({ "status": "Fail", "message": "Không tìm thấy mã voucher này, hoặc mã voucher này đã hết hạn !!!" });
        else
            res.status(200).json({ "status": "Success", "message": "Tìm voucher thành công !", "voucher": voucher });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...! Check voucher thất bại !!!", "error": error });
    }
});


            // API POST:
    // Tạo khuyến mãi là voucher:
router.post('/them-voucher', async function(req, res) {
    let tenkm = req.body.tenkm;
    let maVoucher = req.body.voucher;
    let ghichu = req.body.ghichu;
    let dieukien = req.body.dieukien;
    let giagiam = req.body.giagiam;
    let ngaybd = req.body.ngaybd;
    let ngaykt = req.body.ngaykt;
    let trangthai = req.body.trangthai;

    if(tenkm == undefined && maVoucher == undefined && ghichu == undefined && giagiam == undefined && ngaybd == undefined){
        res.status(400).json({ "status": "Fail", "message": "Thiếu thông tin voucher. Vui lòng kiểm tra lại thông tin !!!" });
    } else{
        let voucherExist = await modelDiscount.check_By_voucherName(tenkm);     // Kiểm tra xem voucher đã tồn tại hay chưa?(true: tồn tại, false là ko tồn tại)
        if(voucherExist == false) {
            try {
                let data = {
                    tenkm: tenkm,
                    voucher: maVoucher,
                    ghichu: ghichu,
                    dieukien: dieukien,
                    giagiam: giagiam,
                    ngaybd: ngaybd,
                    ngaykt: ngaykt,
                    trangthai: trangthai
                };
                let voucher = await modelDiscount.create_Voucher(data);
                res.status(200).json({ "status": "Success", "message": "Tạo voucher thành công !" });
            } catch (error) {
                res.status(400).json({ "status": "Fail", "message": "Lỗi...!!!", error: error });
            }
        } else {
            // Trùng mã voucher:
            res.status(400).json({ "status": "Fail", "message": "Trùng mã voucher, vui lòng nhập mã voucher khác !!!" });
        };   
    };
});
    // Tạo chương trình khuyến mãi theo sản phẩm:
router.post('/them-khuyen-mai/san-pham', async function(req, res) {
    // giakm = giasp - (giasp * (chietkhau/100));
    let data = {
        tenkm: req.body.tenkm,
        ghichu: req.body.ghichu,
        ngaybd: req.body.ngaybd,
        ngaykt: req.body.ngaykt,
        trangthai: req.body.trangthai
    }
    let chitietKM = req.body.sanphamCK;
    //console.log(req.body);
    //console.log("data: ", data);
    //console.log("chitietkm: ", chitietKM);
    //console.log(chitietKM[0].chietkhau);
    //console.log(chitietKM[0].sanpham);
    if(data.tenkm == undefined && data.ghichu == undefined && data.ngaybd == undefined && chitietKM == undefined){
        res.status(400).json({ "status": "Fail", "message": "Thiếu thông tin ! Thêm chương trình khuyến mãi cho sản phẩm không thành công !" });
    } else {
        try {
            let query = await modelDiscount.create_Discount(data, chitietKM);
            res.status(200).json({ "status": "Success", "message": query });
        } catch (error) {
            res.status(400).json({ "status": "Fail", "message": "Lỗi...!", error: error });
        }
    };
});


            // API PUT:
    // Cập nhật khuyến mãi là voucher:
router.put('/cap-nhat-voucher', async function(req, res) {
    let data = {
        makm: req.body.makm,
        tenkm: req.body.tenkm,
        voucher: req.body.voucher,
        ghichu: req.body.ghichu,
        dieukien: req.body.dieukien,
        giagiam: req.body.giagiam,
        ngaybd: req.body.ngaybd,
        ngaykt: req.body.ngaykt,
        trangthai: req.body.trangthai
    };

    try {
        let query = await modelDiscount.update_Discount(data);
        res.status(200).json({ "status": "Success", "message": query });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...!", error: error });
    };
});
    // Cập nhật trạng thái khuyến mãi:
router.put('/cap-nhat-trang-thai', async function(req, res) {
    let makm = req.body.makm;
    let trangthai = req.body.trangthai;

    if(makm == undefined){
        res.status(400).json({ "status": "Fail", "message": "Thiếu mã khuyến mãi! Cập nhật trạng thái khuyến mãi thất bại !" });
    } else {
        try {
            let data = { makm: makm, trangthai: trangthai };
            let voucher = await modelDiscount.lock_Discount(data);
            res.status(200).json({ "status": "Success", "message": voucher });
        } catch (error) {
            res.status(400).json({ "status": "Fail", "message": "Lỗi...! Cập nhật trạng thái khuyến mãi thất bại !", error: error });
        };
    };
});


            //API DELETE
    // Xoá 1 chương trình khuyến mãi theo makm:
router.delete('/xoa-khuyen-mai/:id', async function(req, res) {
    let makm = req.params.id;
    
    if(makm == undefined){
        res.status(400).json({ "status": "Fail", "message": "Thiếu thông tin. Xoá khuyến mãi thất bại ! " });
    } else {
        try {
            let query = await modelDiscount.delete(makm);
            if(query == -1)
                res.status(400).json({ "status": "Fail", "message": "Có ràng buộc khoá ngoại, xoá khuyến mãi thất bại ! " });
            else
                res.status(200).json({ "status": "Success", "message": query });  
        } catch (error) {
            res.status(400).json({ "status": "Fail", "message": "Lỗi...! Xoá khuyến mãi thất bại !", error: error });
        };
    };
});


module.exports = router;