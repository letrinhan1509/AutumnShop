const bcrypt = require("bcrypt");
const axios = require('axios');
const jwt = require("jsonwebtoken");
const catchAsync = require('../utils/catchAsync');
const authController = require('./authController');
const modelAdmin = require('../models/model_admin');


/* const signToken = id => {
    return jwt.sign( { id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}; */
//Create and send token
const createSendToken = (user, statusCode, res) => {
    const token = authController.signToken(user);
    const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.matkhau = undefined;

    res.status(statusCode).json({
        status: "LoginSuccess",
        message: "Đăng nhập thành công !",
        token,
        data: {
            user
        }
    });
};


                    // ADMIN CONTROLLER:

        // GET:
// GET List admin
exports.getListAdmins = catchAsync(async (req, res, next) => {
    try {
        let listAdmins = await modelAdmin.list_Admins();
        res.status(200).json({ 
            status: "Success", 
            data: listAdmins 
        });
    } catch (error) {
        res.status(400).json({ 
            status: "Fail", 
            error: error 
        });
    };
});
// GET Admin
exports.getAdmin = catchAsync(async (req, res, next) => {
    try {
        let adminId = req.params.id;
        let admin = await modelAdmin.get_Admin_Id(adminId);
        if(admin == -1)
            res.status(400).json({ status: "Fail", message: "Mã nhân viên này không tồn tại !" });
        else
            res.status(200).json({ "status": "Success", "data": admin });
    } catch (error) {
        res.status(400).json({ status: "Fail", error: error });
    }
});
// GET List Order Status
exports.getListOrderStatus = catchAsync(async (req, res, next) => {
    try {
        let list = await modelAdmin.list_Status_Order();
        res.status(200).json({ status: "Success", message: "Lấy danh sách trạng thái đơn hàng thành công !", data: list });
    } catch (error) {
        res.status(400).json({ status: "Fail", message: "Lấy danh sách trạng thái đơn hàng thất bại !", error: error });
    };
});
// GET Order Status
exports.getOrderStatus = catchAsync(async (req, res, next) => {
    try {
        let trangthai = req.params.id;
        let orderStatus = await modelAdmin.status_Order(trangthai);
        if(orderStatus == -1)
            res.status(400).json({ "status": "Fail", message: "Trạng thái đơn hàng này không tồn tại !" });
        else
            res.status(200).json({ status: "Success", message: "Lấy chi tiết 1 trạng thái đơn hàng thành công !", data: orderStatus });
    } catch (error) {
        res.status(400).json({ "status": "Fail", message: "Lỗi...Không thể lấy chi tiết 1 trạng thái đơn hàng !", "error": error });
    };
});


        // POST:
