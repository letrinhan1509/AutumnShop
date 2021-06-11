const express = require('express');
const router = express.Router();

const db = require('../models/database');
const modelUser = require('../models/model_user');
const modelComment = require('../models/model_comment');


            // API GET
    // Danh sách bình luận:
router.get('/danh-sach', async function(req, res) { 
    try {
        let listCmt = await modelComment.list_Comments();
        res.json({ "status": "Success", "data": listCmt });
    } catch (error) {
        res.json({ "status": "Fail", "error": error })
    }
});
    // Bình luận theo id:
router.get('/id=:idCmt', async function(req, res) { 
    let idCmt = req.params.idCmt;
    try {
        let listCmt = await modelComment.get_by_Id(idCmt);
        if(listCmt == -1)
            res.json({ "status": "Fail", "message": "Không có bình luận nào!"});
        else
            res.json({ "status": "Success", "data_Cmt": listCmt });
    } catch (error) {
        res.json({ "status": "Fail", "message": "Lỗi...Không thể lấy bình luận!","error": error })
    }
});
    // Bình luận theo mã khách hàng:
router.get('/khach-hang/id=:idU', async function(req, res) { 
    let idUser = req.params.idU;
    try {
        let listCmt = await modelComment.get_by_userId(idUser);
        if(listCmt == -1)
            res.json({ "status": "Fail", "message": "Không có bình luận nào!"});
        else
            res.json({ "status": "Success", "data": listCmt });
    } catch (error) {
        res.json({ "status": "Fail", "message": "Lỗi...Không thể lấy danh sách bình luận!","error": error })
    }
});
    // Bình luận theo mã sản phẩm:
router.get('/san-pham/id=:idPro', async function(req, res) { 
    let idSpham = await req.params.idPro;
    try {
        let listCmt = await modelComment.get_by_productId(idSpham);
        //console.log("Router: ", listCmt);
        if(listCmt == -1)
            res.json({ "status": "Fail", "message": "Sản phẩm này không có bình luận nào!"});
        else
            res.json({ "status": "Success", "data": listCmt });
    } catch (error) {
        res.json({ "status": "Fail", "message": "Lỗi...Không thể lấy danh sách bình luận!", "error": error })
    }
});
    // Danh sách chi tiết bình luận:
router.get('/chi-tiet-bluan/id=:id', async function(req, res) { 
    let idCmt = req.params.id;
    try {
        let listCmt = await modelComment.get_detailComment(idCmt);
        if(listCmt == -1)
            res.json({ "status": "Fail", "message": "Không có chi tiết bình luận nào!"});
        else
            res.json({ "status": "Success", "data": listCmt });
    } catch (error) {
        res.json({ "status": "Fail", "message": "Lỗi...Không thể lấy danh sách bình luận!", "error": error })
    }
});


            // API POST
    // Tạo bình luận:
router.post('/them-binh-luan', async function(req, res) {
    let masp = req.body.masp;
    let makh = req.body.makh;
    let noidung = req.body.noidung;
    var today = new Date();
    var ngaybl = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(ngaybl);
  
    if(masp == '' || makh == '' || noidung == ''){
      res.json({"status": "Fail", "message": "Thêm bình luận không thành công! Thiếu thông tin!"});
    }else{
        let data = {
            masp: masp,
            makh: makh,
            noidung: noidung,
            ngaybl: ngaybl,
        };
        try {
            let query = await modelComment.create_Comment(data);
            res.json({"status": "Success", "message": "Thêm bình luận thành công!", "result": query});
        } catch (error) {
            res.json({"status": "Fail", "message": "Lỗi cú pháp! Thêm bình luận không thành công!", "error": error});
        }
    }
});
    // Rep Cmt:
