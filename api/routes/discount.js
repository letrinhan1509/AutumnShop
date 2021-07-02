const express = require('express');
const router = express.Router();

const db = require('../models/database');
const modelDiscount = require('../models/model_discount');
const authController = require('../controllers/authController');


            // API GET
    // Danh sách các khuyến mãi theo sản phẩm:
router.get('/', async function(req, res) { 
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
    // Chi tiết 1 khuyến mãi theo sản phẩm:
router.get('/:id', async function(req, res) { 
    let makm = req.params.id;
    try {
        let list = await modelDiscount.get_By_discountId(makm);
        if(list == -1)
            res.status(400).json({ "status": "Fail", "message": "Không có mã khuyến mãi này trong database !!!" });
        else
            res.status(200).json({ "status": "Success", "message": "GET chi tiết 1 khuyến mãi thành công !", "discount": list });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...! GET chi tiết khuyến mãi thất bại !!!", "error": error });
    }
});
    // Chi tiết 1 khuyến mãi theo sản phẩm:
router.get('/check-voucher/:ma', async function(req, res) { 
    let maVoucher = req.params.ma;
    let today = new Date();
    let ngayhientai = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
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

    if(tenkm == undefined || maVoucher == undefined || ghichu == undefined || giagiam == undefined || ngaybd == undefined){
        console.log("thất bại");
        res.status(400).json({ "status": "Fail", "message": "Thiếu thông tin voucher. Vui lòng kiểm tra lại thông tin !!!" });
    } else{
        console.log("ok");
        let voucherExist = await modelDiscount.check_By_voucherName(tenkm);     // Kiểm tra xem voucher đã tồn tại hay chưa?
        if(voucherExist == false) {
            try {
                let data = {
                    tenkm: tenkm,
                    voucher: maVoucher,
                    ghichu: ghichu,
                    dieukien: dieukien,
                    giagiam: giagiam,
                    ngaybd: ngaybd,
                    ngaykt: "05-07-2021",
                    trangthai: trangthai
                };
                let voucher = await modelDiscount.create_Voucher(data);
                res.status(200).json({ "status": "Success", "message": "Tạo voucher thành công !" });
            } catch (error) {
                res.status(400).json({ "status": "Fail", "message": "Lỗi...!!!", error: error });
            }
        } else {
            // Trùng mã voucher:
            res.status(400).json({ "status": "Fail", "message": "Mã voucher này đã tồn tại, vui lòng nhập mã voucher khác !!!" });
        };   
    };
});
// Tạo khuyến mãi là sản phẩm:
router.post('/them-khuyen-mai/san-pham', async function(req, res) {
    let tenkm = req.body.tenkm;
    let dieukien = req.body.dieukien;
    let giagiam = req.body.giagiam;
    let ghichu = req.body.ghichu;
    let voucher = 0;
    let ngaybd = req.body.ngaybd;
    let ngaykt = req.body.ngaykt;
    let trangthai = req.body.trangthai;
    console.log(req.body);

    /* try {
        
        res.status(200).json({ "status": "Success", "message": "Tạo khuyến mãi theo sản phẩm thành công !" });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...! Tạo khuyến mãi theo sản phẩm thất bại !", error: error });
    } */
});


// API PUT:
// Sửa khuyến mãi là voucher:
router.put('/cap-nhat-khuyen-mai', async function(req, res) {
    let ten = req.body.tenkm;
    let ghichu = req.body.ghichu;
    let dieukien = req.body.dieukien;
    let giagiam = req.body.giagiam;
    let voucher = req.body.voucher;
    let ngaybd = req.body.ngaybd;
    let ngaykt = req.body.ngaykt;
    var today = new Date();
    var ngayhientai = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    if(voucher == 1){
        try {

            res.status(200).json({ "status": "Success", "message": "Cập nhật thông tin voucher thành công !" });
        } catch (error) {
            res.status(400).json({ "status": "Fail", "message": "Lỗi...! Cập nhật thông tin voucher thất bại !", error: error });
        }
    } else{
        try {
            
        } catch (error) {
            res.status(400).json({ "status": "Fail", "message": "Lỗi...! Cập nhật thông tin khuyến mãi thất bại !", error: error });
        }
    }
});
    // Cập nhật trạng thái khuyến mãi:
router.put('/cap-nhat-trang-thai', async function(req, res) {
    let makm = req.body.makm;
    let trangthai = req.body.trangthai;

    try {
        if(trangthai == 1){

        } else{
            
        }
        res.status(200).json({ "status": "Success", "message": "Cập nhật trạng thái khuyến mãi thành công !" });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...! Cập nhật trạng thái khuyến mãi thất bại !", error: error });
    }
});


//API DELETE
router.delete('/xoa-khuyen-mai/:id', async function(req, res) {
    let makm = req.body.id;

    try {

        res.status(200).json({ "status": "Success", "message": "xoá khuyến mãi thành công !" });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...! Xoá khuyến mãi thất bại !", error: error });
    }
});


module.exports = router;