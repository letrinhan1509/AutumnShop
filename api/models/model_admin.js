const { json } = require('body-parser');
const express = require('express');
const db = require('./database');

var dataList = [];
var dataName = [];

            // ADMIN:
    // Danh sách tất cả admin:
exports.listAdmins = async () => {
    return new Promise( (hamOk, hamLoi) => {
        let sql = `SELECT A.manv,A.admin,A.tennv,A.diachi,A.sodienthoai,A.quyen,A.trangthai 
        FROM admin as A`;
        db.query(sql, (err, result) => {
            if(err) {
                hamLoi(err);
            } 
            dataList = result;
            hamOk(dataList);
        });
    });
};
    // Tìm kiếm admin theo id:
exports.get_Admin_Id = (adminId) => {
    return new Promise( (hamOk, hamLoi) => {
        let sql = `SELECT * FROM admin WHERE manv = ${adminId}`;
        db.query(sql, (err, result) => {
            dataName = result[0];
            hamOk(dataName);
        });
    });
};
    // Tìm kiếm admin theo tên:
exports.getByName = (admin_name) => {
    return new Promise( (hamOk, hamLoi) => {
        let sql = `SELECT * FROM admin WHERE tennv LIKE '%${admin_name}%'`;
        db.query(sql, (err, result) => {
            dataName = result;
            hamOk(dataName);
        });
    });
};
    // Tìm kiếm admin bằng số điện thoại:
exports.getByPhone = (phone) => {
    return new Promise( (hamOk, hamLoi) => {
        let sql = `SELECT * FROM admin WHERE sodienthoai=${phone}`;
        db.query(sql, (err, result) => {
            hamOk(result[0]);
        });
    });
};
exports.check_Admin = (email) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM admin WHERE admin = '${email}'`;
        db.query(sql, (err, result) => {
            console.log('List success');
            data = result[0];
            hamOK(data);
        })
        }
    )
}
    // Thêm tài khoản admin:
exports.insertAdmin = (data) => {
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO admin SET ?";
        db.query(sql, data, (err, result) => {
            console.log('Insert Admin successfully')
            resolve(result);    // trả về kết quả nếu promise hoàn thành.
        })
    })
}
    // Cập nhật thông tin tài khoản admin:
exports.updateProfileAdmin = (adminId, pas, name, address, phone, permission) => {
    return new Promise( (resolve, reject) => {
        let sql = `UPDATE admin SET matkhau = '${pas}', tennv = '${name}', diachi = '${address}', sodienthoai = '${phone}', maquyen = '${permission}' WHERE manv = '${adminId}'`;
        db.query(sql, (err, result) => {
            if(err){
                console.log('Fail');
                reject(err)
            }else{
                console.log('Update profile success');
                resolve(result)
            }     
        })
    })
}
    // Khoá tài khoản admin:
exports.lockAdmin = (adminId) => {
    return new Promise( (resolve, reject) => {
        let sql = `UPDATE admin SET trangthai = 0 WHERE manv = '${adminId}'`;
        db.query(sql, (err, result) => {
            console.log('Lock admin success');
            resolve(result);
        })
    })
}
    // Mở khoá tài khoản admin:
exports.unlockAdmin = (adminId) => {
    return new Promise( (resolve, reject) => {
        let sql = `UPDATE admin SET trangthai = 1 WHERE manv = '${adminId}'`;
        db.query(sql, (err, result) => {
            console.log('Unlock admin success');
            resolve(result);
        })
    })
}


            // TRẠNG THÁI CỦA ĐƠN HÀNG:
    // Thêm trạng thái:
exports.insertStatusOr = (data) => {
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO trangthai SET ?";
        db.query(sql, data, (err, result) => {
            if(err)
                hamLoi(err);
            else{
                console.log('Insert status order successfully')
                resolve(result);
            }
        })
    })
}
    // Cập nhật trạng thái đơn hàng:
exports.updateStatusOr = (sttId, name) => {
    let sql = `UPDATE trangthai SET tentt = '${name}' WHERE trangthai = '${sttId}'`;
    db.query(sql, (err, result) => {
        console.log('Update status success');
    })
}
    // Xoá trạng thái:
exports.deleteStatusOr = (sttId) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql_type = `SELECT donhang.madonhang, donhang.makh, TT.trangthai
        FROM donhang JOIN trangthai TT
        ON donhang.trangthai = TT.trangthai
        WHERE TT.trangthai = '${sttId}'`;
        db.query(sql_type, (err, result) => {
            if(result[0] == null){
                console.log("Xoá được!");
                let sql = `DELETE FROM trangthai WHERE trangthai='${sttId}'`;
                db.query(sql, (err, result) => {
                    console.log('Delete type success');
                    hamOK(1);
                })
            }else{
                console.log("Không xoá được!");
                hamOK(-1);
            }
        })
    })  
}