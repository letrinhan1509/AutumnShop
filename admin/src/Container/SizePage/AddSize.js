import { Button, Form, Input, message, Select } from 'antd';
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import SIZE from 'API_Call/Api_product/product';

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


const AddSize = (props) => {

    const [form] = Form.useForm();
    const history = useHistory();
    /* const [listSize, setListSize] = useState([]);
    useEffect(() => {
        size.getSize().then((res) => {
            setListSize(res.data.listSize)
        })
    }, []); */

    const addSize = (values) => {
        SIZE.addSize(values).then((res) => {
            if(res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/bang-size');
                }, 2000)
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
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin của size</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="addProductType"
                    onFinish={addSize}
                    scrollToFirstError
                >
                    <Form.Item
                        name="size"
                        label="Size"
                        /* rules={[
                            {
                                type: 'string',
                                message: 'Mã loại sản phẩm không được để trống!',
                            },
                            {
                                required: true,
                                message: 'Điền mã loại sảm phẩm',
                            },
                        ]} */
                    >
                        <Select style={{ width: 150 }}>
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
                        label="Giới tính"
                    //rules={[{ required: true, message: 'Chọn mã loại!' }]}
                    >
                        <Select style={{ width: 150 }}>
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
                        <Link to={'/bang-size'} >
                            <Button className="ant-btn ant-btn-dashed " htmlType="submit" style={{ marginLeft: -30 }}>
                                Trở về
                            </Button>
                        </Link>
                        <Button type="primary" htmlType="submit" style={{marginLeft: 30}}>
                            Thêm size
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddSize;