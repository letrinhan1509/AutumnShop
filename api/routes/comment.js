const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');


                    // API
        // GET
router.get('/', commentController.getListComments); // Danh sách các bình luận
router.get('/:id', commentController.getComment);   // Chi tiết 1 bình luận
router.get('/khach-hang/:id', commentController.getCommentClient);      // Bình luận theo mã khách hàng
router.get('/san-pham/:idPro', commentController.getCommentByProduct);  // Bình luận theo mã sản phẩm
router.get('/:id/chi-tiet-bluan', commentController.getDetailComment);  // Chi tiết 1 bình luận theo mã bình luận
        // POST
router.post('/them', commentController.postComment);  // Tạo bình luận
router.post('/tra-loi-binh-luan', commentController.postReplyComment); // Thêm Rep Comment
        // PUT
router.put('/cap-nhat', commentController.putEditCommnet);    // Chỉnh sửa bình luận
router.put('/cap-nhat-tra-loi', commentController.putEditRepComment); // Chỉnh sửa chi tiết bình luận
router.put('/cap-nhat-trang-thai', commentController.putEditCommentStatus); // Cập nhật trạng thái bình luận
        // DELETE
router.delete('/xoa/:id', commentController.deleteComment);   // Xoá bình luận
router.delete('/xoa-tra-loi/:id', commentController.deleteRepComment);  // Xoá chi tiết bình luận
    

module.exports = router;