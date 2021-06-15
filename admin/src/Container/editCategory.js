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

const EditCategory = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const Category = JSON.parse(localStorage.getItem("category"))

    const back = ()=>{
        localStorage.removeItem("category")
        history.goBack();
    }

    const update = (values) => {
        console.log(values)
        const url = "http://127.0.0.1:5000/api/v1/danh-muc/cap-nhat-danh-muc";
        axios.put(url, values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/danh-sach-nha-sx');
                }, 2000)
            }
        }) 
            .catch(err => {
                message.error(`Lỗi...! Sửa danh mục thất bại!\n ${err.response.data.message}`);
            })
    };
    /*  const loadpage= ()=>{
         props.handleCreateUser();
     } */
    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>SỬA THÔNG TIN DANH MỤC</h2>
            
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={update}
                initialValues={{
                    madm:`${Category.data.madm}`,
                    tendm:`${Category.data.tendm}`
                }}
                scrollToFirstError
                className="register-form"
            >
                <Form.Item
                    name="madm"
                    id="madm"
                    label="Mã danh mục"

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="tendm"
                    id="tendm"
                    label="Tên danh mục"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên danh mục !!!",
                            whitespace: true,
                        },
                    ]}
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

export default EditCategory;