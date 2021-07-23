var express = require('express');
const axios = require('axios');
var router = express.Router();
const indexController = require('../controllers/indexController');
const modelIndex = require('../models/model_index'); //nhúng model products vào controller này để sử dụng


router.get('/dang-nhap', (req, res, next) => { 
    res.status(200).render('dang-nhap');
});


            // API 
    //GET:
router.get('/tien-te', indexController.getListCurrency);
router.get('/city', indexController.getListCities); // Danh sách tất cả thành phố
router.get('/city/:id', indexController.getDetailCity);   // Chi tiết 1 Tỉnh/Thành phố
router.get('/city/:id/district', indexController.getListCounties);  // Danh sách toàn bộ Quận/Huyện theo Tỉnh/Thành phố
router.get('/district/:id', indexController.getDetailDistrict); // Chi tiết 1 Quận/Huyện
router.get('/district/:id/ward', indexController.getListWards); // Danh sách toàn bộ Phường/Xã thuộc Quận/Huyện
router.get('/ward/:id', indexController.getDetailWard); // Chi tiết 1 phường, xã, thị trấn


module.exports = router;