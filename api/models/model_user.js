var db = require('./database'); //nhúng model database vào đế kết nối db

var dataList = [];
var dataName = [];

exports.checkEmail = (email) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM khachhang WHERE email = '${email}'`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else{
                if(result.length <= 0)  // Không tìm thấy user có email này trong DB
                    hamOK(-1);
                else
                    hamOK(result[0]);
            }
        })
    })
}
    //Danh sách khách hàng
exports.list = () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = 'SELECT makh, tenkh, email, sodienthoai, diachi, trangthai FROM khachhang'
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                console.log('List All Users Success!');
                hamOK(result);
            }
        });
    });
};
    // Lọc khách hàng theo tên:
exports.detailByName = (nameUser) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT tenkh, email, sodienthoai, diachi FROM khachhang WHERE tenkh LIKE '${nameUser}'`;
        db.query(sql, (err, result) => {
            console.log('User Success!');
            hamOK(result[0]);
        })
    });
}
    // Lọc khách hàng theo ID:
exports.get_By_Id = (userId) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT makh, tenkh, email, sodienthoai, diachi, trangthai FROM khachhang WHERE makh='${userId}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                if(result.length <= 0){
                    console.log('Fail! No user!');
                    hamOK(-1);
                }else{
                    console.log('User Success!');
                    hamOK(result[0]);
                }
            }
        })
    });
}
    // Thêm tài khoản user:
exports.insert_User = (data) => {
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO khachhang SET ?";
        db.query(sql, data, (err, result) => {
            if(err){
                console.log('Insert user fail')
                reject(err);
            } else{
                resolve("Đăng ký tài khoản thành công !" );    // trả về kết quả nếu promise hoàn thành.
            }
        })
    })
}
    // Cập nhật profile khách hàng:
exports.updateProfileUser = (email, ten, hinh, sdt, diachi) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `UPDATE khachhang SET tenkh = '${ten}', hinh = '${hinh}', sodienthoai = '${sdt}', diachi = '${diachi}' 
        WHERE email = '${email}'`;
        db.query(sql, (err, result) => {
            if(err)
                hamLoi(err);
            else {
                console.log('Update success');
                hamOK("Sửa thông tin tài khoản thành công !");
            };
        });
    });
}
    // Cập nhật mật khẩu khách hàng:
exports.updatePasswordUser = (email, pass) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `UPDATE khachhang SET matkhau = '${pass}' WHERE email = '${email}'`;
        db.query(sql, (err, result) => {
            if(err){
                hamLoi(err);
            }else{
                console.log('Update success');
                hamOK(result);
            }
        })
        }
    )
}
    // Khoá tài khoản khách hàng:
exports.lock_User = (userId) => {
    return new Promise( (resolve, reject) => {
        let sql = `UPDATE khachhang SET trangthai = 0 WHERE makh = '${userId}'`;
        db.query(sql, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve("Khoá tài khoản khách hàng thành công");
            }
        })
    })
}
    // Mở khoá tài khoản khách hàng:
exports.unlock_User = (userId) => {
    return new Promise( (resolve, reject) => {
        let sql = `UPDATE khachhang SET trangthai = 1 WHERE makh = '${userId}'`;
        db.query(sql, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve("Mở khoá tài khoản khách hàng thành công");
            }
        })
    })
}
    // Xoá tài khoản khách hàng:
exports.delete_User = (userId) => {
    return new Promise( (resolve, reject) => {
        let sql = `DELETE FROM khachhang WHERE makh = '${userId}'`;
        db.query(sql, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve("Xoá tài khoản khách hàng thành công !");
            }
        })
    })
}

///UserName
//Tất cả thành tài khoảng khách hàng
/* exports.listUserKH = () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = "SELECT * FROM khachhang";
        db.query(sql, (err, d) => {
            console.log('List success');
            dataList = d;
            hamOK(dataListUser);
        })
        }
    )
} */