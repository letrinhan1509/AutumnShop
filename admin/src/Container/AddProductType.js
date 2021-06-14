import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Form, Input, Button, Select, message } from 'antd';
import { useHistory, Link } from "react-router-dom"
import "./scss/addpro.scss"
import catalog from '../API_Call/Api_catalog/catalog';
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 22 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 20 },
        sm: { span: 15 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 22,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 10,
        },
    },
};


const AddProductType = (props) => {

    const [form] = Form.useForm();
    const history = useHistory();


    const addProduct = (values) => {

        console.log(values)



        //let nameImg =urldown;


        console.log(values);

        catalog.addProtype(values).then((res) => {
            message.success(res.data.message)
            setTimeout(() => {
                history.push('/danh-sach-loai');
            }, 2000)
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Thêm loại thất bại!\n ${err.response.data}`)
            })
    };
    const [fileList, setFileList] = useState([]);
    const [listProduct, setlistProduct] = useState([]);



    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin loại sản phẩm</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={addProduct}
                    scrollToFirstError
                >
                    <Form.Item
                        name="maloai"
                        label="Mã loại sản phẩm"
                        rules={[
                            {
                                type: 'string',
                                message: 'Mã loại sản phẩm không được để trống!',
                            },
                            {
                                required: true,
                                message: 'Điền mã loại sảm phẩm',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tenloai"
                        label="Tên loại sản phảm"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tên loại sản phẩm!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Link to={'/danh-sach-loai'} >
                            <Button className="ant-btn ant-btn-dashed " htmlType="submit" style={{ marginLeft: -30 }}>
                                Trở về
                            </Button>
                        </Link>
                        <Button type="primary" htmlType="submit" style={{marginLeft: 30}}>
                            Thêm loại sảm phẩm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddProductType;
