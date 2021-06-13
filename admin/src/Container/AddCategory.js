import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Form, Input, Button, Select, message } from 'antd';
import { useHistory } from "react-router-dom"
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


const AddCategory = (props) => {

    const [form] = Form.useForm();
    const history = useHistory();


    const addProduct = (values) => {

        console.log(values)



        //let nameImg =urldown;

          console.log(values);
        
          catalog.addCatalog(values).then((res) => {
            message.success(res.data.message)
            setTimeout(() => {
                history.push('/danh-muc-san-pham');
            }, 2000)
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Thêm danh mục thất bại!\n ${err.response.data}`)
            })
    };
    const [fileList, setFileList] = useState([]);
    const [listProduct, setlistProduct] = useState([]);



    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin danh mục</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={addProduct}
                    scrollToFirstError
                >
                    <Form.Item
                        name="madm"
                        label="Mã danh mục"
                        rules={[
                            {
                                type: 'string',
                                message: 'Mã danh mục không được để trống!',
                            },
                            {
                                required: true,
                                message: 'Điền mã danh mục',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tendm"
                        label="Tên danh mục"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tên danh mục!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Thêm danh mục
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddCategory;