// Đăng ký khoản cho admin
exports.signup = catchAsync(async (req, res, next) => {
    let email = req.body.email;
    let mk = req.body.pass;
    //let pass1 = req.body.pass1;
    let name = req.body.name;
    let img = req.body.img;
    let address = req.body.address;
    let phone = req.body.phone;
    let permission = req.body.permission;
    let ward = req.body.ward;
    const admin = await modelAdmin.check_Admin(email);
    if(email === admin.admin) {
        return res.status(400).json({ status: "Fail", message: "Email này đã đăng ký tài khoản, vui lòng nhập email khác !" });
    };
    if(!img) {
        img = 'https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2FuserICON.png?alt=media&token=b64576ab-18b6-4d7a-9864-c15f59d5717c&fbclid=IwAR0UVyyCkNoF_dfbguTVOkC5lzvHPk-0C4Ef_iFmPxl8lKX2xQsKObTo568';
    };
    if(!ward) {
        var url = "https://thongtindoanhnghiep.co/api/ward/" + ward;
        axios.get(url)
            .then(async function (response) {
                let tpho = response.data.TinhThanhTitle;
                let quan = response.data.QuanHuyenTitle;
                let phuong = response.data.Title;
                let diachi = address + ', ' + phuong + ', ' + quan + ', ' + tpho;
                var salt = bcrypt.genSaltSync(10); // Chuỗi cộng thêm vào mật khẩu để mã hoá.
                var pass_mahoa = bcrypt.hashSync(mk, salt);   // Mã hoá password.
                let data = {
                    admin: email,
                    matkhau: pass_mahoa,
                    tennv: name,
                    hinh: img,
                    diachi: diachi,
                    sodienthoai: phone,
                    quyen: permission
                };
                let query = await modelAdmin.insert_Admin(data);
                res.status(200).json({ status: "Success", message: query });
            })
            .catch(function (error) {
                res.status(400).json({ status: "Fail", message: "Lỗi GET DETAIL DISTRICT !!!", error: error });
            });
    } else {
        var salt = bcrypt.genSaltSync(10);
        var pass_mahoa = bcrypt.hashSync(mk, salt);
        let data = {
            admin: email,
            matkhau: pass_mahoa,
            tennv: name,
            hinh: img,
            diachi: address,
            sodienthoai: phone,
            quyen: permission
        };
        let query = await modelAdmin.insert_Admin(data);
        res.status(200).json({ status: "Success", message: query });
    };
});
// Đăng nhập
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } =  req.body;
    // 1) Check if email & password exists
    if (!email || !password) {
        return res.status(400).json({ status: "Fail", message: "Vui lòng cung cấp email and password !" });
    };
    // 2) Check if user exist and passowrd is correct
    const admin = await modelAdmin.check_Admin(email);
    if(admin == -1 || admin.trangthai == 0 || (bcrypt.compareSync(password, admin.matkhau)) == false) {
        return res.status(400).json({ status: "Fail", message: "Không đúng email, password hay tài khoản bị khóa, vui lòng kiểm tra lại thông tin !" });
    };
    // 3) If everything Ok
    createSendToken(admin, 200, res);
});
// Đăng xuất
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'Success', message: "Đăng xuất thành công !" });
};
// thêm trạng thái đơn hàng
exports.postStatusOrder = catchAsync(async (req, res, next) => {
    const data = {
        trangthai: req.body.trangthai,
        tentt: req.body.tentt,
    };
    if(!data.trangthai || !data.tentt ) {
        return res.status(400).json({ status: "Fail", message: "Thiếu thông tin, thêm trạng thái đơn hàng thất bại !" });
    };
    const sttOrder = await modelAdmin.status_Order(data.trangthai);
    if(data.trangthai == sttOrder.trangthai) {
        return res.status(400).json({ status: "Fail", message: "Trạng thái này đã tồn tại vui lòng nhập lại !" });
    };
    try {
        let query = await modelAdmin.insert_Status_Or(data);
        res.status(200).json({ status: "Success", message: query });
    } catch (error) {
        res.status(400).json({ status: "Fail", message: "Lỗi... ! Thêm trạng thái thất bại !", error: error });
    };
});


        // PUT:
