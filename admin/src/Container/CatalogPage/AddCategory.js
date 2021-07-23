import { Button, Form, Input, message } from 'antd';
import catalog from 'API_Call/Api_catalog/catalog';
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";

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


    const addCatalog = (values) => {
        catalog.addCatalog(values).then((res) => {
            message.success(res.data.message)
            setTimeout(() => {
                history.push('/danh-muc-san-pham');
            }, 2000)
        })
            .catch(err => {
                console.log(err.response);
                message.error(`${err.response.data.message}`)
            })
    };


    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin danh mục</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="addCatalog"
                    onFinish={addCatalog}
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
                        <Link to={'/danh-muc-san-pham'} >
                            <Button className="ant-btn ant-btn-dashed " htmlType="submit" style={{ marginLeft: -30 }}>
                                Trở về
                            </Button>
                        </Link>
                        <Button type="primary" htmlType="submit" style={{marginLeft: 30}}>
                            Thêm danh mục
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddCategory;
