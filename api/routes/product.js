var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const modelProduct = require('../models/model_product'); //nhúng model products vào controller này để sử dụng

var breadcrumb = 'Tất cả sản phẩm';

router.get('/hot-product', async function(req, res) {
  let data = await modelProduct.hotProduct();
  res.json(data);
})

      // API PRODUCT
router
  .route("/")
  .get(productController.getListProducts)// Danh sách tất cả sản phẩm
  .post(productController.postProduct)  // Thêm sản phẩm

router
  .route("/color")
  .get(productController.getListColor)  // Danh sách các màu của sản phẩm
  .post(productController.postColor)  // Thêm màu sản phẩm
  .put(productController.putColor);   // Cập nhật tên màu sản phẩm

router
  .route("/size")
  .get(productController.getListSizeProduct)  // Danh sách các size của sản phẩm
  .post(productController.postCreateSizeProduct)  // Thêm size sản phẩm
  .put(productController.putEditSizeProduct); // Cập nhật tên size sản phẩm

router
  .route("/new-product").get(productController.getNewProduct);

router
  .route("/bang-size")
  .get(productController.getListSize)
  .post(productController.postCreateSize)
  .put(productController.putEditSize);

router.post("/check-size", productController.postCheckSize);

router
  .route("/:id")
  .get(productController.getProduct)// Lọc sản phẩm theo id
  .delete(productController.deleteProduct);  // Xoá sản phẩm

router
  .route("/color/:id")
  .get(productController.getColor)
  .delete(productController.deleteColor);

router
  .route("/size/:id")
  .get(productController.getSizeProduct)
  .delete(productController.deleteSizeProduct);

router
  .route("/bang-size/:id")
  .get(productController.getSize)
  .delete(productController.deleteSize);

router.get('/loai/:id', productController.getProductType);// Lọc sản phẩm theo loại
router.get('/danh-muc/:id', productController.getProductCategory);// lọc sản phẩm theo danh mục
router.get('/nha-san-xuat/:id', productController.getProductProducer);// Lọc sản phẩm theo nhà sản xuất

router.put('/cap-nhat-san-pham', productController.putEditProduct); // Sửa sản phẩm
router.put('/cap-nhat-trang-thai', productController.putEditStatus);// Cập nhật trạng thái sản phẩm

//router.post('/them-san-pham', productController.postProduct);
//router.delete('/xoa/:id', productController.deleteProduct);




function xoa_dau(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.split(' ').join('-');
  return str;
}

function replaceNameProduct(nameProduct) {
  var newNameProduct = xoa_dau(nameProduct);
  return newNameProduct;
}

module.exports = router;