import { Button, Form, Input, message } from "antd";
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import catalog from "API_Call/Api_catalog/catalog";

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

const EditCategory = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const Category = JSON.parse(localStorage.getItem("category"))

    const back = ()=>{
        localStorage.removeItem("category");
        history.goBack();
    }

    const update = (values) => {
        console.log(values)
        catalog.updateCatalog(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                localStorage.removeItem("category");
                setTimeout(() => {
                    history.push('/danh-muc-san-pham');
                }, 2000)
            }
        }) 
            .catch(err => {
                message.error(`Lỗi...! Sửa danh mục thất bại!\n ${err.response.data.message}`);
            })
    };

    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>SỬA THÔNG TIN DANH MỤC</h2>
            
            <Form
                {...formItemLayout}
                form={form}
                name="update"
                onFinish={update}
                initialValues={{
                    madm:`${Category.madm}`,
                    tendm:`${Category.tendm}`
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