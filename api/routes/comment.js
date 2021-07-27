const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');


                // API COMMENT
router
        .route("/")
        .get(commentController.getListComments) // Danh sách các bình luận
        .post(commentController.postComment)    // Tạo bình luận
        .put(commentController.putEditCommnet)  // Chỉnh sửa bình luận

router
        .route("/:id")
        .get(commentController.getComment)      // Chi tiết 1 bình luận
        .delete(commentController.deleteComment)// Xoá bình luận

router.get('/:id/chi-tiet-bluan', commentController.getDetailComment);  // Chi tiết 1 bình luận theo mã bình luận
router.get('/khach-hang/:id', commentController.getCommentClient);      // Bình luận theo mã khách hàng
router.get('/san-pham/:idPro', commentController.getCommentByProduct);  // Bình luận theo mã sản phẩm
        // POST
router.post('/tra-loi-binh-luan', commentController.postReplyComment); // Thêm Rep Comment
        // PUT    
router.put('/cap-nhat-tra-loi', commentController.putEditRepComment); // Chỉnh sửa chi tiết bình luận
router.put('/cap-nhat-trang-thai', commentController.putEditCommentStatus); // Cập nhật trạng thái bình luận
        // DELETE
router.delete('/xoa-tra-loi/:id', commentController.deleteRepComment);  // Xoá chi tiết bình luận
    

module.exports = router;