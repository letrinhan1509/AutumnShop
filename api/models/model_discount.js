const db = require('./database'); //nhúng model database vào đế kết nối db

var dataList=[]; // biến để chứa dữ liệu đổ về cho controller

    // Danh sách tất cả khuyến mãi:
exports.list_Discounts = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM khuyenmai`;
        let query = db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                dataList = result;
                hamOK(dataList);
            }
        })
        console.log("KQ:", query);
    })
}
    // Danh sách các voucher:
exports.list_Vouchers = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let data = [];
        let sql = `SELECT * FROM khuyenmai WHERE voucher IS NOT NULL`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                data = result;
                hamOK(data);
            }
        })
    })
}
    // Danh sách các khuyến mãi theo sản phẩm:
exports.list_Dis_Product = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let data = [];
        let sql = `SELECT * FROM khuyenmai WHERE voucher IS NULL`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                data = result;
                hamOK(data);
            }
        })
    })
}
    // Chi tiết các sản phẩm khuyến mãi theo "makm":
exports.get_By_discountId = async (makm) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM khuyenmai WHERE khuyenmai.makm = '${makm}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                if(result.length > 0){
                    let sql_CTKM = `SELECT * FROM chitietkm WHERE chitietkm.makm = ?`;
                    db.query(sql_CTKM, result[0].makm, (err, result1) => {
                        if(err)
                            hamLoi(err);
                        else{
                            if(result1.length > 0){
                                result[0].chitietKM = result1;
                                dataList.push(result);
                                hamOK(dataList);
                            } else{
                                // Khuyến mãi này không có chi tiết khuyến mãi:
                                hamOK(result);
                            };
                        };
                    });
                } else{
                    // Không có khuyến mãi này trong DB:
                    hamOK(-1);
                };
            };
        });
    });
};
    // Tìm voucher theo tên:
exports.check_By_voucherName = async (name) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM khuyenmai WHERE khuyenmai.voucher = '${name}' AND voucher IS NOT NULL`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            } else if(result.length <= 0) {
                hamOK(false);
            } else {
                console.log("Có voucher");
                hamOK(result[0]);
            }
        })
    })
};
    // Tạo khuyến mãi là voucher:
exports.create_Voucher = (data) => {
    console.log(data);
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO khuyenmai SET ?";
        db.query(sql, data, (err, result) => {
            if(err)
                reject(err);
            else{
                console.log('Insert successfully');
                resolve(result);
            }
        })
    })
};
    // Tạo khuyến mãi:
exports.create_Discount = (data, masp, chietkhau, giakm) => {
    console.log(data);
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO khuyenmai SET ?";
        db.query(sql, data, (err, d) => {
            console.log('Insert successfully')
        })
        let sql_discountId = "SELECT LAST_INSERT_ID() as LastID;";
        db.query(sql_discountId, (err, result1) => {
            console.log(result1[0]);
            let dataCTKM = {
                makm: result1[0],
                masp: masp,
                chietkhau: chietkhau,
                giakm: giakm
            }
            let sql_CTKM = `INSERT INTO chitietkm SET ?`;
            db.query(sql_CTKM, dataCTKM, (err, result) => {
                console.log(result);
                console.log('Create CTKM success');
            });
        });
    })
};
    // Sửa thông tin khuyến mãi:
exports.update_Discount = (id, ten, voucher, dk, ngaykt, trangthai) => {
    return new Promise( (resolve, reject) => {
        let sql = `UPDATE trangthai SET tenkm='${ten}', voucher='${voucher}',, dieukien='${dk}', ngaykt='${ngaykt}', trangthai='${trangthai}'
        WHERE makm = '${id}'`;
        db.query(sql, (err, result) => {
            if(err)
                reject(err);
            else
                resolve("Cập nhật thông tin khuyến mãi thành công !") ;
        })
    });
};
    // Khoá khuyến mãi:
exports.lock_Discount = (data) => {
    return new Promise( (resolve, reject) => {
        if(data.trangthai == 0){
            let sql = `UPDATE khuyenmai SET trangthai = 0 WHERE makm = '${data.makm}'`;
            db.query(sql, (err, result) => {
                if(err)
                    reject(err);
                else
                    resolve("Ẩn chương trình khuyến mãi thành công !");
            });
        } else {
            let sql = `UPDATE khuyenmai SET trangthai = 1 WHERE makm = '${data.makm}'`;
            db.query(sql, (err, result) => {
                if(err)
                    reject(err);
                else
                    resolve("Hiện chương trình khuyến mãi thành công !");
            });
        };
    });
};
    // Xoá khuyến mãi:
exports.delete = (id) => {
    return new Promise( (resolve, reject) => {
        let sql = `DELETE FROM khuyenmai WHERE makm='${id}'`;
        let query = db.query(sql, (err, result) => {
            if(err)
                reject(err);
            else
                resolve("Xoá khuyến mãi thành công !");
        })
    });
};
