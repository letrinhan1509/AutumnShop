const { json } = require('body-parser');
var db = require('./database'); //nhúng model database vào đế kết nối db

var dataList=[]; // biến để chứa dữ liệu đổ về cho controller
var dataName = [];


    // Danh sách tất cả đơn hàng:
exports.list_Orders = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT DH.madonhang, DH.makh, DH.tenkh, DH.email, DH.sodienthoai, DH.diachi, DH.tienship, DH.tongtien, DH.ghichu, DH.makm, DH.hinhthuc, DH.ngaydat, DH.ngaygiao, DH.trangthai, TT.tentt as tentt, DH.manv 
        FROM (donhang AS DH JOIN trangthai AS TT ON DH.trangthai = TT.trangthai)`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                //dataList = result;
                hamOK(result);
            }
        })
    })
}
    // Đơn hàng theo mã đơn hàng:
exports.get_By_Id = async (orderId) => {
    //const data = [];
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT DH.madonhang, DH.makh, DH.tenkh, DH.email, DH.sodienthoai, DH.diachi, DH.tienship, DH.tongtien, DH.ghichu, DH.makm, DH.hinhthuc, DH.ngaydat, DH.ngaygiao, DH.trangthai, TT.tentt as tentt, DH.manv 
        FROM (donhang AS DH JOIN trangthai AS TT ON DH.trangthai = TT.trangthai)
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
                            //data.push(result);
                            hamOK(result[0]);
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
        let sql = `SELECT DH.madonhang, DH.makh, DH.tenkh, DH.email, DH.sodienthoai, DH.diachi, DH.tienship, DH.tongtien, DH.ghichu, DH.makm, DH.hinhthuc, DH.ngaydat, DH.ngaygiao, DH.trangthai, TT.tentt as tentt, DH.manv 
        FROM (donhang AS DH JOIN trangthai AS TT ON DH.trangthai = TT.trangthai)
        WHERE DH.makh = '${userId}'`;
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
    // Đơn hàng theo số điện thoại:
exports.get_By_Phone = async (phone) => {
    return new Promise( (hamOK, hamLoi) => {
        let data = [];
        let sql = `SELECT DH.madonhang, DH.makh, DH.tenkh, DH.email, DH.sodienthoai, DH.diachi, DH.tienship, DH.tongtien, DH.ghichu, DH.makm, DH.hinhthuc, DH.ngaydat, DH.ngaygiao, DH.trangthai, TT.tentt as tentt, DH.manv 
        FROM (donhang AS DH JOIN trangthai AS TT ON DH.trangthai = TT.trangthai)
        WHERE DH.sodienthoai = '${phone}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                if(result.length > 0){
                    data = result;
                    hamOK(data);
                }else{
                    hamOK(-1);
                }
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
                if(result.length > 0){
                    hamOK(result);
                } else {
                    hamOK(-1);
                }
            }
        })
    })
}
    // Cập nhật trạng thái đơn hàng:
exports.update_Status = (data) => {
    return new Promise( (hamOK, hamLoi) => {
        if(!data.ngaygiao) {
            console.log("ok");
            let sql = `UPDATE donhang SET trangthai='${data.trangthai}' WHERE madonhang='${data.madonhang}'`;
            db.query(sql, (err, result) => {
                if(err)
                    hamLoi(err);
                else
                    hamOK("Cập nhật thông tin đơn hàng thành công !");
            })
        } else {
            let sql = `UPDATE donhang SET ngaygiao='${data.ngaygiao}', trangthai='${data.trangthai}' WHERE madonhang='${data.madonhang}'`;
            db.query(sql, (err, result) => {
                if(err)
                    hamLoi(err);
                else
                    hamOK("Cập nhật thông tin đơn hàng thành công !");
            })
        }
    })
}
    // Tạo đơn hàng cho khách không có tài khoản: (cart là 1 mảng các sản phẩm)
exports.insert_Order = (name, email, phone, address, ship, total, note, promoCode, formality, delivery, orderDate, cart) => {
    return new Promise( (hamOK, hamLoi) => {
        if(promoCode == undefined){
            console.log('không mã khuyến mãi');
            // Đơn hàng không dùng mã khuyến mãi
            let sql = `INSERT INTO donhang(tenkh, email, sodienthoai, diachi, tienship, tongtien, ghichu, hinhthuc, vanchuyen, ngaydat) 
        VALUES ('${name}', '${email}', '${phone}', '${address}', '${ship}', '${total}', '${note}', '${formality}', '${delivery}', '${orderDate}')`;
            db.query(sql, (err, result) => {
                if(err){
                    console.log(err);
                    hamLoi(err);
                }  
            });
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
                            //giagiam: element.giagiam,
                            soluong: element.qty,
                            thanhtien: thanhtien,
                            //makm: element.makm,
                            madonhang: resultId[0].LastID
                        };
                        db.query(sql_orderDetail, data, (err, result1) => {    // Câu lệnh tạo chi tiết đơn hàng.
                            if(err){
                                console.log(err);
                                hamLoi(err);
                            }
                        });
                    });
                    hamOK("Tạo đơn hàng thành công !");
                }
            });
        } else {
            // Đơn hàng dùng mã khuyến mãi
            let sql = `INSERT INTO donhang(tenkh, email, sodienthoai, diachi, tienship, tongtien, ghichu, makm, hinhthuc, vanchuyen, ngaydat) 
        VALUES ('${name}', '${email}', '${phone}', '${address}', '${ship}', '${total}', '${note}', '${promoCode}','${formality}', '${delivery}', '${orderDate}')`;
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
                    hamOK("Tạo đơn hàng thành công !");
                }
            });
        };
    });
};

    // Tạo đơn hàng cho khách hàng có tài khoản:
exports.insert_Order_User = (userId, name, email, phone, address, ship, total, note, promoCode, formality, delivery, orderDate, cart) => {
    return new Promise( (hamOK, hamLoi) => {
        if(promoCode == undefined){
            // Đơn hàng không dùng mã khuyến mãi 
            let sql = `INSERT INTO donhang(makh, tenkh, email, sodienthoai, diachi, tienship, tongtien, ghichu, hinhthuc, vanchuyen, ngaydat) 
        VALUES ('${userId}', '${name}', '${email}', '${phone}', '${address}', '${ship}', '${total}', '${note}', '${formality}', '${delivery}', '${orderDate}')`;
            db.query(sql, (err, result) => {
                if(err){
                    console.log(err);
                    hamLoi(err);
                }  
            })
            let sql_orderId = "SELECT LAST_INSERT_ID() as LastID;"; // Kết quả trả về là id đơn hàng vừa tạo
            db.query(sql_orderId, (err, resultId) => {    // result sẽ trả về id đơn hàng vừa tạo
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
                    hamOK("Tạo đơn hàng thành công !");
                }
            });
        } else {
            // Đơn hàng dùng mã khuyến mãi
            let sql = `INSERT INTO donhang(makh, tenkh, email, sodienthoai, diachi, tienship, tongtien, ghichu, makm, hinhthuc, vanchuyen, ngaydat) 
        VALUES ('${userId}', '${name}', '${email}', '${phone}', '${address}', '${ship}', '${total}', '${note}', '${promoCode}', '${formality}', '${delivery}', '${orderDate}')`;
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
                    hamOK("Tạo đơn hàng thành công !");
                }
            });
        };
    })
}

// Xoá đơn hàng:
exports.delete = (madh) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `UPDATE donhang SET trangthai='4' WHERE madonhang='${madh}'`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else
                hamOK("Huỷ đơn hàng thành công !");
        })
    })
};