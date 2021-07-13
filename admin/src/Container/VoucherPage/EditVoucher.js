import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Row, Form, Input, Button, Select, Checkbox, DatePicker, Space, message } from 'antd';
import { useHistory, Link } from "react-router-dom"
import "Container/scss/addpro.scss";
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;
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


const EditVoucher = (props) => {

    const [form] = Form.useForm();
    const history = useHistory();

    let voucherID = JSON.parse(localStorage.getItem('voucherID'));
    console.log(voucherID);
    const [datestart, setDatestart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    //let a = "";
    function startChange(date) {
        if(date !== null){
            setDatestart(date._d);
        }
    }
    function endChange(date) {
        if(date !== null){
            setDateEnd(date._d);
        }
    }
    const [title, setTitle] = useState("");
    const changett = (e) => {
        setTitle(e.target.value);
    };

    const editvoucher = (values) => {
        console.log(datestart.toLocaleDateString());
        values["ngaybd"] = moment(datestart).format('YYYY-MM-DD');
        values["ngaykt"] = moment(dateEnd).format('YYYY-MM-DD');
        values["trangthai"] = title;

        const url = "http://127.0.0.1:5000/api/v1/khuyen-mai/cap-nhat-voucher"
        axios.put(url, values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/danh-sach-voucher');
                }, 1000)
            } else
                message.error(res.data.message);
        })
            .catch(err => {
                message.error(`${err.response.data.message}\n Cập nhật thông tin voucher thất bại !\n `);
            });
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
                <h2 style={{ textAlign: 'center' }}> Chỉnh sửa thông tin voucher</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={editvoucher}
                    scrollToFirstError
                    initialValues={{
                        makm: `${voucherID.makm}`,
                        tenkm: `${voucherID.tenkm}`,
                        voucher: `${voucherID.voucher}`,
                        dieukien: `${voucherID.dieukien}`,
                        giagiam: `${voucherID.giagiam}`,
                        ghichu: `${voucherID.ghichu}`,
                        
                    }}
                >
                    <Form.Item
                        name="makm"
                        label="Mã khuyến mãi"
                        rules={[
                            {
                                type: 'string',
                                message: 'Mã khuyến mãi không được để trống!',
                            },
                            {
                                //required: true,
                                message: 'Điền mã khuyến mãi',
                            },
                        ]}
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        name="tenkm"
                        label="Tên khuyến mãi"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên khuyến mãi!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="voucher"
                        label="Mã Voucher"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mã Voucher!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="dieukien"
                        label="Điều kiện"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập điều kiện !',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="giagiam"
                        label="Giá giảm"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá được giảm!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="ghichu"
                        label="Ghi chú"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập ghi chú cho khuyến mãi này !',
                            },
                        ]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>
                    <Form.Item
                        label="Ngày bắt đầu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày bắt đầu!',
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
                                message: 'Vui lòng chọn ngày kết thúc!',
                            },
                        ]}
                    >
                        <DatePicker onChange={endChange} />
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                    >
                        <Checkbox onChange={changett} value="1">Hiện</Checkbox>
                        <Checkbox onChange={changett} value="0">Ẩn</Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Link to={'/danh-sach-voucher'} >
                            <Button className="ant-btn ant-btn-dashed " htmlType="submit" style={{ marginLeft: -30 }}>
                                Trở về
                            </Button>
                        </Link>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default EditVoucher;