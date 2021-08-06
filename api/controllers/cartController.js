const catchAsync = require('../utils/catchAsync');
const modelCart = require('../models/model_cart');


                    //  CART CONTROLLER:

        // GET:
// GET List Cart
exports.getListCarts = catchAsync(async (req, res, next) => {
    try {
        let listCarts = await modelCart.list_Carts();
        if(listCarts == 0) {
            return res.status(200).json({ 
                status: "Success", 
                message: "Danh sách giỏ hàng hiện đang trống !!!", 
                listCarts: []
            });
        } else {
            return res.status(200).json({ status: "Success", message: "Danh sách giỏ hàng của bạn !!!", listCarts: listCarts });
        }
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    };
});
// GET Cart
exports.getCart = catchAsync(async (req, res, next) => {
    try {
        let id = req.params.id;
        let cart = await modelCart.get_Cart(id);
        if(cart == 0){
            return res.status(400).json({ status: "Fail", message: "Mã giỏ hàng không tồn tại, vui lòng kiểm tra lại !" });
        } else {
            return res.status(200).json({ status: "Success", cart: cart });
        };
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    };
});
// GET Giỏ hàng của khách hàng
exports.getUserCarts = catchAsync(async (req, res, next) => {
    try {
        let idKH = req.params.id;
        if(!idKH) {
            return res.status(400).json({ status: "Fail", message: "Vui lòng cung cấp mã khách hàng !" });
        };
        let cart = await modelCart.get_By_userId(idKH);
        if(cart == 0) {
            return res.status(200).json({ 
                status: "Success", 
                message: "Giỏ hàng của bạn hiện đang trống!!!", 
                cart: []
            });
        } else {
            return res.status(200).json({ status: "Success", cart: cart });
        }
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    };
});
// GET Giỏ hàng theo mã sản phẩm
exports.getCartProduct = catchAsync(async (req, res, next) => {
    try {
        let id = req.params.id;
        if(!id) {
            return res.status(400).json({ status: "Fail", message: "Vui lòng cung cấp mã !" });
        };
        let cart = await modelCart.get_By_productId(id);
        if(cart == 0)
            return res.status(400).json({ status: "Fail", message: "Mã sản phẩm: " + `${id}` + " không có trong giỏ hàng !!!" });
        else
            return res.status(200).json({ "status": "Success", cart: cart });
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    }
});


        // POST:
// Thêm sản phẩm vào giỏ hàng
exports.postAddCart = catchAsync(async (req, res, next) => {
    try {
        const data = {
            makh: req.body.makh,
            masp: req.body.masp,
            size: req.body.size,
            mau: req.body.mau,
            gia: req.body.gia,
            giagiam: req.body.giagiam,
            //soluong: req.body.soluong
        };
        if(!data.makh || !data.masp || !data.size || !data.mau || data.gia == undefined) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu thông tin, thêm sản phẩm vào giỏ hàng thất bại !" 
            });
        };
        /* if(data.giagiam == undefined) {
            data.thanhtien = data.soluong * data.gia;
        } else {
            data.thanhtien = data.soluong * data.giagiam;
        }; */
        const cartExist = await modelCart.get_By_userId(data.makh);
        if(cartExist == 0) {
            // Khách hàng chưa có sản phẩm trong giỏ hàng:
            let query = await modelCart.create(data);
            return res.status(200).json({ status: "Success", message: query });
        } else {
            // Khách hàng đã có sản phẩm trong giỏ hàng:
            const productExist = await modelCart.check_productId(data.makh, data.masp, data.size, data.mau);
            if(productExist == 0) {
                // Sản phẩm chưa có trong giỏ hàng => thêm mới vào giỏ hàng:
                let query = await modelCart.create(data);
                return res.status(200).json({ status: "Success", message: query });
            } else {
                // Sản phẩm đã có trong giỏ hàng => tăng số lượng:
                let soluong = productExist.soluong + 1;
                let queryAmount = await modelCart.put_Amount(productExist.magiohang, soluong);
                return res.status(200).json({ status: "Success", message: queryAmount });
            };
        }
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    };
});


        // PUT:
// Cập nhật số lượng sản phẩm trong giỏ hàng
exports.putEditCart = catchAsync(async (req, res, next) => {
    let data = {
        makh: req.body.makh,
        masp: req.body.masp,
        magiohang: req.body.magiohang,
        giagiam: req.body.giagiam,
        soluong: req.body.soluong,
        thanhtien: req.body.thanhtien
    };
    if(!data.magiohang || !data.soluong || !data.thanhtien) {
        return res.status(400).json({ status: "Fail", message: "Thiếu thông tin, cập nhật giỏ hàng thất bại !" });
    };
    try {
        const cartExist = await modelCart.get_Cart(data.magiohang);
        if(cartExist == 0) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Không tìm thấy sản phẩm này trong giỏ hàng"
            });
        } else {
            const query = await modelCart.put(data);
            const cart = await modelCart.get_By_userId(data.makh);
            return res.status(200).json({ 
                status: "Success", 
                message: query, 
                cart: cart
            });
        }
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    };
});


        // DELETE
// Delete: Xoá 1 sản phẩm khỏi giỏ hàng
exports.deleteCart = catchAsync(async (req, res, next) => {
    let id = req.params.id;
    if(!id) {
        return res.status(400).json({ status: "Fail", message: "Vui lòng cung cấp mã giỏ hàng !" });
    }
    try {
        let query = await modelCart.delete(id);
        return res.status(200).json({ status: "Success", "message": query });
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    };
});