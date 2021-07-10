var express = require('express');
var router = express.Router();
const catalogController = require('../controllers/catalogController');

      // GET
router.get('/', catalogController.getListCategorys);  // Danh sách danh mục sản phẩm.
router.get('/loai', catalogController.getListTypes);  // Danh sách loại sản phẩm.
router.get('/:id', catalogController.getCategory);    // Chi tiết 1 danh mục theo mã danh mục.
router.get('/loai/:id', catalogController.getType);   // Chi tiết 1 loại theo mã loại.
router.get('/:id/loai', catalogController.getTypeCategory); // Tất cả loại theo mã danh mục.
      // POST:
router.post('/them-danh-muc', catalogController.postCategory);    // Thêm danh mục
router.post('/them-loai', catalogController.postType);      // Thêm loại. 
      // PUT:
router.put('/cap-nhat-danh-muc', catalogController.putEditCategory);    // Cập nhật danh mục
router.put('/cap-nhat-loai', catalogController.putEditType);      // Cập nhật tên loại
router.put('/cap-nhat-trang-thai', catalogController.putEditCategoryStatus);  // Cập nhật trạng thái danh mục
router.put('/cap-nhat-trang-thai-loai', catalogController.putEditTypeStatus); // Cập nhật trạng thái loại
// DELETE
router.delete('/xoa/:id', catalogController.deleteCategory);      // Xoá danh mục sản phẩm
router.delete('/xoa-loai/:id', catalogController.deleteType);     // Xoá loại sản phẩm


module.exports = router;