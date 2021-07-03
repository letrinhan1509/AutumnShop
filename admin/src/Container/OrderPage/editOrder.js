import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, message, Select, DatePicker } from 'antd';
import Meta from "antd/lib/card/Meta";
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import admins from 'API_Call/Api_admin/admin';
import admin from 'API_Call/Api_admin/admin';

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

    const back = () => {
        localStorage.removeItem("order");
    }


    const [dateEnd, setDateEnd] = useState("");
    function endChange(date) {
        setDateEnd(date._d);
        //a = date._d;
    }
    const [title, setTitle] = useState([]);
    useEffect(() => {
        admin.getTitle().then((res) => {
            if (res.data.status === "Success") {
                setTitle(res.data.data);
            }
        })
    }, [])
    const update = (values) => {
        values["ngaygiao"] = dateEnd.toLocaleDateString();
        console.log(title);
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
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>Sửa trạng thái đơn hàng</h2>
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
                <Form.Item
                    label="Ngày giao"
                    rules={[
                        {
                            //required: true,
                            message: 'Vui lòng chọn ngày giao hàng !',
                        },
                    ]}
                >
                    <DatePicker onChange={endChange} />
                </Form.Item>
                <Form.Item
                    name="trangthai"
                    id="trangthai"
                    label="Trạng thái đơn hàng"
                >
                    <Select style={{ width: 300 }}>
                        {title.map((item) => {
                            return (
                                <>
                                    <Option value={item.trangthai}>{item.tentt}</Option>
                                </>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Link to="/danh-sach-don-hang" onClick={back} ><p style={{ marginRight: "20px", }} className="ant-btn ant-btn-dashed">Trở về</p></Link>
                    <Button value="submit" type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default ListOrder;
