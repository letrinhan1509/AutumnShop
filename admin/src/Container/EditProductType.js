//import React, { useEffect, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Form, Input, Row, Col, Button, message, Select } from "antd";
import axios from "axios"
import { Link, useHistory } from "react-router-dom"

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
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
            offset: 8,
        },
    },
};

const EditProductType = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const Type = JSON.parse(localStorage.getItem("type"))

    const register = (values) => {
        console.log(values)
        const url = "http://127.0.0.1:5000/api/v1/danh-muc/cap-nhat-loai"
        axios.put(url, values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/danh-sach-loai');
                }, 2000)
            }
            else {
                //message.error("Sửa thông tin thất bại")
                message.error(res.data.message)
            }
        }) 
            .catch(err => {
                console.log(err.response);
                message.error(`Lỗi...! Sửa loại thất bại!\n ${err.response.data}`)
            })
    };
    /*  const loadpage= ()=>{
         props.handleCreateUser();
     } */
    return (
        <Row className="register-container">
            <Col className="register-form-wrapper" offset={6} span={10}>
                <h2 style={{ textAlign: 'center' }}>SỬA THÔNG TIN LOẠI SẢN PHẨM</h2>

                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={register}
                    initialValues={{
                        maloai:`${Type.data.maloai}`,
                        name:`${Type.data.tenloai}`,
                        madm:`${Type.data.madm}`,
                    }}
                    scrollToFirstError
                    className="register-form"
                >

                    <Form.Item
                        name="maloai"
                        id="maloai"
                        label="Mã loại"

                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Tên nhân viên"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên loại !!!",
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="madm"
                        id="madm"
                        label="Mã danh mục"
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        name="set"
                        hidden='true'
                    >
                        <Input value="123" id={"123"} defaultValue={"123"} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Link to={'/danh-sach-loai'} ><p style={{marginRight:"20px",}} className="ant-btn ant-btn-dashed ">Trở về</p></Link>
                        <Button value="submit" type="primary" htmlType="submit">
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>

            </Col>
        </Row >
    );
}

export default EditProductType;