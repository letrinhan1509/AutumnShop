var express = require('express');
var router = express.Router();
var modelCatalog = require('../models/model_catalog.js'); //nhúng model catalog vào controller này để sử dụng
var modelProduct = require('../models/model_product.js');
var message = '';

router.get('/:name', async function (req, res) {
  let name = req.params.name;
  let listPro = await modelCatalog.listByName(name);
  let listProPopular = await modelProduct.list();
  let listCat = await modelCatalog.list();
  let breadcrumb = name;
  res.render('site/san-pham-theo-loai', { listPro: listPro, listCat: listCat, listProPopular: listProPopular, breadcrumb });
})


      // API
  // Danh sách loại sản phẩm:
router.get('/api/v1/loai', async function (req, res) {
  try {
    let listPro = await modelCatalog.list();
    res.json({ "status": "Success", "data": listPro });
  } catch (error) {
    res.json({ "status": "Fail", "error": error })
  }
});

  // Lọc loại theo id:
router.get('/api/v1/loai/id/:id', async function (req, res) {
  try {
    let typeId = req.params.id;
    let type = await modelCatalog.getById(typeId);
    if (type == -1) {
      res.json({ "status": "Success", "message": "Không tìm thấy loại này trong DB!" });
    } else
      res.json({ "status": "Success", "data": type });
  } catch (error) {
    res.json({ "status": "Fail", "error": error })
  }
});
  // Danh sách sản phẩm theo loại:
router.get('/api/loai-sp/:name', async function (req, res) {
  let name = req.params.name;
  console.log(name);
  let listPro = await modelCatalog.listByName(name);
  //console.log(listPro);
  res.json(listPro);
});


      // API POST:
  // Thêm loại:
router.post('/api/v1/loai/them', async function(req, res) {
  let typeId = req.body.typeId;
  let name = req.body.name;
  let data = {
      maloai: typeId,
      tenloai: name
  }
  try {
      let query = await modelCatalog.insertType(data);
      res.json({"status": "Success", "message": "Thêm loại thành công!", "data": query});
  } catch (error) {
      res.json({"status": "Fail", "message": "Lỗi cú pháp! Thêm loại không thành công!", "error": error});
  }
})
  // Cập nhật tên loại:
router.post('/api/v1/loai/cap-nhat', async function(req, res) {
  let typeId = req.body.typeId;
  let name = req.body.name;
  if(typeId == null){
      res.json({"status": "Fail", "message": "Không có id loại!"});
  }
  try {
      let query = await modelCatalog.updateType(typeId, name);
      res.json({"status": "Success", "message": "Cập nhật tên loại thành công!"});
  } catch (error) {
      res.json({"status": "Fail", "message": "Lỗi cú pháp! Cập nhật tên loại không thành công!", "error": error});
  }
});
  // Xoá loại sản phẩm:
router.post('/api/v1/loai/xoa', async function(req, res) {
  let typeId = req.body.typeId;
  if(typeId == null){
      res.json({"status": "Fail", "message": "Không có id loại!"});
  }
  try {
      let query = await modelCatalog.deleteType(typeId);
      if(query == 1){
          res.json({"status": "Success", "message": "Xoá loại thành công!"});
      }else
          res.json({"status": "Success", "message": "Có ràng buộc khoá ngoại. Không thể xoá loại!"});
  } catch (error) {
      res.json({"status": "Fail", "message": "Lỗi cú pháp! Xoá loại không thành công!", "error": error});
  }
});



module.exports = router;