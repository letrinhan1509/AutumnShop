const db = require('./database'); //nhúng model database vào đế kết nối db

var dataList=[]; // biến để chứa dữ liệu đổ về cho controller

    // Danh sách tất cả comment:
exports.list_comments = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT binhluan.mabl, binhluan.masp, sanpham.tensp, binhluan.makh, khachhang.tenkh,
        binhluan.ngaybl, binhluan.trangthai FROM ((binhluan JOIN khachhang ON binhluan.makh = khachhang.makh)
        JOIN sanpham ON binhluan.masp = sanpham.masp)`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                dataList = result;
                hamOK(dataList);
            }
        })
    })
}
    // Danh sách comment theo id sản phẩm:
exports.get_by_productId = async (productId) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT binhluan.mabl, binhluan.masp, sanpham.tensp, binhluan.makh, khachhang.tenkh,
        binhluan.ngaybl, binhluan.trangthai FROM ((binhluan JOIN khachhang ON binhluan.makh = khachhang.makh)
        JOIN sanpham ON binhluan.masp = sanpham.masp) WHERE binhluan.masp = '${productId}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                dataList = result;
                hamOK(dataList);
            }
        })
    })
}
    // Danh sách comment theo id khách hàng:
exports.get_by_userId = async (userId) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT binhluan.mabl, binhluan.masp, sanpham.tensp, binhluan.makh, khachhang.tenkh,
        binhluan.ngaybl, binhluan.trangthai FROM ((binhluan JOIN khachhang ON binhluan.makh = khachhang.makh)
        JOIN sanpham ON binhluan.masp = sanpham.masp) WHERE binhluan.makh = '${userId}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                dataList = result;
                hamOK(dataList);
            }
        })
    })
}
    // Danh sách chi tiết comment:
exports.get_detailComment = async (commentId) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT chitietbl.mact, chitietbl.ten, chitietbl.noidung, chitietbl.ngaybl, chitietbl.mabl
        FROM (chitietbl JOIN binhluan ON chitietbl.mabl = binhluan.mabl) WHERE chitietbl.mabl = '${commentId}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                dataList = result;
                hamOK(dataList);
            }
        })
    })
}

// Tạo comment:
exports.create_Comment = (data) => {
    console.log(data);
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO binhluan SET ?";
        db.query(sql, data, (err, d) => {
            console.log('Insert successfully')
            resolve(d);
        })
    })
}

exports.getComment = (idProduct) => {
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM comment WHERE idProduct=${idProduct}`;
        db.query(sql, (err, d) => {
            resolve(d);
        })
    })
}