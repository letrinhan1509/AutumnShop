const catchAsync = require('../utils/catchAsync');
const modelSize = require('../models/model_size');


                    // SIZE CONTROLLER

// GET: Danh sách size của sản phẩm
exports.getListSize = catchAsync(async (req, res, next) => {
    try {
        let listSize = await modelSize.list_size();
        return res.status(200).json({ 
            status: "Success", 
            listSize: listSize
        });
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    }
});
// GET: Chi tiết 1 size của sản phẩm
exports.getSize = catchAsync(async (req, res, next) => {
    try {
        let masize = req.params.id;
        const size = await modelSize.get_Size_Id(masize);
        return res.status(200).json({ 
            status: "Success", 
            size: size
        });
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    }
});
// POST: Thêm mới 1 size của sản phẩm
exports.postCreateSize = catchAsync(async (req, res, next) => {
    try {
        let data = { tensize: req.body.tensize };
        if(!data.tensize) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu thông tin, vui lòng kiểm tra lại !"
            });
        };
        const sizeExist = await modelSize.get_Size_Name(data.tensize);
        if(sizeExist == -1) {
            const size = await modelSize.insert_size(data);
            return res.status(200).json({ 
                status: "Success", 
                message: size
            });
        } else {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Tên size của sản phẩm này đã tồn tại, vui lòng nhập tên khác !"
            });
        };
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    }
});
// PUT: Cập nhật tên size sản phẩm
exports.putEditSize = catchAsync(async (req, res, next) => {
    try {
        let masize = req.body.masize;
        let tensize = req.body.tensize;
        if(!masize || !tensize) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu thông tin, vui lòng kiểm tra lại !"
            });
        };
        const sizeExist = await modelSize.get_Size_Id(masize);
        if(sizeExist == -1) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Không tìm thấy size sản phẩm này, vui lòng kiểm tra lại !"
            });
        } else {
            const nameExist = await modelSize.get_Size_Name(tensize);
            if(nameExist == -1 || masize == nameExist.masize) {
                let query = await modelSize.update_size(masize, tensize);
                return res.status(200).json({ 
                    status: "Success", 
                    message: query
                });
            } else {
                return res.status(400).json({ 
                    status: "Fail", 
                    message: "Trùng tên size sản phẩm, vui lòng nhập tên khác !"
                });
            };
        };
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    }
});
// DELETE: Xoá size sản phẩm
exports.deleteSize = catchAsync(async (req, res, next) => {
    try {
        let masize = req.body.masize;
        if(!masize) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu mã size sản phẩm, vui lòng kiểm tra lại !"
            });
        };
        const sizeExist = await modelSize.get_Size_Id(masize);
        if(sizeExist == -1) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Không tìm thấy size sản phẩm này, vui lòng kiểm tra lại !"
            });
        } else {
            let queryDelete = await modelSize.delete_size(masize);
            if(queryDelete == -1) {
                return res.status(400).json({ 
                    status: "Fail", 
                    message: "Có ràng buộc khoá ngoại. Không thể xoá size sản phẩm này !"
                });
            } else {
                return res.status(200).json({ 
                    status: "Success", 
                    message: queryDelete
                });
            };
        };
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    }
});