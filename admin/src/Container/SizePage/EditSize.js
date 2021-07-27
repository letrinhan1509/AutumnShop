import "Container/scss/addpro.scss";
import { Button, Form, Input, message, Select } from "antd";
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import SIZE from 'API_Call/Api_product/product';

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

const EditSize = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const Size = JSON.parse(localStorage.getItem("size"))

    const back = ()=>{
        localStorage.removeItem("size");
        history.goBack();
    }

    const register = (values) => {
        console.log(values)
        SIZE.updateSize(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                localStorage.removeItem("size");
                setTimeout(() => {
                    history.push('/bang-size');
                }, 2000)
            }
            else {
                message.error(res.data.message)
            }
        }) 
            .catch(err => {
                message.error(`${err.response.data.message}`)
            })
    };

    const size = [
        {
            key: 1,
            masize: 'S',
            tensize: 'S',
        },
        {
            key: 2,
            masize: 'M',
            tensize: 'M',
        },
        {
            key: 3,
            masize: 'L',
            tensize: 'L',
        },
        {
            key: 4,
            masize: 'XL',
            tensize: 'XL',
        }
    ];

    const gioitinh = [
        {
            key: 1,
            ma: 'Nam',
            ten: 'Nam',
        },
        {
            key: 2,
            ma: 'Nữ',
            ten: 'Nữ',
        }
    ];
    
    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>SỬA THÔNG TIN SIZE QUẦN ÁO</h2>

            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={register}
                initialValues={{
                    masize:`${Size.masize}`,
                    size:`${Size.size}`,
                    gioitinh:`${Size.gioitinh}`,
                    cannangtu:`${Size.cannangtu}`,
                    cannangden:`${Size.cannangden}`,
                    chieucaotu:`${Size.chieucaotu}`,
                    chieucaoden:`${Size.chieucaoden}`
                }}
                scrollToFirstError
                className="register-form"
            >

                <Form.Item
                    name="masize"
                    id="masize"
                    label="Mã size"

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="size"
                    label="Size"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên loại !!!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Select>
                        {size.map((item) => {
                        return (
                            <>
                                <Option value={item.masize}>{item.tensize}</Option>
                            </>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="gioitinh"
                    id="gioitinh"
                    label="Giới tính"
                >
                    <Select>
                        {gioitinh.map((item) => {
                        return (
                            <>
                                <Option value={item.ma}>{item.ten}</Option>
                            </>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="cannangtu"
                    id="cannangtu"
                    label="Cân nặng từ"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập cân nặng!',
                        },
                    ]}
                >
                    <Input style={{ width: 200 }} placeholder="Nhập số cân nặng"/>
                </Form.Item>
                <Form.Item
                    name="cannangden"
                    id="cannangden"
                    label="Cân nặng đến"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập cân nặng!',
                        },
                    ]}
                >
                    <Input style={{ width: 200 }} placeholder="Nhập số cân nặng"/>
                </Form.Item>
                <Form.Item
                    name="chieucaotu"
                    id="chieucaotu"
                    label="Chiều cao từ"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập chiều cao!',
                        },
                    ]}
                >
                    <Input style={{ width: 200 }} placeholder="Nhập chiều cao"/>
                </Form.Item>
                <Form.Item
                    name="chieucaoden"
                    id="chieucaoden"
                    label="Chiều cao đến"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập chiều cao!',
                        },
                    ]}
                >
                    <Input style={{ width: 200 }} placeholder="Nhập chiều cao"/>
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

export default EditSize;