router.post('/tra-loi-binh-luan', async function(req, res) {
    let makh = req.body.makh;
    let noidung = req.body.noidung;
    let mabl = req.body.mabl;
    let manv = req.body.manv;
    var today = new Date();
    var ngaybl = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(ngaybl);
    let khachHang = await modelUser.getById(makh);
    console.log(khachHang.tenkh);

    if(mabl == '' || noidung == ''){
      res.json({"status": "Fail", "message": "Trả lời bình luận không thành công! Thiếu thông tin!"});
    }else{
        let data = {
            makh: makh,
            tenkh: khachHang.tenkh,
            noidung: noidung,
            ngaybl: ngaybl,
            manv: manv,
            mabl: mabl
        };
        try {
            let query = await modelComment.create_RepComment(data);
            res.json({"status": "Success", "message": "Trả lời bình luận thành công!", "result": query});
        } catch (error) {
            res.json({"status": "Fail", "message": "Lỗi cú pháp! Trả lời bình luận không thành công!", "error": error});
        }
    }
});
    // Chỉnh sửa bình luận:
router.put('/cap-nhat-binh-luan', async function(req, res) {
    let mabl = req.body.mabl;
    let noidung = req.body.noidung;
    
    if(noidung == ''){
      res.json({"status": "Fail", "message": "Chỉnh sửa bình luận không thành công!"});
    }else{
        try {
            let query = await modelComment.update_Comment(mabl, noidung);
            res.json({"status": "Success", "message": "Chỉnh sửa bình luận thành công!", "result": query});
        } catch (error) {
            res.json({"status": "Fail", "message": "Lỗi cú pháp! Chỉnh sửa bình luận không thành công!", "error": error});
        }
    }
});
    // Chỉnh sửa chi tiết bình luận:
router.put('/cap-nhat-tra-loi-bluan', async function(req, res) {
    let mact = req.body.mact;
    let noidung = req.body.noidung;
    
    if(noidung == ''){
      res.json({"status": "Fail", "message": "Chỉnh sửa bình luận không thành công!"});
    }else{
        try {
            let query = await modelComment.update_RepComment(mact, noidung);
            res.json({"status": "Success", "message": "Chỉnh sửa bình luận thành công!", "result": query});
        } catch (error) {
            res.json({"status": "Fail", "message": "Lỗi cú pháp! Chỉnh sửa bình luận không thành công!", "error": error});
        }
    }
});
    // Xoá bình luận:
router.delete('/xoa-binh-luan', async function(req, res) {
    let mabl = req.body.mabl;

    if(mabl == ''){
      res.json({"status": "Fail", "message": "Không có mã bình luận...Xoá không thành công!"});
    }else{
        try {
            let query = await modelComment.delete_Comment(mabl);
            res.json({"status": "Success", "message": "Xoá bình luận thành công!", "result": query});
        } catch (error) {
            res.json({"status": "Fail", "message": "Lỗi cú pháp! Xoá bình luận không thành công!", "error": error});
        }
    }
});
    // Xoá chi tiết bình luận:
router.delete('/xoa-tra-loi-bluan', async function(req, res) {
    let mact = req.body.mact;
    
    if(mact == ''){
      res.json({"status": "Fail", "message": "Không có mã bình luận...Xoá không thành công!"});
    }else{
        try {
            let query = await modelComment.delete_RepComment(mact);
            res.json({"status": "Success", "message": "Xoá bình luận thành công!", "result": query});
        } catch (error) {
            res.json({"status": "Fail", "message": "Lỗi cú pháp! Xoá bình luận không thành công!", "error": error});
        }
    }
});
    // Khoá bình luận:  
router.put('/an-binh-luan', async function(req, res) {
    let mabl = req.body.mabl;
    let trangthai = req.body.trangthai;
    
    if(mabl == '' || trangthai == '' ){
      res.json({"status": "Fail", "message": "Ẩn bình luận không thành công!"});
    }else{
        try {
            if(trangthai == 0){
                let query = await modelComment.lock_Comment(mabl);
                res.json({"status": "Success", "message": "Ẩn bình luận thành công!", "result": query});
            }else
                res.json({"status": "Success", "message": "Ẩn bình luận không thành công!", "result": query});
        } catch (error) {
            res.json({"status": "Fail", "message": "Lỗi cú pháp! Chỉnh sửa bình luận không thành công!", "error": error});
        }
    }
});


module.exports = router;