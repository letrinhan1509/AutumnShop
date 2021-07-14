import React, { useEffect, useState } from "react";
import { Row, Col, Carousel } from 'antd';
import { useHistory } from "react-router-dom";
import "container/components-css/saleInf.scss";
import cookies from "react-cookies";
import discount from 'API_Call/Api_discount/discount';

const SaleInf = () => {

    const [voucher, setVoucher] = useState([]);
    useEffect(() => {
        discount.getAllVoucher().then((res) => {
            setVoucher(res.data.voucher);
            console.log(res.data.voucher);
        })
    }, []);


    return (
        <>
            <Row>
                <Col className="title-box"><h1>Các voucher hiện có</h1></Col>
                <Col>
                    {voucher.map((item) => {
                        var batdau = new Date(item.ngaybd);
                        var ketthuc = new Date(item.ngaykt);

                        return (
                            <>
                                <Row className="sale-box">
                                    <Col className="col-two">
                                        <div className="img-box">
                                            <img src="https://cinestar.com.vn/pictures/c_monday.jpg" alt="khuyenmai" />
                                        </div>
                                        <ul>
                                            <h3>{item.tenkm}</h3>
                                            <li><span>Mã voucher: </span>{item.voucher}</li>
                                            <li><span>Nội dung: </span>{item.ghichu}</li>
                                            <li><span>Ngày bắt đầu: </span>{batdau.toLocaleDateString()}</li>
                                            <li><span>Ngày kết thúc: </span>{ketthuc.toLocaleDateString()}</li>
                                        </ul>
                                    </Col>
                                </Row>
                            </>
                        );
                    })}
                </Col>
            </Row>
        </>
    )
}
export default SaleInf;

