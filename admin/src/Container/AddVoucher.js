import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Form, Input, Button, Select, Checkbox, DatePicker, Space  } from 'antd';
import { useHistory } from "react-router-dom"
import "./scss/addpro.scss"
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


const AddVoucher = (props) => {

    const [form] = Form.useForm();
    const history = useHistory();

    const [datestart, setDatestart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    //let a = "";
    function startChange(date) {
        setDatestart(date._d);
        //a = date._d;
      }
    function endChange(date) {
        setDateEnd(date._d);
        //a = date._d;
      }
    const addProduct = (values) => {
        console.log(datestart);
        values["ngaybd"] = datestart;
        values["ngaykt"] = dateEnd;
        console.log(values)



        //let nameImg =urldown;
        /*   values["img"] = urldown;
          
          console.log(values) */
        /* const url = "http://127.0.0.1:5000/api/v1/add-product"
        axios.post(url, values).then((res) => {
            message.success(res.data.message)
            setTimeout(() => {
                history.push('/all');
            }, 2000)
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Login fail!\n ${err.response.data}`)
            }) */
    };
    const [fileList, setFileList] = useState([]);
    const [listProduct, setlistProduct] = useState([]);


    const options = [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
    ];

    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin voucher</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={addProduct}
                    scrollToFirstError
                >
                    <Form.Item
                        name="tenkm"
                        label="Tên khuyến mãi"
                        rules={[
                            {
                                //required: true,
                                message: 'Nhập tên khuyến mãi!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="dieukien"
                        label="điều kiện"
                        rules={[
                            {
                                //required: true,
                                message: 'Nhập điều kiện!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ngày bắt đầu"
                        rules={[
                            {
                                required: true,
                                message: 'chọn ngày bắt đầu!',
                            },
                        ]}
                    >
                        <DatePicker onChange={startChange} />
                    </Form.Item>
                    <Form.Item
                        label="Ngày kết thúc"
                        rules={[
                            {
                                required: true,
                                message: 'chọn ngày thúc!',
                            },
                        ]}
                    >
                        <DatePicker onChange={endChange} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Thêm voucher
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddVoucher;
