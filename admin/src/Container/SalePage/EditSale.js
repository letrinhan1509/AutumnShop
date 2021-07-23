import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, message, Select, DatePicker } from 'antd';
import Meta from "antd/lib/card/Meta";
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import orders from 'API_Call/Api_order/order';
import moment from 'moment';

const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 22,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 20,
        },
        sm: {
            span: 15,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 9,
        },
    },
};
const EditSale = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { Option } = Select;
    const saleID = JSON.parse(localStorage.getItem("saleID"));
    var dateBD = new Date(saleID.ngaybd);
    var dateKT = new Date(saleID.ngaykt);

    const back = () => {
        localStorage.removeItem("saleID");
    }

    const [dateStart, setDateStart] = useState("");
    function startChange(date) {
        if (saleID !== null) {
            setDateStart(date._d);
        }
    }
    const [dateEnd, setDateEnd] = useState("");
    function endChange(date) {
        if (saleID !== null) {
            setDateEnd(date._d);
        }
    }

    const update = (values) => {
        if (dateStart.length !== 0 && dateEnd.length !== 0) {
            values["ngaybd"] = moment(dateStart).format('YYYY-MM-DD');
            values["ngaykt"] = moment(dateEnd).format('YYYY-MM-DD');
        }
        console.log(values);
        /* orders.updateStatus(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                localStorage.removeItem("order");
                setTimeout(() => {
                    history.push('/danh-sach-don-hang');
                }, 2000)
            }
        })
            .catch(err => {
                message.error(`${err.response.data.message}\n Cập nhật đơn hàng thất bại! `);
            }) */
    };
    const [datePickers, setDatePickers] = useState(false);
    const changeDate = () => {
        setDatePickers(!datePickers);
    };

    return (
        <div className="wrapper" >
            <Form
                {...formItemLayout}
                form={form}
                name="update"
                onFinish={update}
                scrollToFirstError
                className="register-form"
                /*initialValues={ORDER === null ? ("") : (
                    {
                        trangthai: `${ORDER.tentt}`,
                    }
                )}*/
            >
                <Form.Item >
                    <div className="btn-box-edit">
                        <Button onClick={back} className="pay" type="danger">
                            <Link to="/danh-sach-khuyen-mai">Trở về</Link>
                        </Button>
                        <Button className="pay" value="submit" type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </div>
                </Form.Item>
                <Row className="box">
                    <Col className="col-one">
                        <h1>Sửa thông tin khuyến mãi</h1>
                        <ul>
                            {/* <li>Mã Khách hàng: {ORDER.makh}</li> */}
                            <li><span>Mã chương trình: </span>{saleID.makm}</li>
                            <li><span>Tên khuyến mãi: </span>{saleID.tenkm}</li>
                            {saleID.ghichu === "" ? ("") : (<li><span>Ghi chú: </span>{saleID.ghichu}</li>)}
                            {datePickers === false ? (
                                <>
                                    <li><span>Ngày bắt đầu: </span>{dateBD.toLocaleDateString()}</li>
                                    <li><span>Ngày kết thúc: </span>{dateKT.toLocaleDateString()}</li>
                                </>
                            ) : (
                                <>
                                    <li><span>Ngày bắt đầu: </span><DatePicker onChange={startChange} /></li>
                                    <li><span>Ngày kết thúc: </span><DatePicker onChange={endChange} /></li>
                                </>
                            )}
                            <Button onClick={changeDate}>Thay đổi ngày</Button>
                        </ul>
                    </Col>
                    <Col className="col-two">
                        <h3>Chi tiết khuyến mãi</h3>
                        <ul>
                            {saleID.chitietKM.map((item) => (
                                <li className="number">
                                    <ul>
                                        <li><span>Chiết khấu: </span>{item.chietkhau}</li>
                                        <li><span>Mã sản phẩm: </span>{item.masp}</li>
                                        <li><span>Tên sản phẩm: </span>{item.tensp}</li>
                                        <li><span>Số lượng: </span>{item.soluong}</li>
                                        <li><span>Giá: </span>{item.giakm}Đ</li>
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default EditSale;
