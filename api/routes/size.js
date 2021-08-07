var express = require('express');
var router = express.Router();
const sizeController = require('../controllers/sizeController');


// API SIZE
router
  .route("/size")
  .get(sizeController.getListSize)  // Danh sách các size của sản phẩm
  .post(sizeController.postCreateSize)  // Thêm size sản phẩm
  .put(sizeController.putEditSize); // Cập nhật tên size sản phẩm

router
  .route("/size/:id")
  .get(sizeController.getSize)
  .delete(sizeController.deleteSize);