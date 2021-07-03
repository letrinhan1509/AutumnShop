import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, message, Select, DatePicker } from 'antd';
import Meta from "antd/lib/card/Meta";
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import admins from 'API_Call/Api_admin/admin';
import admin from 'API_Call/Api_admin/admin';
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
const ListOrder = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { Option } = Select;
    const order = JSON.parse(localStorage.getItem("order"));
    console.log(order);
    const ORDER = order[0];
    console.log(ORDER.tentt);
    var date = new Date(ORDER.ngaydat);

    const back = () => {
        localStorage.removeItem("order");
    }


    const [dateEnd, setDateEnd] = useState("");
    function endChange(date) {
        if(order !== null){
            setDateEnd(date._d);
        }
    }
    /* const [select, setSelect] = useState("");
    function titleChange(e) {
        setSelect(e);
    } */
    const [title, setTitle] = useState([]);
    useEffect(() => {
        admin.getTitle().then((res) => {
            if (res.data.status === "Success") {
                setTitle(res.data.data);
            }
        })
    }, [])
    const update = (values) => {
        if (dateEnd.length === 0) {
            values["ngaygiao"] = "";
        } else {
            values["ngaygiao"] = moment(dateEnd).format('YYYY-MM-DD');
        }

        console.log(values);
        /* admins.updateSTTorder(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                localStorage.removeItem("order");
                setTimeout(() => {
                    history.push('/danh-sach-don-hang');
                }, 2000)
            }
        })
        .catch(err => {
                message.error(`Lỗi...! Sửa đơn hàng thất bại!\n ${err.response.data.message}`);
        }) */
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
                initialValues={order === null ? ("") : (
                    {
                        trangthai: `${ORDER.tentt}`,
                    }
                )}
            >
                <Form.Item >
                    <div className="btn-box-edit">                        
                        <Button onClick={back} className="pay" type="danger">
                            <Link to="/danh-sach-don-hang">Trở về</Link>
                        </Button>
                        <Button className="pay" value="submit" type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </div>
                </Form.Item>
                <Row className="box">
                    <Col className="col-one">
                        <h1>Sửa trạng thái đơn hàng</h1>
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
                            <li><span>Ngày đặt: </span>{date.toLocaleDateString()}</li>
                            <li><span>Ngày giao: </span><DatePicker onChange={endChange} /></li>
                            <li><span>Phí vận chuyển: </span>{ORDER.tienship}</li>
                            <li><span>Tổng hóa đơn: </span>{ORDER.tongtien}</li>
                            {ORDER.ngaygiao === null ? ("") : (<li><span>Ngày giao hàng: </span></li>)}
                            <li>
                                <Form.Item
                                    name="trangthai"
                                    id="trangthai"
                                    label="Trạng thái đơn hàng: "
                                >
                                    <Select className="tentt" style={{ width: 300 }}>
                                        {title.map((item) => {
                                            return (
                                                <>
                                                    <Option className="tentt" value={item.trangthai}>{item.tentt}</Option>
                                                </>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>
                            </li>
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
                
            </Form>
        </div>
    );
}

export default ListOrder;
