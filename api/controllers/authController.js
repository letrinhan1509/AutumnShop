const jwt = require("jsonwebtoken");
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const modelAdmin = require('../models/model_admin');
const modelUser = require('../models/model_user');


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
    console.log(req.cookies.jwtAdmin);
    if(req.cookies.jwtAdmin) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwtAdmin,
                process.env.JWT_SECRET_ADMIN
            );
            // 2) Check if user still exists
            const adminExist = await modelAdmin.get_Admin_Id(decoded.id);
            if (adminExist == -1) {
                return res.status(403).json({ 
                    status: "Fail", 
                    message: "This token does not exist !"
                });
            } else {
                return next();
            }
            //return next();
        } catch (error) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Something went wrong!", 
                error: error 
            });
        };
    };
    return res.status(401).json({ 
        status: "Fail", 
        message: "No login !"
    });
};

exports.verifyTokenUser = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                reject(error);
            } else
                resolve(decoded);
        });
    });
};

exports.isLoggedInUser = async (req, res, next) => {
    if(req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            // 2) Check if user still exists
            const currentUser = await modelUser.get_By_Id(decoded.id);
            if (currentUser == -1) {
                return res.status(400).json({ 
                    status: "Fail", 
                    message: "This token does not exist !"
                });
            } else {
                return next();
            }
        } catch (error) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Something went wrong!", 
                error: error 
            });
        };
    };
    next();
};

exports.protectUser = Model => catchAsync(async (req, res, next) => {
    //1) getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      console.log(token);
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    // 3) Check if user still exists
    const currentUser = await Model.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
  
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});

exports.restrictTo = catchAsync(async (req, res, next) => {
    const admin = await this.isLoggedInUser(req.cookies.jwtAdmin);
    if(admin.quyen == 'Admin' || admin.quyen == 'QLCH') {
        return next();
    } else {
        return res.status(403).json({
            status: 'Fail',
            message: 'Bạn không có quyền truy cập vào đây !'
        })
    }
});

module.exports = {
    signToken: signToken,
    verifyToken: verifyToken
};