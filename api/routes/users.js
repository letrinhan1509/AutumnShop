var express = require('express');
var router = express.Router();
var db = require('../models/database')
const modelUser = require('../models/model_user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signToken = (id) => {
	return jwt.sign({ id }, 'nhan', {
		expiresIn: '90d',
	});
};

router.post('/doi-mat-khau', function (req, res, next) {
    let password = req.body.password;
    let newPassword = req.body.newPassword;
    let confirmPassword = req.body.confirmPassword;
    let email = req.body.email;
    let sql = `SELECT * FROM khachhang WHERE email='${email}'`;
    db.query(sql, (err, rows) => {
        if (rows.length <= 0) {
            res.json({"status": "Fail", "message": "Email không tồn tại!"}); 
            return;
        }
        let user = rows[0];
        let pass_fromdb = user.matkhau;
        var kq = bcrypt.compareSync(password, pass_fromdb);
        if (kq) {
            if (newPassword === confirmPassword) {
                var salt = bcrypt.genSaltSync(10);
                var pass_mahoa = bcrypt.hashSync(newPassword, salt);
                let sql2 = `UPDATE khachhang SET matkhau='${pass_mahoa}' WHERE email='${email}'`;
                db.query(sql2, (err, result) => {
                    console.log('Update success');
                    res.json({"status": "Success", "message": "Đổi mật khẩu thành công!"});
                });
            }
        }else{
            res.json({"status": "Fail", "message": "Mật khẩu cũ không đúng! Vui lòng kiểm tra lại mật khẩu cũ!"});
        }
    });
})

router.post('/quen-mat-khau', async (req, res) => {
    let email = req.body.email;
    let checkEmail = await modelUser.checkEmail(email); // Kiểm tra email có trong database hay không
    console.log(email, checkEmail);
    if (checkEmail) { // Nếu email có trong database
        let mess = `Mật khẩu đã được gửi qua email ${email} của bạn! Vui lòng check mail.`;
        let newPassword = Math.random().toString(36).substring(7);

        var salt = bcrypt.genSaltSync(10);
        var pass_mahoa = bcrypt.hashSync(newPassword, salt);
        let sql = `UPDATE khachhang SET matkhau='${pass_mahoa}' WHERE email='${email}' `;
        db.query(sql, (err, result) => { console.log('Update success'); });

        var nodemailer = require('nodemailer'); // Nhúng module nodemailer để gửi password vào email của khách hàng

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: 'autumnshop180@gmail.com', pass: 'autumn@180CaoLo' }, // Email của người gửi
            tls: { rejectUnauthorized: false }
        });

        var mailOptions = {
            from: 'autumnshop180@gmail.com', //Email người gửi
            to: `${email}`, // Email người nhận
            subject: 'Lấy lại mật khẩu',
            //text: 'Nội dung thư, không có code html'
            html: `Cửa hàng thời trang AutumnShop xin gửi lại mật khẩu của bạn. <br>
      Your password: <b style="padding: 5px 7px; background: #eee; color: red"> ${newPassword} </b>`, // Nội dung thư, có thể có code html
        };

        transporter.sendMail(mailOptions, function (error, info) {

            if (error){
                console.log("Ko gửi mail đc");
                console.log(error);
                res.json({"status": "Fail", "message": "Lỗi. Không thể gửi mail!"});
            }
            else{
                console.log('Đã gửi mail: ' + info.response);
                //res.render('site/thanh-cong', { message: mess });
                res.json({"status": "Success", "message": mess});
            }
        });
    } else {
        res.json({"status": "Fail", "message": "Email không tồn tại!"});
    }
})


            // API
    // Danh sách tất cả khách hàng:
router.get('/danh-sach', async function (req, res) {
    try {
        let listUsers = await modelUser.list();
        res.json({"status": "Success", "data": listUsers});
    } catch (error) {
        res.json({"status": "Fail", "error": error})
    }
});
    // Khách hàng bằng id:
router.get('/kh-id/:id', async function (req, res) {
    try {
        let userId = req.params.id;
        let user = await modelUser.getById(userId);
        if(user == -1){     // Kiểm tra user_id trong DB.
            res.json({"status": "Fail", "message": "Không tìm thấy user này trong DB!"});
        }else{
            res.json({"status": "Success", "data": user});
        }  
    } catch (error) {
        res.json({"status": "Fail", "error": error});
    }
});
    // Tìm khách hàng bằng tên: "async"->Bất đồng bộ.
