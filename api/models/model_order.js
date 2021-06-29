const { json } = require('body-parser');
var db = require('./database'); //nhúng model database vào đế kết nối db

var dataList=[]; // biến để chứa dữ liệu đổ về cho controller
var dataName = [];


    // Danh sách tất cả đơn hàng:
exports.list_Orders = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT DH.madonhang, DH.makh, DH.tenkh, DH.email, DH.sodienthoai, DH.diachi, DH.tienship, DH.tongtien, DH.ghichu, DH.makm, DH.hinhthuc, DH.ngaydat, DH.ngaygiao,
        DH.trangthai, DH.manv FROM donhang AS DH`;
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
    // Đơn hàng theo mã đơn hàng:
exports.get_By_Id = async (orderId) => {
    const data = [];
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT DH.madonhang, DH.makh, DH.tenkh, DH.email, DH.sodienthoai, DH.diachi, DH.tienship, DH.tongtien, DH.ghichu, DH.makm, DH.hinhthuc, DH.ngaydat, DH.ngaygiao,
        DH.trangthai, DH.manv FROM donhang AS DH
        WHERE DH.madonhang = '${orderId}'`;
        db.query(sql, (err, result) => {
            //console.log(result[0].madonhang);
            if(err){
                hamLoi(err);
            }else{
                if(result.length > 0){
                    let sql = `SELECT CTDH.mact, sanpham.tensp, CTDH.gia, CTDH.giagiam, CTDH.soluong, CTDH.thanhtien,
                    CTDH.madonhang FROM (chitietdh AS CTDH JOIN sanpham ON CTDH.masp = sanpham.masp)
                    WHERE CTDH.madonhang = ?`;
                    db.query(sql, result[0].madonhang, (err, result1) => {
                        if(err){
                            hamLoi(err);
                        } else {
                            result[0].chitietDH = result1;
                            data.push(result);
                            hamOK(data[0]);
                        }
                    })
                }else{
                    hamOK(-1);
                }
            }
        })
    })
}
    // Đơn hàng theo mã khách hàng:
exports.get_By_userId = async (userId) => {
    return new Promise( (hamOK, hamLoi) => {
        var data = [];
        let sql = `SELECT DH.madonhang, DH.makh, DH.tenkh, DH.email, DH.sodienthoai, DH.diachi, DH.tienship, DH.tongtien, DH.ghichu, DH.makm, DH.ngaydat, DH.ngaygiao,
        DH.trangthai, DH.manv FROM donhang AS DH WHERE DH.makh = '${userId}'`;
        let sql_detail = `SELECT CTDH.mact, sanpham.tensp, CTDH.gia, CTDH.giagiam, CTDH.soluong, CTDH.thanhtien,
        CTDH.madonhang FROM (chitietdh AS CTDH JOIN sanpham ON CTDH.masp = sanpham.masp) WHERE CTDH.madonhang = ?`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else {
                if(result.length > 0){
                    data = result;
                    hamOK(data);
                } else
                    hamOK(-1);
            }
        })
    })
}
    // Danh sách chi tiết đơn hàng:
