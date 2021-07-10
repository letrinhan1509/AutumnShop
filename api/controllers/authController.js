const jwt = require("jsonwebtoken");
const { promisify } = require('util');

const modelAdmin = require('../models/model_admin');


// Tạo token cho admin
const signToken = (user) => {
    return new Promise((resolve, reject) => {
        // Định nghĩa những thông tin của user muốn lưu vào token ở đây:
        const userData = {
            _id: user.manv,
            email: user.admin
        }
        // Thực hiện ký và tạo token:
        jwt.sign({ data: userData }, process.env.JWT_SECRET_ADMIN,
            { expiresIn: JWT_EXPIRES_IN },
            (error, token) => {
            if (error) {
                return reject(error);
            }
            resolve(token);
        });
    });
};
// Xác thực token cho admin
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_ADMIN, (error, decoded) => {
            if (error) {
                reject(error);
            } else
                resolve(decoded);
        });
    });
};

exports.isLoggedIn = async (req, res, next) => {
    if(req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            // 2) Check if user still exists
            const currentUser = await modelAdmin.get_Admin_Id(decoded.id);
            if (currentUser != -1) {
                return next();
            };

            return next();
        } catch (error) {
            res.status(400).json({ 
                status: "Fail", 
                message: "Lỗi... !", 
                error: error 
            });
        };
    };
    next();
};

module.exports = {
    signToken: signToken,
    verifyToken: verifyToken
};