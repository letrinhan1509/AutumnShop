import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Row, Form, Input, Button, Select, Checkbox, DatePicker, Space, message, Upload } from 'antd';
import { useHistory, Link } from "react-router-dom"
import "Container/scss/addpro.scss";
import moment from 'moment';
import discount from 'API_Call/Api_discount/discount';
import { storage } from 'Container/Firebase/firebase';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

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

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};


const AddVoucher = (props) => {

    const [form] = Form.useForm();
    const history = useHistory();

    const [datestart, setDatestart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    //let a = "";
    function startChange(date) {
        if (date !== null) {
            setDatestart(date._d);

        }
    }
    function endChange(date) {
        if (date !== null) {
            setDateEnd(date._d);
        }
    }
    const [title, setTitle] = useState(true);
    const changett = (e) => {
        setTitle(e.target.value);
    };

    const [fileList, setFileList] = useState([]);
    const [image, setImage] = useState("");
    const beforeUpload = file => {
        setFileList(fileList.concat(file));
        setImage(file[0]);
        return false;
    }
    const handleChange = file => {
        if (fileList != "") {
            setImage(fileList[0]);
        }
    };

    //Download link từ Firebase
    const [link, setLink] = useState("");
    const upfirebase = () => {
        const upload = storage.ref(`Voucher_img/${image.name}`).put(image);
        upload.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("Voucher_img")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log("ulr:", url);
                        setLink(url);
                    });
                message.success("download link thành công!");
            }
        );

    };

    const addProduct = (values) => {
        console.log(datestart.toLocaleDateString());
        values["ngaybd"] = moment(datestart.toLocaleDateString()).format('YYYY-DD-MM');
        values["ngaykt"] = moment(dateEnd.toLocaleDateString()).format('YYYY-DD-MM');
        values["trangthai"] = title;
        values['img'] = link;
        console.log(values);

        //const url = "http://127.0.0.1:5000/api/v1/khuyen-mai/them-voucher"
        /* discount.addVoucher(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/danh-sach-voucher');
                }, 1000)
            } else
                message.error(res.data.message);
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Tạo voucher thất bại !\n ${err.response.data.message}`)
            }); */
    };
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
                    {/* <Form.Item
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
                        <Input />
                    </Form.Item> */}
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
                        name="hinh"
                        label="Ảnh sản phẩm"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}

                    >
                        <Upload
                            listType="picture"

                            name='hinh'
                            multiple='true'
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            fileList
                        >
                            <Button icon={<UploadOutlined />} >Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Downloat link Firebase">
                        {
                            link == "" ? (
                                <Button icon={<DownloadOutlined />} onClick={upfirebase} >Downlink</Button>
                            ) : (
                                <Button icon={<DownloadOutlined />} onClick={upfirebase} disabled>Downlink</Button>
                            )
                        }
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
                        {link === "" ? (
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }} disabled>
                                Thêm voucher
                            </Button>
                        ) : (
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                                Thêm voucher
                            </Button>
                        )}

                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddVoucher;
