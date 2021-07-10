var express = require('express');
var router = express.Router();

const cartController = require('../controllers/cartController');


            // GET:
router.get('/', cartController.getListCarts);                   // Danh sách tất cả giỏ hàng.
router.get('/:id', cartController.getCart);                     // Chi tiết giỏ hàng.
router.get('/khach-hang/:id', cartController.getUserCarts);     // Giỏ hàng theo mã khách hàng.
router.get('/san-pham/:id', cartController.getCartProduct);     // Giỏ hàng theo mã sản phẩm.          
            // POST:
router.put('/them-san-pham', cartController.postAddCart);       // Thêm sản phẩm vào giỏ hàng.  
            // PUT:
router.put('/cap-nhat-san-pham', cartController.putEditCart);   // Cập nhật 1 sản phẩm trong giỏ hàng.
            // DELETE:
router.delete('/xoa-san-pham/:id', cartController.deleteCart);  // Xoá 1 sản phẩm trong giỏ hàng thông qua id giỏ hàng.


module.exports = router;