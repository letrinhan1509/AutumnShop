import "Container/scss/addpro.scss";
import { Button, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import catalog from 'API_Call/Api_catalog/catalog';

const { Option } = Select;
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

const EditProductType = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const Type = JSON.parse(localStorage.getItem("type"))

    const back = ()=>{
        localStorage.removeItem("type");
        history.goBack();
    }

    const [listCategory, setlistCategory] = useState([]);
    useEffect(() => {
        catalog.getAll().then((res) => {
            setlistCategory(res.data.listCategorys)
        })
    }, []);

    const register = (values) => {
        console.log(values)
        catalog.updateProtype(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                localStorage.removeItem("type");
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
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>SỬA THÔNG TIN LOẠI SẢN PHẨM</h2>

            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={register}
                initialValues={{
                    maloai:`${Type.data.maloai}`,
                    tenloai:`${Type.data.tenloai}`,
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
                    name="tenloai"
                    label="Tên loại"
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
                    <Select>
                            {listCategory.map((item) => {
                                return (
                                    <>
                                        <Option value={item.madm}>{item.tendm}</Option>
                                    </>
                                )
                            })}
                        </Select>
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

export default EditProductType;