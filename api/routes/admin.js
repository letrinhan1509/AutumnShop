const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require('../models/database');
const modelAdmin = require('../models/model_admin');
const modelUser = require('../models/model_user');
const modelProduct = require('../models/model_product');
const modelCatalog = require('../models/model_catalog');
const modelOrder = require('../models/model_order');
const modelProducer= require('../models/model_producer');
const { json } = require('express');

const signToken = (id) => {
	return jwt.sign({ id }, 'nhan', {
		expiresIn: '90d',
	});
};
    // Đăng ký tài khoản:
router.get('/test', async(req, res, next) => {
    res.status(200).json({status: "Success", message: "TEST OK!!!"});
});


            // API:
    // Đăng nhập:
router.post('/dang-nhap', function (req, res, next) {
    let em = req.body.email;
    let mk = req.body.password;
    console.log(req.body);

    let sql = `SELECT * FROM admin WHERE admin = '${em}'`;
    db.query(sql, (err, rows) => {
        if (rows.length <= 0) {
            res.json({"status": "LoginFail", "message": "Không tìm thấy tài khoản!", "error": err});
        }
        let admin = rows[0];
        let pass_fromdb = admin.matkhau;
        console.log("Mật khẩu DB:", pass_fromdb);
        var kq = bcrypt.compareSync(mk, pass_fromdb);// So sánh mật khẩu từ người dùng và MK đã mã hoá dưới DB.
        console.log(kq);
        const token = signToken(admin._id);
        const cookieOptions = {
            expires: new Date(
                Date.now() + 90 * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        }; 
        res.cookie("jwt", token, cookieOptions);
         //Remove password from output
        //user.password = undefined;
        if (kq) {
            res.json({
                status: "LoginSuccess",
                admin: {
                    manv: admin.manv,
                    username: admin.tennv,
                    email: admin.admin,
                    phone: admin.sodienthoai,
                    address: admin.diachi,
                    permission: admin.quyen,
                    status: admin.trangthai   
                },
                token
            });
        }else{
            console.log("Not OK");
            res.json({status: "LoginFail", message: "Đăng nhập không thành công!"});
        }
    });
});


            // API GET:
    // Danh sách tất cả admins:
router.get('/danh-sach-admin', async function (req, res) {
    try {
        let listAdmins = await modelAdmin.listAdmins();
        res.json({"status": "Success", "data": listAdmins});
    } catch (error) {
        res.json({"status": "Fail", "error": error});
    }
});

router.get('/admin-id/:id', async function (req, res) {
    try {
        let adminId = req.params.id;
        let admin = await modelAdmin.get_Admin_Id(adminId);
        res.json({"status": "Success", "data": admin});
    } catch (error) {
        res.json({"status": "Fail", "error": error});
    }
});


            // API POST:
    // Thêm tài khoản admin:
router.post('/dang-ky', async function(req, res) {
    let email = req.body.email;
    let pass = req.body.pass;
    let name = req.body.name;
    let address = req.body.address;
    let phone = req.body.phone;
    let permission = req.body.permission;
    console.log(req.body);

    var salt = bcrypt.genSaltSync(10); // Chuỗi cộng thêm vào mật khẩu để mã hoá.
    var pass_mahoa = bcrypt.hashSync(pass, salt);   // Mã hoá password.
    
    let data = {
        admin: email,
        matkhau: pass_mahoa,
        tennv: name,
        diachi: address,
        sodienthoai: phone,
        maquyen: permission
    }
    try {
        let query = await modelAdmin.insertAdmin(data);
        res.json({"status": "Success", "message": "Đăng ký tài khoản admin thành công!"});
    } catch (error) {
        res.json({"status": "Fail", "message": "Lỗi cú pháp! Đăng ký không thành công!", "error": error});
    }
});
    // Cập nhật thông tin tài khoản admin:
router.post('/tai-khoan-admin/cap-nhat', async function(req, res) {
    let adminId = req.body.adminId;
    let pass = req.body.pass;
    let name = req.body.name;
    let address = req.body.address;
    let phone = req.body.phone;
    let permission = req.body.permission;
    if(adminId == null){
        res.json({"status": "Fail", "message": "Thiếu id admin!"});
    }
    try {
        let query = await modelAdmin.updateProfileAdmin(adminId, pass, name, address, phone, permission);
        res.json({"status": "Success", "message": "Sửa thông tin tài khoản admin thành công!"});
    } catch (error) {
        res.json({"status": "Fail", "message": "Lỗi cú pháp!", "error": error});
    }
});
    // Cập nhật trạng thái admin:
router.post('/trang-thai-admin/cap-nhat', async function(req, res) {
    let adminId = req.body.adminId;
    let stt = req.body.stt;
    console.log(req.body);

    if(adminId == null){
        res.json({"status": "Fail", "message": "Không có id admin!"});
    }else{
        if(stt == 0){
            let query = await modelAdmin.lockAdmin(adminId);
            res.json({"status": "Success", "message": "Khoá tài khoản admin thành công!"});
        }else{
            let query = await modelAdmin.unlockAdmin(adminId);
            res.json({"status": "Success", "message": "Mở khoá tài khoản admin thành công!"});
        }
    }
});  



    // Thêm trạng thái:
router.post('/api/v1/trang-thai/them', async function(req, res) {
    let sttId = req.body.sttId;
    let name = req.body.name;
    let data = {
        trangthai: sttId,
        tentt: name,
    }
    try {
        let query = await modelAdmin.insertStatusOr(data);
        res.json({"status": "Success", "message": "Thêm trạng thái thành công!"});
    } catch (error) {
        res.json({"status": "Fail", "message": "Lỗi cú pháp! Thêm trạng thái không thành công!", "error": error});
    }
});
    // Cập nhật trạng thái:
router.post('/api/v1/update-status', async function(req, res) {
    let sttId = req.body.sttId;
    let name = req.body.name;
    if(sttId == null){
        res.json({"status": "Fail", "message": "Không có id trạng thái!"});
    }
    try {
        let query = await modelAdmin.updateStatusOr(sttId, name);
        res.json({"status": "Success", "message": "Cập nhật trạng thái thành công!"});
    } catch (error) {
        res.json({"status": "Fail", "message": "Lỗi cú pháp! Cập nhật trạng thái không thành công!", "error": error});
    }
});
    // Xoá trạng thái:
router.post('/api/v1/delete-status', async function(req, res) {
    let sttId = req.body.sttId;
    if(sttId == null){
        res.json({"status": "Fail", "message": "Không có id nhà sản xuất!"});
    }
    try {
        let query = await modelAdmin.deleteStatusOr(sttId);
        if(query == 1){
            res.json({"status": "Success", "message": "Xoá trạng thái thành công!"});
        }else
            res.json({"status": "Success", "message": "Có ràng buộc khoá ngoại. Không thể xoá trạng thái!"});
    } catch (error) {
        res.json({"status": "Fail", "message": "Lỗi cú pháp! Xoá trạng thái không thành công!", "error": error});
    }
});


module.exports = router;