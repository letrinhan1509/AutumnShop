const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');


            // API
    //GET
router.get('/', promotionController.getList);    // Danh sách tất cả các khuyến mãi (Voucher + Khuyến mãi theo sản phẩm)
router.get('/san-pham', promotionController.getPromotionListProduct);   // Danh sách các khuyến mãi theo sản phẩm
router.get('/voucher', promotionController.getDiscountCodeList);        // Danh sách các mã giảm giá (voucher)
router.get('/:id', promotionController.getDetailPromotion);     // Chi tiết 1 khuyến mãi theo "mã khuyến mãi"
router.get('/check-voucher/:ma', promotionController.getDetailPromotionVoucher);    // Chi tiết 1 khuyến mãi voucher theo mã voucher
    // POST
router.post('/them-voucher', promotionController.postPromotionCODE);    // Tạo chương trình khuyến mãi là voucher
router.post('/them-khuyen-mai/san-pham', promotionController.postPromotionProduct); // Tạo chương trình khuyến mãi theo sản phẩm
    // PUT:
router.put('/cap-nhat-voucher', promotionController.putEditPromotionCODE);  // Cập nhật khuyến mãi là voucher
router.put('/cap-nhat/san-pham', promotionController.putEditPromotionProduct);  // Cập nhật khuyến mãi theo sản phẩm
router.put('/cap-nhat-trang-thai', promotionController.putEditPromotionStatus);   // Cập nhật trạng thái khuyến mãi
    // DELETE
router.delete('/xoa-khuyen-mai/:id', promotionController.deletePromotion);  // Xoá 1 chương trình khuyến mãi theo makm


module.exports = router;