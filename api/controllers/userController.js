const bcrypt = require("bcrypt");
const catchAsync = require('../utils/catchAsync');
const modelUser = require('../models/model_user');


                    // USER CONTROLLER

// GET
// GET: List of customers
exports.getListUsers = catchAsync(async (req, res, next) => {
    try {
        
    } catch (error) {
        return res.status(400).json({
            status: "Fail", 
            message: "Something went wrong",
            error: error
        });
    }
});


        // POST
// POST: Update user account information
exports.postEditUser = catchAsync(async (req, res, next) => {
    try {
        //let makm = req.body.makh;
        let email = req.body.email;
        let ten = req.body.username;
        let hinh = req.body.hinh;
        let diachi = req.body.diachi;
        let sdt = req.body.sdt;
        console.log(req.body);
        if(!email || !ten || !diachi || !sdt) {
            return res.status(400).json({
                status: "Fail",
                message: "Thiếu thông tin. Vui lòng kiểm tra lại thông tin !"
            });
        };
        const userExist = await modelUser.checkEmail(email);
        if(userExist == -1) {
            return res.status(400).json({
                status: "Fail",
                message: "Không tìm thấy tài khoản có email " + `${email}` + " này !"
            });
        };
        if(!hinh) {
            hinh = "undefined";
        };
        let query = await modelUser.updateProfileUser(email, ten, hinh, sdt, diachi);
        return res.status(200).json({ 
            status: "Success", 
            message: query
        });
    } catch (error) {
        return res.status(400).json({
            status: "Fail", 
            message: "Something went wrong",
            error: error
        });
    }
});


        // PUT
// PUT: Change Password
exports.putChangePassword = catchAsync(async (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let newPassword = req.body.newPassword;
        let confirmPassword = req.body.confirmPassword;

        if(!email || !password || !newPassword || !confirmPassword) {
            return res.status(400).json({
                status: "Fail",
                message: "Thiếu thông tin. Vui lòng kiểm tra lại thông tin !"
            });
        };
        let userExist = await modelUser.checkEmail(email);
        if(userExist == -1) {
            return res.status(400).json({
                status: "Fail",
                message: "Không tìm thấy tài khoản có email " + `${email}` + " này !"
            });
        };
        var kq = bcrypt.compareSync(password, userExist.matkhau);
        if(kq) {
            if(newPassword === confirmPassword) {
                var salt = bcrypt.genSaltSync(10);
                var pass_mahoa = bcrypt.hashSync(newPassword, salt);
                let query = await modelUser.updatePasswordUser(email, pass_mahoa);
                return res.status(200).json({ 
                    status: "Success", 
                    message: "Đổi mật khẩu thành công !" 
                });
            } else {
                return res.status(400).json({ 
                    status: "Fail", 
                    message: "Mật khẩu mới và xác nhận mật khẩu mới không trùng nhau, vui lòng nhập lại" 
                });
            };
        } else {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Mật khẩu cũ không đúng, vui lòng kiểm tra lại thông tin!" 
            });
        };
    } catch (error) {
        return res.status(400).json({
            status: "Fail", 
            message: "Something went wrong",
            error: error
        });
    }
});


        // DELETE
// Delete user
exports.deleteUser = catchAsync(async (req, res, next) => {
    try {
        
    } catch (error) {
        return res.status(400).json({
            status: "Fail", 
            message: "Something went wrong",
            error: error
        });
    }
});