exports.get_detailOrder = async (orderId) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT CTDH.mact, sanpham.tensp, CTDH.gia, CTDH.giagiam, CTDH.soluong, CTDH.thanhtien,
        CTDH.makm, CTDH.madonhang FROM (chitietdh AS CTDH JOIN sanpham ON CTDH.masp = sanpham.masp)
        WHERE CTDH.madonhang = '${orderId}'`;
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
    // Cập nhật đơn hàng:
exports.update_Order = (orderId, delivery, status) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `UPDATE donhang SET ngaygiao='${delivery}', trangthai='${status}' WHERE madonhang='${orderId}'`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else
                hamOK(result);
        })
    })
}
    // Tạo đơn hàng không có khuyến mãi: (cart là 1 mảng các sản phẩm)
exports.insert_Order = (userId, name, email, phone, address, ship, total, note, formality, orderDate, cart) => {
    return new Promise( (hamOK, hamLoi) => {
        if(userId == undefined){
            console.log("khong co mã kh");
            let sql = `INSERT INTO donhang(tenkh, email, sodienthoai, diachi, tienship, tongtien, ghichu, hinhthuc, ngaydat) 
        VALUES ('${name}', '${email}', '${phone}', '${address}', '${ship}', '${total}', '${note}', '${formality}', '${orderDate}')`;
            db.query(sql, (err, result) => {
                if(err){
                    console.log(err);
                    hamLoi(err);
                }  
            })
            let sql_orderId = "SELECT LAST_INSERT_ID() as LastID;"; // Kết quả trả về là id đơn hàng vừa tạo.
            db.query(sql_orderId, (err, resultId) => {    // result sẽ trả về id đơn hàng vừa tạo.
                console.log(resultId[0].LastID);
                if(err){
                    console.log(err);
                    hamLoi(err)
                } else{
                    let sql_orderDetail = `INSERT INTO chitietdh SET ?`;
                    cart.forEach(element => {
                        let thanhtien = element.gia * element.qty;
                        let data = {
                            masp: element.masp,
                            gia: element.gia,
                            soluong: element.qty,
                            thanhtien: thanhtien,
                            madonhang: resultId[0].LastID
                        };
                        db.query(sql_orderDetail, data, (err, result1) => {    // Câu lệnh tạo chi tiết đơn hàng.
                            if(err){
                                console.log(err);
                                hamLoi(err);
                            }
                        });
                    });
                    hamOK(1);
                }
            });

        } else{
            let sql = `INSERT INTO donhang(makh, tenkh, email, sodienthoai, diachi, tienship, tongtien, ghichu, hinhthuc, ngaydat) 
        VALUES ('${userId}', '${name}', '${email}', '${phone}', '${address}', '${ship}', '${total}', '${note}', '${formality}', '${orderDate}')`;
            db.query(sql, (err, result) => {
                if(err){
                    console.log(err);
                    hamLoi(err);
                }  
            })
            let sql_orderId = "SELECT LAST_INSERT_ID() as LastID;"; // Kết quả trả về là id đơn hàng vừa tạo.
            db.query(sql_orderId, (err, resultId) => {    // result sẽ trả về id đơn hàng vừa tạo.
                if(err){
                    console.log(err);
                    hamLoi(err)
                } else{
                    let sql_orderDetail = `INSERT INTO chitietdh SET ?`;
                    cart.forEach(element => {
                        let thanhtien = element.gia * element.qty;
                        let data = {
                            masp: element.masp,
                            gia: element.gia,
                            soluong: element.qty,
                            thanhtien: thanhtien,
                            madonhang: resultId[0].LastID
                        };
                        db.query(sql_orderDetail, data, (err, result1) => {    // Câu lệnh tạo chi tiết đơn hàng.
                            if(err){
                                console.log(err);
                                hamLoi(err);
                            }
                        });
                    });
                    hamOK(1);
                }
            });
        };
    })
}

    // Tạo đơn hàng có khuyến mãi:
exports.insert_Order_PromoCode = (userId, name, email, phone, address, ship, total, note, promoCode, formality, orderDate, cart) => {
    return new Promise( (hamOK, hamLoi) => {
        if(userId == undefined){
            let sql = `INSERT INTO donhang(tenkh, email, sodienthoai, diachi, tienship, tongtien, ghichu, makm, hinhthuc, ngaydat) 
        VALUES ('${name}', '${email}', '${phone}', '${address}', '${ship}', '${total}', '${note}', '${promoCode}', '${formality}', '${orderDate}')`;
            db.query(sql, (err, result) => {
                if(err){
                    console.log(err);
                    hamLoi(err);
                }  
            })
            let sql_orderId = "SELECT LAST_INSERT_ID() as LastID;"; // Kết quả trả về là id đơn hàng vừa tạo.
            db.query(sql_orderId, (err, resultId) => {    // result sẽ trả về id đơn hàng vừa tạo.
                console.log(resultId[0].LastID);
                if(err){
                    console.log(err);
                    hamLoi(err)
                } else{
                    let sql_orderDetail = `INSERT INTO chitietdh SET ?`;
                    cart.forEach(element => {
                        let thanhtien = element.gia * element.qty;
                        let data = {
                            masp: element.masp,
                            gia: element.gia,
                            soluong: element.qty,
                            thanhtien: thanhtien,
                            madonhang: resultId[0].LastID
                        };
                        db.query(sql_orderDetail, data, (err, result1) => {    // Câu lệnh tạo chi tiết đơn hàng.
                            if(err){
                                console.log(err);
                                hamLoi(err);
                            }
                        });
                    });
                    hamOK(1);
                }
            });

        } else{
            let sql = `INSERT INTO donhang(makh, tenkh, email, sodienthoai, diachi, tienship, tongtien, ghichu, makm, hinhthuc, ngaydat) 
        VALUES ('${userId}', '${name}', '${email}', '${phone}', '${address}', '${ship}', '${total}', '${note}', '${promoCode}', '${formality}', '${orderDate}')`;
            db.query(sql, (err, result) => {
                if(err){
                    console.log(err);
                    hamLoi(err);
                }  
            })
            let sql_orderId = "SELECT LAST_INSERT_ID() as LastID;"; // Kết quả trả về là id đơn hàng vừa tạo.
            db.query(sql_orderId, (err, resultId) => {    // result sẽ trả về id đơn hàng vừa tạo.
                if(err){
                    console.log(err);
                    hamLoi(err)
                } else{
                    let sql_orderDetail = `INSERT INTO chitietdh SET ?`;
                    cart.forEach(element => {
                        let thanhtien = element.gia * element.qty;
                        let data = {
                            masp: element.masp,
                            gia: element.gia,
                            soluong: element.qty,
                            thanhtien: thanhtien,
                            madonhang: resultId[0].LastID
                        };
                        db.query(sql_orderDetail, data, (err, result1) => {    // Câu lệnh tạo chi tiết đơn hàng.
                            if(err){
                                console.log(err);
                                hamLoi(err);
                            }
                        });
                    });
                    hamOK(1);
                }
            });
        };
    })
}