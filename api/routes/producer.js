var express = require('express');
var router = express.Router();
const producerController = require('../controllers/producerController');


            // API
router.get('/', producerController.getListProducers);   // Danh sách tất cả nhà sản xuất
router.get('/:id', producerController.getProducer); // Nhà sản xuất theo id 
router.post('/them', producerController.postProducer);   // Thêm nhà sản xuất
router.put('/cap-nhat', producerController.putEditProducer); // Cập nhật thông tin nhà sản xuất
router.delete('/xoa/:id', producerController.deleteProducer);   // Xoá nhà sản xuất


module.exports = router;