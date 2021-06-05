var express = require('express');
var router = express.Router();
const modelCatalog = require('../models/model_catalog.js'); //nhúng model catalog vào controller này để sử dụng
var modelProduct = require('../models/model_product.js');
var message = '';



      // API
  // Danh mục sản phẩm:
router.get('/danh-sach-dm', async function (req, res) {
  try {
    let listCategory = await modelCatalog.list_Categorys();
    res.json({ "status": "Success", "data": listCategory });
  } catch (error) {
    res.json({ "status": "Fail", "error": error })
  }
});
  // Danh sách loại sản phẩm:
router.get('/danh-sach-loai', async function (req, res) {
  try {
    let listPro = await modelCatalog.list_types();
    res.json({ "status": "Success", "data": listPro });
  } catch (error) {
    res.json({ "status": "Fail", "error": error })
  }
});
  // Danh mục theo id:
router.get('/danh-muc-id/:id', async function (req, res) {
  try {
    let typeId = req.params.id;
    let type = await modelCatalog.get_Category_Id(typeId);
    if (type == -1) {
      res.json({ "status": "Fail", "message": "Không tìm thấy danh mục này trong DB!" });
    } else
      res.json({ "status": "Success", "data": type });
  } catch (error) {
    res.json({ "status": "Fail", "error": error })
  }
});
  // Loại theo id:
router.get('/loai-id/:id', async function (req, res) {
  try {
    let typeId = req.params.id;
    let type = await modelCatalog.get_Type_Id(typeId);
    if (type == -1) {
      res.json({ "status": "Fail", "message": "Không tìm thấy loại này trong DB!" });
    } else
      res.json({ "status": "Success", "data": type });
  } catch (error) {
    res.json({ "status": "Fail", "error": error })
  }
});
  


      // API POST:
  // Thêm loại:
router.post('/them-loai', async function(req, res) {
  let typeId = req.body.typeId;
  let name = req.body.name;
  let data = {
      maloai: typeId,
      tenloai: name
  }
  try {
      let query = await modelCatalog.insert_category(data);
      res.json({"status": "Success", "message": "Thêm loại thành công!", "data": query});
  } catch (error) {
      res.json({"status": "Fail", "message": "Lỗi cú pháp! Thêm loại không thành công!", "error": error});
  }
});
  // Cập nhật tên loại:
router.post('/cap-nhat-loai', async function(req, res) {
  let typeId = req.body.typeId;
  let name = req.body.name;
  if(typeId == null){
      res.json({"status": "Fail", "message": "Không có id loại!"});
  }
  try {
      let query = await modelCatalog.update_Type(typeId, name);
      res.json({"status": "Success", "message": "Cập nhật tên loại thành công!"});
  } catch (error) {
      res.json({"status": "Fail", "message": "Lỗi cú pháp! Cập nhật tên loại không thành công!", "error": error});
  }
});
  // Xoá loại sản phẩm:
router.post('/xoa-loai', async function(req, res) {
  let typeId = req.body.typeId;
  if(typeId == null){
      res.json({"status": "Fail", "message": "Không có id loại!"});
  }
  try {
      let query = await modelCatalog.delete_Type(typeId);
      if(query == 1){
          res.json({"status": "Success", "message": "Xoá loại thành công!"});
      }else
          res.json({"status": "Success", "message": "Có ràng buộc khoá ngoại. Không thể xoá loại!"});
  } catch (error) {
      res.json({"status": "Fail", "message": "Lỗi cú pháp! Xoá loại không thành công!", "error": error});
  }
});


  // Thêm danh mục:
router.post('/them-danh-muc', async function(req, res) {
  let categoryId = req.body.categoryId;
  let name = req.body.name;
  let data = {
      madm: categoryId,
      tendm: name
  }
  try {
      let query = await modelCatalog.insert_category(data);
      res.json({"status": "Success", "message": "Thêm loại thành công!", "data": query});
  } catch (error) {
      res.json({"status": "Fail", "message": "Lỗi cú pháp! Thêm loại không thành công!", "error": error});
  }
})
  // Cập nhật tên danh mục:
router.post('/cap-nhat-danh-muc', async function(req, res) {
  let categoryId = req.body.categoryId;
  let name = req.body.name;
  if(categoryId == null){
      res.json({"status": "Fail", "message": "Không có id danh mục!"});
  }
  try {
      let query = await modelCatalog.update_category(categoryId, name);
      res.json({"status": "Success", "message": "Cập nhật tên loại thành công!"});
  } catch (error) {
      res.json({"status": "Fail", "message": "Lỗi cú pháp! Cập nhật tên loại không thành công!", "error": error});
  }
});



module.exports = router;