import { Button, Form, Input, message, Select } from "antd";
import axios from "axios";
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";

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

const EditNV = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const Admin = JSON.parse(localStorage.getItem("admin"))
    console.log(Admin);

    const back = ()=>{
        localStorage.removeItem("admin");
        history.goBack();
    }

    const register = (values) => {
        console.log(values)
        let a = JSON.stringify({ admin: "adas@gmail.com" });
        console.log(a);
        const url = "http://127.0.0.1:5000/api/v1/admin/cap-nhat-tai-khoan"
        axios.put(url, values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                localStorage.removeItem("admin");
                setTimeout(() => {
                    history.push('/danh-sach-admin');
                }, 2000)
            }
            else {
                //message.error("Sửa thông tin thất bại")
                message.error(res.data.message)
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Login fail!\n ${err.response.data}`)
            })
    };
    /*  const loadpage= ()=>{
         props.handleCreateUser();
     } */
    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>SỬA THÔNG TIN NHÂN VIÊN</h2>

            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={register}
                initialValues={{
                    adminId: `${Admin.data.manv}`,
                    prefix: "86",
                    email: `${Admin.data.admin}`,

                    name: `${Admin.data.tennv}`,
                    pass: `${Admin.data.matkhau}`,
                    pass1: `${Admin.data.matkhau}`,
                    phone: `${Admin.data.sodienthoai}`,
                    address: `${Admin.data.diachi}`,
                    permission: `${Admin.data.quyen}`
                }}
                scrollToFirstError
                className="register-form"
            >

                <Form.Item
                    name="adminId"
                    id="adminId"
                    label="Mã nhân viên"

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="email"
                    id="admin"
                    label="E-mail"
                    rules={[
                        {
                            type: "email",
                            message: "Vui lòng nhập đúng E-mail!",
                        },
                        {
                            required: true,
                            message: "Bạn chưa nhập E-mail !",
                        },
                    ]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="name"

                    label="Tên nhân viên"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên tài khoản !!!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    id="pass"
                    name="pass"
                    label="Mật khẩu"
                    rules={[
                        {
                            required: true,
                            message: "Bạn chưa nhập mật khẩu!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item

                    name="pass1"
                    label="Xác nhận mật khẩu"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Bạn phải xác nhận mật khẩu!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("pass") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "Hai mật khẩu phải giống nhau!"
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="phone"
                    id="phone"
                    label="Phone Number"
                    rules={[{
                        required: true,
                        message: 'Vui lòng nhập số điện thoại !'
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    id="address"
                    label="Địa chỉ"
                    rules={[{
                        required: true,
                        message: 'Vui lòng nhập địa chỉ !'
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="permission"
                    label="Phân quyền"
                >
                    <Select>
                        <Option value="1">Admin</Option>
                        <Option value="2">Nhân viên bán hàng</Option>
                        <Option value="3">Nhân viên giao hàng</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="set"
                    hidden='true'
                >
                    <Input value="123" id={"123"} defaultValue={"123"} />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Link onClick={back} ><p style={{ marginRight: "20px", }} className="ant-btn ant-btn-dashed ">Trở về</p></Link>
                    <Button value="submit" type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditNV;