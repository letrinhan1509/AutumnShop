import React, { useState, useEffect } from 'react';
import { Image, Row, Col, Input, Button, message, Select, Table } from 'antd';
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";
import "Container/scss/orderDetail.scss";

const { TextArea } = Input;

const OrderDetail = (props) => {
    const order = JSON.parse(localStorage.getItem("order"));
    console.log(order);
    const ORDER = order[0];
    console.log(ORDER);
    var date = new Date(ORDER.ngaydat);
    console.log(date);

    const back = () => {
        localStorage.removeItem("order");
    }

    return (
        <div className="wrapper" >
            <Row className="btn-box">
                <Button onClick={back} className="pay" type="primary">
                    <Link to="/danh-sach-don-hang">Trở về</Link>
                </Button>
            </Row>
            <Row className="box">
                <Col className="col-one">
                    <h1>Thông tin đơn hàng</h1>
                    <ul>
                        {/* <li>Mã Khách hàng: {ORDER.makh}</li> */}
                        <li><span>Mã đơn hàng: </span>{ORDER.madonhang}</li>
                        <li><span>Tên khách hàng: </span>{ORDER.tenkh}</li>
                        <li><span>Điện thoại: </span>{ORDER.sodienthoai}</li>
                        <li><span>Email: </span>{ORDER.email}</li>
                        <li><span>Địa chỉ: </span>{ORDER.diachi}</li>
                        <li><span>Hình thức thanh toán: </span>{ORDER.hinhthuc}</li>
                        {ORDER.ghichu === "" ? ("") : (<li><span>Ghi chú: </span>{ORDER.ghichu}</li>)}
                        {/* {ORDER.makm === null ? ("") : (<li><span>Mã khuyến mãi: </span>{ORDER.makm}</li>)} */}
                        <li><span>Ngày đặt: </span>{date.toLocaleString()}</li>
                        <li><span>Phí vận chuyển: </span>{ORDER.tienship}</li>
                        <li><span>Tổng hóa đơn: </span>{ORDER.tongtien}</li>
                        {ORDER.ngaygiao === null ? ("") : (<li><span>Ngày giao hàng: </span></li>)}
                        <li><span>Trạng thái đơn hàng: </span>{ORDER.tentt}</li>
                    </ul>
                </Col>
                <Col className="col-two">
                    <h3>Chi tiết đơn hàng</h3>
                    <ul>
                        {ORDER.chitietDH.map((item) => (
                            <li className="number">
                                <ul>
                                    <li><span>Tên sản phẩm: </span>{item.tensp}</li>
                                    <li><span>Số lượng: </span>{item.soluong}</li>
                                    <li><span>Giá: </span>{item.gia}Đ</li>
                                    {Number(item.giagiam) === 0 ? ("") : (<li><span>Giảm giá: </span>{item.giagiam}</li>)}
                                    <li><span>Thành tiền: </span>{item.thanhtien}Đ</li>
                                </ul>
                            </li>
                        ))}
                    </ul>

                </Col>
            </Row>

        </div>
    );
}

export default OrderDetail;
