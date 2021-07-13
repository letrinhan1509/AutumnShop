const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const modelOrder = require('../models/model_order');
const modelUser = require('../models/model_user');


                    // ORDER CONTROLLER

        // GET
// GET: List order 
exports.getListOrders = catchAsync(async (req, res, next) => {
    try {
        let listOrders = await modelOrder.list_Orders();
        return res.status(200).json({ 
            status: "Success",
            data: listOrders
        });
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    }
});
// GET: An order
exports.getOrder = catchAsync(async (req, res, next) => {
    try {
        let orderId = req.params.id;
        if(!orderId) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu thông tin, vui lòng kiểm tra lại !"
            });
        };
        let order = await modelOrder.get_By_Id(orderId);
        console.log(order.trangthai);
        if(order == -1) {
            return res.status(404).json({ 
                status: "Fail", 
                message: "Mã đơn hàng " + `${orderId}` + " này không tồn tại, vui lòng kiểm tra lại !"
            });
        } else {
            return res.status(200).json({ 
                status: "Success", 
                data: order
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
// GET: List detail order
exports.getListDetailOrders = catchAsync(async (req, res, next) => {
    try {
        let orderId = req.params.id;
        if(!orderId) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu thông tin, vui lòng kiểm tra lại !"
            });
        };
        const orderExist = await modelOrder.get_By_Id(orderId);
        if(orderExist == -1) {
            return res.status(404).json({ 
                status: "Fail", 
                message: "Mã đơn hàng " + `${orderId}` + " này không tồn tại, vui lòng kiểm tra lại !"
            });
        } else {
            const listDetails = await modelOrder.get_detailOrder(orderId);
            return res.status(200).json({ 
                status: "Success", 
                data: listDetails
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
// GET: Order list by customer code
exports.getListOrderUser = catchAsync(async (req, res, next) => {
    try {
        let makh = req.params.id;
        if(!makh) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu thông tin, vui lòng kiểm tra lại !"
            });
        };
        const userExist = await modelUser.get_By_Id(makh);
        if(userExist == -1) {
            return res.status(404).json({ 
                status: "Fail", 
                message: "Khách hàng không tồn tại, vui lòng kiểm tra lại !"
            });
        };
        const listOrder = await modelOrder.get_By_userId(makh);
        if(listOrder == -1) {
            return res.status(200).json({ 
                status: "Success", 
                message: "Không có đơn hàng nào !",
                data: []
            });
        } else {
            return res.status(200).json({ 
                status: "Success", 
                message: "Lấy danh sách đơn hàng của khách hàng " + `${userExist.tenkh}` + " thành công !",
                data: listOrder
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
// GET: Order list by phone number
exports.getListOrderPhone = catchAsync(async (req, res, next) => {
    try {
        let phone = req.params.phone;
        if(!phone) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu số điện thoại, vui lòng kiểm tra lại !"
            });
        };
        const listOrder = await modelOrder.get_By_Phone(phone);
        if(listOrder == -1) {
            return res.status(200).json({ 
                status: "Success", 
                message: "Không có đơn hàng nào cho số điện thoại này !",
                data: []
            });
        } else {
            return res.status(200).json({ 
                status: "Success", 
                message: "Lấy đơn hàng theo số điện thoại: " + `${phone}` + " thành công !",
                data: listOrder
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
// POST: Create an order 
exports.postCreateOrder = catchAsync(async (req, res, next) => {
    let makh = req.body.order.makh;
    let tenkh = req.body.order.tenkh;
    let email = req.body.order.email;
    let sodienthoai = req.body.order.sodienthoai;
    let address = req.body.order.address;
    let ward = req.body.order.ward;
    let tongtien = req.body.sumpay;
    let makm = req.body.makm;
    let ship = req.body.ship;
    let ghichu = req.body.note;
    let hinhthuc = req.body.pay;
    let vanchuyen = req.body.delivery;
    var today = new Date();
    var ngaydat = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let cart = req.body.order.cart; // Mảng danh sách các sản phẩm

    try {
        if(!tenkh || !email || !sodienthoai || !address || !ship || !tongtien || !hinhthuc || !vanchuyen || !ward) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu thông tin đơn hàng, vui lòng kiểm tra lại thông tin !"
            });
        };
        if(!cart) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Giỏ hàng rỗng không thể tạo đơn hàng, vui lòng kiểm tra lại giỏ hàng !"
            });
        };
        var url = "https://thongtindoanhnghiep.co/api/ward/" + ward;
        const list = await axios.get(url);
        let diachi = address+ ', ' +list.data.Title+ ', ' +list.data.QuanHuyenTitle+ ', ' +list.data.TinhThanhTitle;
        if(makh == undefined){
            // Tạo đơn hàng cho khách không có tài khoản
            let queryNotUserDiscount = await modelOrder.insert_Order(tenkh, email, sodienthoai, diachi, ship, tongtien, ghichu, makm, hinhthuc, vanchuyen, ngaydat, cart);
            return res.status(200).json({
                status: "Success",
                message: queryNotUserDiscount
            });
        } else {
            // Tạo đơn hàng cho khách có tài khoản
            const userExist = await modelUser.get_By_Id(makh);
            if(userExist == -1) {
                return res.status(400).json({
                    status: "Fail", 
                    message: "Tài khoản khách hàng này không tồn tại, vui lòng kiểm tra lại !"
                });
            } else {
                let queryUserDiscount = await modelOrder.insert_Order_User(makh, tenkh, email, sodienthoai, diachi, ship, tongtien, ghichu, makm, hinhthuc, vanchuyen, ngaydat, cart);
                return res.status(200).json({
                    status: "Success",
                    message: queryUserDiscount
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


        // PUT
// PUT: Update order status
exports.putEditStatus = catchAsync(async (req, res, next) => {
    try {
        let data = {
            madonhang: req.body.madonhang,
            ngaygiao: req.body.ngaygiao,
            trangthai: req.body.trangthai
        };
        if(!data.madonhang || !data.trangthai) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu thông tin, vui lòng kiểm tra lại !"
            });
        };
        const orderExist = await modelOrder.get_By_Id(data.madonhang);
        if(orderExist == -1) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Đơn hàng này không tồn tại, vui lòng kiểm tra lại mã đơn hàng !"
            });
        } else {
            // Đơn hàng tồn tại
            let query = await modelOrder.update_Status(data);
            return res.status(200).json({
                status: "Success",
                message: query
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
// Delete order
exports.deleteOrder = catchAsync(async (req, res, next) => {
    try {
        let madh = req.params.id;
        if(!madh) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu mã đơn hàng, vui lòng kiểm tra lại !"
            });
        };
        const orderExist = await modelOrder.get_By_Id(madh);
        if(orderExist == -1) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Đơn hàng này không tồn tại, vui lòng kiểm tra lại !"
            });
        } else {
            if(orderExist.trangthai == 2) {
                return res.status(400).json({ 
                    status: "Fail", 
                    message: "Đơn hàng đang được giao không thể huỷ !"
                });
            } else if(orderExist.trangthai == 3) {
                return res.status(400).json({ 
                    status: "Fail", 
                    message: "Đơn hàng đã hoàn thành không thể huỷ !"
                });
            };
            if(orderExist.trangthai == 4) {
                return res.status(400).json({ 
                    status: "Fail", 
                    message: "Đơn hàng đã được huỷ !"
                });
            };
            if(orderExist.trangthai == 0 || orderExist.trangthai == 1) {
                const query_delete = await modelOrder.delete(madh);
                return res.status(200).json({ 
                    status: "Success", 
                    message: query_delete
                });
            };
        }
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    }
});