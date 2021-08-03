const db = require('./database'); //nhúng model database vào đế kết nối db


            // MODEL PRODUCT SIZE:

    // Danh sách các size:
exports.list_size = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = "SELECT * FROM size";
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else
                hamOK(result);         
        })
    })
}
    // Get size theo id:
exports.get_Size_Id = async (masize) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM size WHERE masize='${masize}'`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else{
                if(result.length <= 0)
                    hamOK(-1)   // Không có size này trong DB.
                else
                    hamOK(result[0]);// Trả về size tìm thấy trong DB.
            }            
        })
    })
};
    // Get size theo tensize:
exports.get_Size_Name = async (tensize) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM size WHERE tensize='${tensize}'`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else{
                if(result.length <= 0)
                    hamOK(-1)   // Không có size này trong DB.
                else
                    hamOK(result[0]);// Trả về size tìm thấy trong DB.
            }            
        })
    })
};
    // Thêm size:
exports.insert_size = (data) => {
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO size SET ?";
        db.query(sql, data, (err, result) => {
            if(err)
                reject(err);
            else{
                resolve("Thêm size sản phẩm thành công !");    // trả về kết quả nếu promise hoàn thành.
            }
        })
    })
};
    // Cập nhật size:
exports.update_size = (masize, tensize) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `UPDATE size SET tensize = '${tensize}' WHERE masize = '${masize}'`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else{
                hamOK("Cập nhật thông tin size sản phẩm thành công !");
            }
        })
    })
}
    // Xoá size:
exports.delete_size = (masize) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql_size = `SELECT * FROM chitiet_sanpham WHERE masize='${masize}'`;
        db.query(sql_size, (error, result) => {
            if(error)
                hamLoi(error);
            else{
                if(result.length <= 0){
                    // Không có ràng buộc khoá ngoại => Có thể xoá.
                    let sql = `DELETE FROM size WHERE masize='${masize}'`;
                    db.query(sql, (err, result) => {
                        if(err) {
                            hamLoi(err);
                        } else {
                            hamOK("Xoá size sản phẩm thành công !");
                        };
                    })
                } else {
                    // Có ràng buộc khoá ngoại không thể xoá
                    hamOK(-1);
                }
            }
        })
    })  
}


            // MODEL PRODUCT COLOR:

    // Danh sách các màu:
exports.list_color = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = "SELECT * FROM mau";
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else
                hamOK(result);         
        })
    })
}
    // Get màu theo id:
exports.get_Color_Id = async (mamau) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM mau WHERE mamau='${mamau}'`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else{
                if(result.length <= 0)
                    hamOK(-1);
                else
                    hamOK(result[0]);
            }            
        })
    })
};
    // Get màu theo tenmau:
exports.get_Color_Name = async (tenmau) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM mau WHERE tenmau='${tenmau}'`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else{
                if(result.length <= 0)
                    hamOK(-1);
                else
                    hamOK(result[0]);
            }            
        })
    })
};
    // Thêm màu:
exports.insert_color = (data) => {
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO mau SET ?";
        db.query(sql, data, (err, result) => {
            if(err)
                reject(err);
            else{
                resolve("Thêm màu sắc sản phẩm thành công !");    // trả về kết quả nếu promise hoàn thành.
            }
        })
    })
};
    // Cập nhật màu:
exports.update_color = (mamau, tenmau) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `UPDATE mau SET tenmau = '${tenmau}' WHERE mamau = '${mamau}'`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else{
                hamOK("Cập nhật thông tin màu sắc sản phẩm thành công !");
            }
        })
    })
}
    // Xoá màu:
exports.delete_color = (mamau) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql_color = `SELECT * FROM chitiet_sanpham WHERE mamau='${mamau}'`;
        db.query(sql_size, (error, result) => {
            if(error)
                hamLoi(error);
            else{
                if(result.length <= 0){
                    // Không có ràng buộc khoá ngoại => Có thể xoá.
                    let sql = `DELETE FROM mau WHERE mamau='${mamau}'`;
                    db.query(sql, (err, result) => {
                        if(err) {
                            hamLoi(err);
                        } else {
                            hamOK("Xoá màu sắc sản phẩm thành công !");
                        };
                    })
                } else {
                    // Có ràng buộc khoá ngoại không thể xoá
                    hamOK(-1);
                }
            }
        })
    })  
}


// MODEL THE NUMBER OF PRODUCTS
