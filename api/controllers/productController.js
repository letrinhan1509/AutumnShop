const catchAsync = require('../utils/catchAsync');
const modelProduct = require('../models/model_product'); //nhúng model products vào controller này để sử dụng
const modelComment = require('../models/model_comment');


                    // PRODUCT CONTROLLER

        // GET

exports.getListProducts = catchAsync(async (req, res, next) => {
    try {
        let listProducts = await modelProduct.list_products();
        return res.status(200).json({ 
            status: "Success", 
            data: listProducts
        });
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    }
});

exports.getProduct = catchAsync(async (req, res, next) => {
    try {
        let masp = req.params.id;
        if(!masp) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu mã sản phẩm, vui lòng kiểm tra lại !"
            });
        };
        const productExist = await modelProduct.get_By_Id(masp);
        if(productExist == -1) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Không tìm thấy sản phẩm này, vui lòng kiểm tra lại !"
            });
        } else {
            const listCmts = await modelComment.get_by_productId(masp);
            return res.status(200).json({ 
                status: "Success", 
                dataSpham: productExist,
                dataCmt: listCmts
            });
        }
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    }
});


        // POST

exports.postProduct = catchAsync(async (req, res, next) => {
    try {
        let trangthai = req.body.trangthai;
        const data = {
            //code: (req.body.maloai + req.body.size + req.body.mau),
            code: req.body.code,
            tensp: req.body.ten,
            soluong: req.body.soluong,
            size: req.body.size,
            mau: req.body.mau,
            gia: req.body.gia,
            hinh: req.body.img,
            hinhchitiet: req.body.hinhchitiet,
            mota: req.body.mota,
            mansx: req.body.mansx,
            maloai: req.body.maloai,
            madm: req.body.madm,
        };
        console.log(req.body);
        if(!data.tensp || !data.soluong || !data.size || !data.mau || !data.gia || !data.hinh || !data.maloai || !data.madm) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu thông tin sản phẩm, vui lòng kiểm tra lại !"
            });
        };
        const codeExist = await modelProduct.check_Code(data.code);
        if(codeExist == -1) {
            // Mã code không bị trùng:
            const query = await modelProduct.create_product(data);
            if(query == 1) {
                return res.status(200).json({ 
                    status: "Success", 
                    message: productExist
                });
            } else {
                return res.status(400).json({ 
                    status: "Fail", 
                    message: "Thêm sản phẩm thất bại !"
                });
            }
        } else {
            // Trùng mã code:
            return res.status(400).json({ 
                status: "Fail", 
                message: "Mã CODE của sản phẩm này đã tồn tại, vui lòng nhập mã CODE khác !"
            });
        }
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    }
});


        // PUT

exports.putEditProduct = catchAsync(async (req, res, next) => {
    try {
        let masp = req.params.id;
        if(!masp) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu mã sản phẩm, vui lòng kiểm tra lại !"
            });
        };
        const productExist = await modelProduct.get_By_Id(masp);
        if(productExist == -1) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Không tìm thấy sản phẩm này, vui lòng kiểm tra lại !"
            });
        } else {
            return res.status(200).json({ 
                status: "Success", 
                message: productExist
            });
        }
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    }
});


// DELETE
exports.deleteProduct = catchAsync(async (req, res, next) => {
    try {
        let masp = req.params.id;
        if(!masp) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu mã sản phẩm, vui lòng kiểm tra lại !"
            });
        };
        const productExist = await modelProduct.get_By_Id(masp);
        if(productExist == -1) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Không tìm thấy sản phẩm này, vui lòng kiểm tra lại !"
            });
        } else {
            const query = await modelProduct.delete(masp);
            if(query == -1) {
                return res.status(400).json({ 
                    status: "Fail", 
                    message: "Sản phẩm có trong chi tiết đơn hàng! Không thể xoá sản phẩm !"
                });
            } else {
                return res.status(200).json({ 
                    status: "Success", 
                    message: "Xoá sản phẩm thành công !"
                });
            }
        }
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    }
});