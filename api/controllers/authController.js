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
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
};

const isAuth = async (req, res, next) => {
    // Lấy token được gửi lên từ phía client:
    const tokenFromClient = req.body.token || req.headers["auth-token"];
    console.log(tokenFromClient);
    if (tokenFromClient) {
        // Nếu tồn tại token:
        try {
            // Thực hiện giải mã token xem có hợp lệ hay không?
            const decoded = verifyToken(tokenFromClient);
            // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
            req.jwtDecoded = decoded;
            // Cho phép req đi tiếp sang controller.
            next();
        } catch (error) {
            // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
            // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
            return res.status(401).json({
                status: 'Fail',
                message: 'Unauthorized.',
                error: error
            });
        }
    } else {
        // Không tìm thấy token trong request:
        return res.status(403).send({
            status: 'Fail',
            message: 'No token provided.',
        });
    }
}


module.exports = {
    signToken: signToken,
    verifyToken: verifyToken,
    isAuth: isAuth
};