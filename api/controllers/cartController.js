const catchAsync = require('../utils/catchAsync');
const modelCart = require('../models/model_cart');


                    //  CART CONTROLLER:

        // GET:
// GET List Cart
exports.getListCarts = catchAsync(async (req, res, next) => {
    try {
        let listCarts = await modelCart.list_Carts();
        if(listCarts == 0)
            res.status(400).json({ status: "Fail", message: "Danh sách giỏ hàng hiện đang trống !!!" });
        else
            res.status(200).json({ status: "Success", listCarts: listCarts });
    } catch (error) {
        res.status(400).json({ status: "Fail", error: error });
    };
});
// GET Cart
exports.getCart = catchAsync(async (req, res, next) => {
    try {
        let id = req.params.id;
        let cart = await modelCart.get_Cart(id);
        if(cart == 0)
            res.status(400).json({ status: "Fail", message: "Mã giỏ hàng không tồn tại !" });
        else
            res.status(200).json({ status: "Success", cart: cart });
    } catch (error) {
        res.status(400).json({ status: "Fail", error: error });
    };
});
// GET Giỏ hàng của khách hàng
exports.getUserCarts = catchAsync(async (req, res, next) => {
    let idKH = req.params.id;
    if(!idKH) {
        return res.status(400).json({ status: "Fail", message: "Vui lòng cung cấp mã khách hàng !" });
    };
    try {
        let cart = await modelCart.get_By_userId(idKH);
        if(cart == 0)
            res.status(400).json({ status: "Fail", message: "Giỏ hàng của bạn hiện đang trống!!!" });
        else
            res.status(200).json({ status: "Success", cart: cart });
    } catch (error) {
        res.status(400).json({ status: "Fail", error: error });
    };
});
// GET Giỏ hàng theo mã sản phẩm
exports.getCartProduct = catchAsync(async (req, res, next) => {
    let id = req.params.id;
    if(!id) {
        return res.status(400).json({ status: "Fail", message: "Vui lòng cung cấp mã !" });
    };
    try {
        let cart = await modelCart.get_By_productId(id);
        if(cart == 0)
            res.status(400).json({ status: "Fail", message: "Mã sản phẩm: " + `${id}` + " không có trong giỏ hàng !!!" });
        else
            res.status(200).json({ "status": "Success", cart: cart });
    } catch (error) {
        res.status(400).json({ status: "Fail", error: error });
    }
});


        // POST:
// Thêm sản phẩm vào giỏ hàng
exports.postAddCart = catchAsync(async (req, res, next) => {
    const data = {
        makh: req.body.makh,
        masp: req.body.masp,
        gia: req.body.gia,
        giagiam: req.body.giagiam,
        soluong: req.body.soluong,
        thanhtien: req.body.thanhtien
    };
    if(!data.makh || !data.masp || !data.gia || !data.soluong || !data.thanhtien) {
        return res.status(400).json({ status: "Fail", message: "Thiếu thông tin, thêm sản phẩm vào giỏ hàng thất bại !" });
    };
    try {
        let query = await modelCart.create(data);
        res.status(200).json({ status: "Success", message: query });
    } catch (error) {
        res.status(400).json({ status: "Fail", message: "Thêm sản phẩm vào giỏ hàng thất bại !!!", error: error });
    };
});


        // PUT:
// Cập nhật số lượng sản phẩm trong giỏ hàng
exports.putEditCart = catchAsync(async (req, res, next) => {
    let data = {
        magiohang: req.body.magiohang,
        giagiam: req.body.giagiam,
        soluong: req.body.soluong,
        thanhtien: req.body.thanhtien
    };
    if(!data.magiohang || !data.soluong || !data.thanhtien) {
        return res.status(400).json({ status: "Fail", message: "Thiếu thông tin, cập nhật giỏ hàng thất bại !" });
    };
    try {
        let query = await modelCart.put(data);
        res.status(200).json({ status: "Success", message: query  });
    } catch (error) {
        res.status(400).json({ status: "Fail", message: "Cập nhật sản phẩm trong giỏ hàng thất bại !!!", error: error });
    };
});


        // DELETE
// Xoá 1 sản phẩm khỏi giỏ hàng
exports.deleteCart = catchAsync(async (req, res, next) => {
    let id = req.params.id;
    if(!id) {
        return res.status(400).json({ status: "Fail", message: "Vui lòng cung cấp mã !" });
    }
    try {
        let query = await modelCart.delete(id);
        res.status(200).json({ status: "Success", "message": query });
    } catch (error) {
        res.status(400).json({ status: "Fail", message: "Xoá sản phẩm trong giỏ hàng không thành công!!!", error: error });
    };
});