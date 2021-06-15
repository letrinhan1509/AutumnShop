//import React, { useEffect, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Form, Input, Row, Col, Button, message, Select } from "antd";
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import "./scss/addpro.scss"

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

const EditProducer = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const Producer = JSON.parse(localStorage.getItem("producer"))
    
    const back = ()=>{
        localStorage.removeItem("producer")
        history.goBack();
    }

    const update = (values) => {
        console.log(values)
        const url = "http://127.0.0.1:5000/api/v1/nha-sx/cap-nhat-nha-sx";
        axios.put(url, values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/danh-sach-nha-sx');
                }, 2000)
            }
        }) 
            .catch(err => {
                message.error(`Lỗi...! Sửa nhà sản xuất thất bại!\n ${err.response.data.message}`);
            })
    };
    /*  const loadpage= ()=>{
         props.handleCreateUser();
     } */
    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>SỬA THÔNG TIN NHÀ SẢN XUẤT</h2>
            
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={update}
                initialValues={{
                    mansx:`${Producer.data.mansx}`,
                    tennsx:`${Producer.data.tennsx}`,
                    xuatxu:`${Producer.data.xuatxu}`,
                }}
                scrollToFirstError
                className="register-form"
            >
                <Form.Item
                    name="mansx"
                    id="mansx"
                    label="Mã nhà sản xuất"

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="tennsx"
                    id="tennsx"
                    label="Tên nhà sản xuất"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên nhà sản xuất !!!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="xuatxu"
                    id="xuatxu"
                    label="Xuất xứ"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Link onClick={back} ><p style={{marginRight:"20px",}} className="ant-btn ant-btn-dashed ">Trở về</p></Link>
                    <Button value="submit" type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditProducer;