var express = require('express');
var router = express.Router();
var db = require('../models/database')
//var nodemailer = require('nodemailer');
const modelUser = require('../models/model_user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = require('../controllers/userController');


const signToken = (id) => {
	return jwt.sign({ id }, 'nhan', {
		expiresIn: '90d',
	});
};

router.post('/quen-mat-khau', async (req, res) => {
    let email = req.body.email;
    let checkEmail = await modelUser.checkEmail(email); // Kiểm tra email có trong database hay không
    console.log(email);
    if (checkEmail) { // Nếu email có trong database
        let mess = `Mật khẩu đã được gửi qua email ${email} của bạn! Vui lòng check mail.`;
        let newPassword = Math.random().toString(36).substring(7);

        var nodemailer = require('nodemailer'); // Nhúng module nodemailer để gửi password vào email của khách hàng

        /* var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: 'autumnshop180@gmail.com', pass: 'autumn@180CaoLo' }, // Email của người gửi
            tls: { rejectUnauthorized: false }
        }); */
        var transporter = nodemailer.createTransport('smtps://autumnshop180%40gmail.com:autumn@180CaoLo@smtp.gmail.com');

        var mailOptions = {
            from: 'autumnshop180@gmail.com', //Email người gửi
            to: `${email}`, // Email người nhận
            subject: 'Lấy lại mật khẩu',
            text: 'Lấy lại mật khẩu',
            html: `Cửa hàng thời trang AutumnShop xin gửi lại mật khẩu của bạn. <br>
        Your password: <b style="padding: 5px 7px; background: #eee; color: red"> '${newPassword}' </b>`, // Nội dung thư, có thể có code html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error){
                console.log("Ko gửi mail đc");
                console.log(error);
                return res.status(400).json({"status": "Fail", "message": "Lỗi. Không thể gửi mail!"});
            } else {
                console.log('Đã gửi mail: ' + info.response);
                var salt = bcrypt.genSaltSync(10);
                var pass_mahoa = bcrypt.hashSync(newPassword, salt);
                let sql = `UPDATE khachhang SET matkhau='${pass_mahoa}' WHERE email='${email}' `;
                db.query(sql, (err, result) => { console.log('Update success'); });
                return res.status(200).json({status: "Success", message: mess});
            }
        });
    } else {
        return res.status(400).json({"status": "Fail", "message": "Email không tồn tại!"});
    }
})


            // API
    // GET
router.get('/', userController.getListUsers);   // Danh sách tất cả khách hàng
router.get('/:id', userController.getDetailUser);   // Chi tiết 1 khách hàng bằng id
router.get('/ten/:name', userController.getUserName);   // Tìm khách hàng bằng tên: "async"->Bất đồng bộ
    // POST
router.post('/dang-ky', userController.postUser);   // Đăng ký tài khoản
router.post('/dang-nhap', userController.postUserLogin);    // Đăng nhập tài khoản
router.post('/dang-ky/gmail', userController.postUser);   // Đăng ký tài khoản khi đăng nhập bằng gmail
router.post('/dang-nhap/gmail', userController.postUserLogin);    // Đăng nhập tài khoản thông qua tài khoản gmail
    // PUT
router.put('/dev-quen-mat-khau', userController.putForgotPassword);
router.put('/doi-mat-khau', userController.putChangePassword);  // Đổi mật khẩu tài khoản user
router.put('/cap-nhat-tai-khoan', userController.putEditUser); // Cập nhật thông tin tài khoản user
router.put('/cap-nhat-trang-thai', userController.putEditUserStatus);   // Cập nhật trạng thái tài khoản user
    // DELETE
router.delete('/xoa/:id', userController.deleteUser);   // Xoá tài khoản khách hàng  


module.exports = router;