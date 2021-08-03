const express = require('express');
const db = require('./database');

// resolve: Hàm trả về kết quả đúng.
// reject: Hàm trả về nếu bị err.
var dataList = [];


exports.list_Carts = async () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM giohang`;
        db.query(sql, (err, result) => {
            if(err) {
                hamLoi(err);
            } else if(result.length <= 0){
                hamOK(0);
            } else{
                hamOK(result);
            }
        });
    });
};

exports.get_Cart = async (id) => {
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM giohang WHERE magiohang = '${id}'`;
        db.query(sql, (err, result) => {
            if(err) {
                reject(err);
            } else if(result.length <= 0){
                resolve(0);
            } else{
                resolve(result[0]);
            }
        });
    });
};

exports.get_By_userId = async (userId) => {
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM giohang WHERE makh = '${userId}'`;
        db.query(sql, (err, result) => {
            if(err) {
                reject(err);
            } else if(result.length <= 0){
                resolve(0);
            } else{
                dataList = result;
                resolve(dataList);
            }
        });
    });
};

exports.get_By_productId = async (id) => {
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM giohang WHERE masp = '${id}'`;
        db.query(sql, (err, result) => {
            if(err) {
                reject(err);
            } else if(result.length <= 0){
                resolve(0);
            } else{
                dataList = result;
                resolve(dataList);
            }
        });
    });
};

exports.create = async (data) => {
    return new Promise( (resolve, reject) => {
        let sql = `INSERT INTO giohang SET ?`;
        db.query(sql, data, (err, result) => {
            if(err) {
                reject(err);
            } else{
                resolve("Thêm sản phẩm vào giỏ hàng thành công !!!");
            }
        });
    });
};

exports.put = async (data) => {
    return new Promise( (resolve, reject) => {
        let sql = `UPDATE giohang SET giagiam='${data.giagiam}', soluong='${data.soluong}', thanhtien='${data.thanhtien}'
        WHERE magiohang = '${data.magiohang}'`;
        db.query(sql, data, (err, result) => {
            if(err) {
                reject(err);
            } else{
                resolve("Cập nhật sản phẩm trong giỏ hàng thành công !!!");
            }
        });
    });
};
// Xoá 1 sản phẩm trong giỏ hàng theo mã giỏ hàng:
exports.delete = async (id) => {
    return new Promise( (resolve, reject) => {
        let sql = `DELETE FROM giohang WHERE magiohang = '${id}'`;
        db.query(sql, (err, result) => {
            if(err) {
                reject(err);
            } else{
                resolve("Xoá sản phẩm trong giỏ hàng thành công !!!");
            }
        });
    });
};
// Xoá 1 sản phẩm trong giỏ hàng theo mã sản phẩm:

// Xoá giỏ hàng theo mã khách hàng:
exports.delete_Customer = async (makh) => {
    return new Promise( (resolve, reject) => {
        let sql = `DELETE FROM giohang WHERE makh = '${makh}'`;
        db.query(sql, (err, result) => {
            if(err) {
                reject(err);
            } else{
                resolve("Xoá giỏ hàng thành công !!!");
            }
        });
    });
};