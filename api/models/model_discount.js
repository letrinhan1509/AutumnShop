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
                hamOK(result);
            };
        });
    })
}
    // Danh sách các voucher:
exports.list_Vouchers = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM khuyenmai WHERE voucher IS NOT NULL`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                hamOK(result);
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
        db.query(sql, (error, result) => {
            if(error){
                hamLoi(error);
            }else{
                if(result.length > 0){
                    let sql_CTKM = `SELECT * FROM chitietkm WHERE chitietkm.makm = ?`;
                    db.query(sql_CTKM, result[0].makm, (err, result1) => {
                        if(err)
                            hamLoi(err);
                        else{
                            if(result1.length <= 0){
                                hamOK(result[0]);
                            } else {
                                result[0].chitietKM = result1;
                                hamOK(result[0]);
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
        let sql = `SELECT makm, tenkm, voucher, ghichu, tenhinh, hinh, dieukien, giagiam, DATE_FORMAT(ngaybd, '%e-%c-%Y') as ngaybd,
        DATE_FORMAT(ngaykt, '%e-%c-%Y') as ngaykt FROM khuyenmai WHERE khuyenmai.voucher = '${name}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            } else if(result.length <= 0) {
                hamOK(false);   // Không tìm thấy voucher trong DB
            } else {
                hamOK(result[0]);
            }
        })
    })
};
    // Tạo khuyến mãi là voucher:
exports.create_Voucher = (data) => {
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO khuyenmai SET ?";
        db.query(sql, data, (err, result) => {
            if(err)
                reject(err);
            else{
                resolve("Tạo voucher thành công !");
            }
        })
    })
};
    // Tạo khuyến mãi là các sản phẩm:
exports.create_Discount = (data, chitietKM) => {
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO khuyenmai SET ?";
        db.query(sql, data, (error, result) => {
            if(error) { reject(error); }
            console.log('Insert khuyenmai successfully');
        });
        let sql_makm = "SELECT LAST_INSERT_ID() as LastID;";
        db.query(sql_makm, (err0, resultId) => {
            console.log(resultId[0].LastID);
            if(err0) { reject(err0); }
            else{
                let sql_CTKM = `INSERT INTO chitietkm SET ?`;
                chitietKM.forEach(element => {
                    element.sanpham.forEach(e => {
                        let dataCTKM = {
                            masp: e.masp,
                            chitiet_km: e.chitiet,
                            chietkhau: element.chietkhau,
                            giagiam: e.gia - (e.gia * (element.chietkhau/100)),
                            makm: resultId[0].LastID
                        };
                        db.query(sql_CTKM, dataCTKM, (err, result1) => {
                            if(err) { reject(err); }
                            console.log('Create CTKM success');
                        });
                    });
                });
                resolve("Tạo chương trình khuyến mãi cho sản phẩm thành công !");
            };
        });
    })
};
    // Cập nhật thông tin khuyến mãi là voucher:
exports.update_Voucher = (data) => {
    return new Promise( (resolve, reject) => {
        let sql = `UPDATE khuyenmai SET tenkm='${data.tenkm}', voucher='${data.voucher}', ghichu='${data.ghichu}', tenhinh='${data.tenhinh}', hinh='${data.hinh}', dieukien='${data.dieukien}', giagiam='${data.giagiam}', ngaybd='${data.ngaybd}', ngaykt='${data.ngaykt}', trangthai='${data.trangthai}'
        WHERE makm = '${data.makm}'`;
        db.query(sql, (err, result) => {
            if(err){
                reject(err);
            } else
                resolve("Cập nhật thông tin khuyến mãi thành công !");
        });
    });
};
    // Xoá khuyến mãi:
exports.delete = (id) => {
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM chitietkm WHERE chitietkm.makm='${id}'`;
        db.query(sql, (error, result) => {
            if(error)
                reject(error);
            else {
                if(result.length <= 0){
                    console.log("Xoá được");
                    /* let sql_delete = `DELETE FROM khuyenmai WHERE makm='${id}'`;
                    let query = db.query(sql_delete, (err, result1) => {
                        if(err)
                            reject(err);
                        else
                            resolve("Xoá khuyến mãi thành công !");
                    }); */
                } else {
                    resolve(-1);
                }
            }
        })
        
    });
};
