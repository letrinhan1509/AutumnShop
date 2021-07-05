const jwt = require("jsonwebtoken");


// Tạo token:
const signToken = (user) => {
    return new Promise((resolve, reject) => {
        // Định nghĩa những thông tin của user muốn lưu vào token ở đây:
        const userData = {
            _id: user.makh,
            email: user.email,
            ten: user.tenkh
        }
        // Thực hiện ký và tạo token:
        jwt.sign({ data: userData }, process.env.JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN },
            (error, token) => {
            if (error) {
                return reject(error);
            }
            resolve(token);
        });
    });
};

// Xác thực token:
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


module.exports = {
    signToken: signToken,
    verifyToken: verifyToken
};