// Cập nhật thông tin tài khoản
exports.putEditProfile = catchAsync(async (req, res, next) => {
    try {
        let id = req.body.adminId;
        const admin = await modelAdmin.get_Admin_Id(id);
        if(admin == -1) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Không tìm thấy admin này !" 
            });
        };
        let mk = req.body.pass;
        let ten = req.body.name;
        let hinh = req.body.img;
        let diachi = req.body.address;
        let sdt = req.body.phone;
        let quyen = req.body.permission;
        //let trangthai = req.body.trangthai;
        //let ward = req.body.ward;
        if(ten == undefined || diachi == undefined || sdt == undefined || quyen == undefined) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu thông tin ! Cập nhật thất bại !" 
            });
        };
        if(!hinh) {
            hinh = "undefined";
        };
        if(mk != admin.matkhau) {
            var salt = bcrypt.genSaltSync(10); // Chuỗi cộng thêm vào mật khẩu để mã hoá.
            mk = bcrypt.hashSync(mk, salt);
        };
        let query = await modelAdmin.update_Profile_Admin(id, ten, mk, hinh, diachi, sdt, quyen);
        return res.status(200).json({ 
            status: "Success", 
            message: query 
        });
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Lỗi....!", 
            error: error 
        });
    };
});
// Cập nhật trạng thái cho admnin
exports.putEditStatusAdmin = catchAsync(async (req, res, next) => {
    const id = req.body.adminId;
    const admin = await modelAdmin.get_Admin_Id(id);
    if(admin == -1) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Không tìm thấy admin này !" 
        });
    };
    const stt = req.body.stt;
    if(id == undefined && stt == undefined){
        return res.status(400).json({ status: "Fail", message: "Thiếu thông tin. Cập nhật trạng thái thất bại !" });
    };
    try {
        if(stt == 0) {
            let query_Lock = await modelAdmin.lock_Admin(id);
            return res.status(200).json({ 
                status: "Success", 
                message: query_Lock 
            });
        } else if(stt == 1) {
            let query_Unlock = await modelAdmin.unlock_Admin(id);
            return res.status(200).json({ 
                status: "Success", 
                message: query_Unlock 
            });
        } else
            return res.status(400).json({ status: "Fail", message: "Lỗi...Cập nhật trạng thái tài khoản admin thất bại!" });
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    };
});
// Đổi mật khẩu
exports.putEditPassword = catchAsync(async (req, res, next) => {
    const id = req.body.adminId;
    const admin = await modelAdmin.get_Admin_Id(id);
    if(admin == -1) {
        return res.status(400).json({ status: "Fail", message: "Không tìm thấy admin này !" });
    };
    let email = req.body.email;
    let password = req.body.password;
    let newPassword = req.body.newPassword;
    let confirmPassword = req.body.confirmPassword;
    let kq = bcrypt.compareSync(password, admin.matkhau);
    try {
        if(email == admin.admin && kq == true){
            if(newPassword == confirmPassword){
                var salt = bcrypt.genSaltSync(10);
                var pass_mahoa = bcrypt.hashSync(newPassword, salt);
                let query = await modelAdmin.update_Password(adminId, pass_mahoa);
                res.status(200).json({ status: "Success", message: query });
            } else
                res.status(400).json({ "status": "Fail", "message": "Mật khẩu cũ và mật khẩu mới không trùng nhau, vui lòng nhập lại !" });
        } else
            res.status(400).json({ "status": "Fail", "message": "Sai Email hoặc mật khẩu cũ không đúng ! Vui lòng kiểm tra lại thông tin !" });
    } catch (error) {
        res.status(400).json({ "status": "Fail", "message": "Lỗi...! Đổi mật khẩu thất bại !" });
    }
});
// Cập nhật thông tin của trạng thái đơn hàng
exports.putEditStatusOrder = catchAsync(async (req, res, next) => {
    const trangthai = req.body.trangthai;
    const statusOrder = await modelAdmin.status_Order(trangthai);
    if(statusOrder == -1) {
        return res.status(400).json({ status: "Fail", message: "Không tìm thấy trạng thái đơn hàng này !" });
    };
    const tentt = req.body.tentt;
    if(trangthai == undefined && tentt == undefined){
        return res.status(400).json({ "status": "Fail", "message": "Thiếu thông tin trạng thái, cập nhật thất bại !" });
    }else{
        try {
            let query = await modelAdmin.update_Status_Or(trangthai, tentt);
            res.status(200).json({ status: "Success", message: query });
        } catch (error) {
            res.status(400).json({ "status": "Fail", "message": "Lỗi...! Cập nhật trạng thái thất bại !", "error": error });
        };
    };
});


        // DELETE:
// Xoá trạng thái đơn hàng
exports.deleteStatusOrder = catchAsync(async (req, res, next) => {
    let trangthai = req.params.id;
    if(!trangthai){
        return res.status(400).json({ status: "Fail", message: "Vui lòng cung cấp mã trạng thái !" });
    };
    const sttOrder = await modelAdmin.status_Order(trangthai);
    if(sttOrder == -1) {
        return res.status(400).json({ status: "Fail", message: "Không tìm thấy trạng thái đơn hàng này !" });
    };
    try {
        let query = await modelAdmin.delete_Status_Order(trangthai);
        if(query == -1){
            res.status(400).json({ status: "Fail", message: "Lỗi...Không thể xoá trạng thái này !" });
        }else
            res.status(200).json({ status: "Success", message: "Xoá trạng thái đơn hàng thành công !" });     
    } catch (error) {
        res.status(400).json({ status: "Fail", message: "Lỗi...! Xoá trạng thái đơn hàng thất bại !", error: error });
    };
});


/* exports.getListAdmins = catchAsync(async (req, res, next) => {

}); */