router.get('/khach-hang-ten/:name', async function (req, res) {
    let nameUser = req.params.name;
    let User = await modelUser.detailByName(nameUser);
    console.log(User);
    res.json(User);
});


            // API POST:
    // Đăng ký tài khoản:
router.post('/dang-ky', async function(req, res) {
    let email = req.body.email;
    let pass = req.body.matkhau;
    let nhaplaimk = req.body.nhaplaimk;
    let name = req.body.tenkh;
    let address = req.body.diachi;
    let phone = req.body.sodienthoai;
    
    if(email == '' || pass == '' || name == '' || address == '' || phone == ''){
        res.json({"status": "Fail", "message": "Thiếu thông tin!"});
    }else{ 
        try {
            var salt = bcrypt.genSaltSync(10); // Chuỗi cộng thêm vào mật khẩu để mã hoá.
            var mk_mahoa = bcrypt.hashSync(pass, salt);   // Mã hoá password.
            let data = {
                tenkh: name,
                email: email,
                matkhau: mk_mahoa,
                sodienthoai: phone,
                diachi: address,   
            }
            let query = await modelUser.insertUser(data);
            res.json({ "status": "Success", "message": "Thêm tài khoản user thành công!" });
        } catch (error) {
            res.json({ "status": "Fail", "message": "Lỗi cú pháp! Thêm không thành công!", "error": error });
        }
    } 
})
    // Đăng nhập tài khoản:
router.post('/dang-nhap', function (req, res, next) {
    let em = req.body.email;
    let mk = req.body.matkhau;
    console.log(req.body);

    let sql = `SELECT * FROM khachhang WHERE email = '${em}'`;
    db.query(sql, (err, rows) => {
        if (rows.length <= 0) {
            res.json({"status": "LoginFail", "error": err, message: "Đăng nhập thất bại. Không tìm thấy tài khoản!"});
        }else{
            let user = rows[0];
            let pass_fromdb = user.matkhau;
            var kq = bcrypt.compareSync(mk, pass_fromdb);
            console.log(kq);
            const token = signToken(user._id);
            const cookieOptions = {
                expires: new Date(
                    Date.now() + 90 * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
            }; 
            res.cookie("jwt", token, cookieOptions);
            if (kq) {
                console.log("OK!!! Đăng nhập thành công");
                res.json({
                    status: "LoginSuccess",
                    data: {
                        makh: user.makh, 
                        username: user.tenkh,
                        email: user.email,
                        sdt: user.sodienthoai,
                        diachi: user.diachi
                    },
                    message: "Đăng nhập thành công.",
                    token
                });
            }
            else {
                res.json({
                    status: "LoginFail",
                    message: "Đăng nhập thất bại. Sai mật khẩu!!!"
                });
            }
        }
    });
});
    // Cập nhật thông tin tài khoản user:
router.put('/cap-nhat-tai-khoan', async function(req, res) {
    let userId = req.body.userId;
    let pass = req.body.password;
    let name = req.body.name;
    let address = req.body.address;
    let phone = req.body.phone;

    var salt = bcrypt.genSaltSync(10); // Chuỗi cộng thêm vào mật khẩu để mã hoá.
    var pass_mahoa = bcrypt.hashSync(pass, salt);
    
    if(userId == null){
        res.json({"status": "Fail", "message": "Thiếu id user!"});
    }
    try {
        let query = await modelUser.updateProfileUser(userId, name, pass_mahoa, phone, address);
        res.json({"status": "Success", "message": "Sửa thông tin tài khoản user thành công!"});
    } catch (error) {
        res.json({"status": "Fail", "message": "Lỗi cú pháp!", "error": error});
    }
});
    // Cập nhật trạng thái user:
router.put('/cap-nhat-trang-thai', async function(req, res) {
    let userId = req.body.userId;
    let stt = req.body.stt;

    if(userId == null){
        res.json({"status": "Fail", "message": "Không có id user!"});
    }else{
        if(stt == 0){
            let query = await modelUser.lockUser(userId);
            res.json({"status": "Success", "message": "Khoá tài khoản khách hàng thành công!"});
        }else{
            let query = await modelUser.unlockUser(userId);
            res.json({"status": "Success", "message": "Mở khoá tài khoản khách hàng thành công!"});
        }
    }
});

    


module.exports = router;