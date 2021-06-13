import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Form, Input, Button, Upload, InputNumber, Select, message } from 'antd';
import { useHistory } from "react-router-dom"
import { UploadOutlined, } from '@ant-design/icons';
import { storage } from "../firebase"
import "./scss/addpro.scss"
import product from '../API_Call/Api_product/product';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 20 },
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
            span: 24,
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

const AddProduct = (props) => {
    const [image, setImage] = useState("");
    const [urldown, setUrldown] = useState("");




    const handleUpload = () => {

    };
    const [form] = Form.useForm();
    const history = useHistory();

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

    console.log(image);

    const addProduct = (values) => {
        let a = [];
        const upload = storage.ref(`Product_Img/${image.name}`).put(image);
        upload.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("Product_Img")
                    .child(image.name)
                    .getDownloadURL()
                    .then(async url => {
                        console.log("ulr:", url);

                        a.push(url);
                        console.log(a);
                    });
            }
        );
        console.log(a);

        //setUrldown(a);
        values["img"] = a;
        console.log(values)



        //let nameImg =urldown;
        //values["img"] = urldown;
          

        product.addproduct(values).then((res) => {
            message.success(res.data.message)
            setTimeout(() => {
                history.push('/tat-ca-san-pham');
            }, 2000)
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Login fail!\n ${err.response.data}`)
            })
    };
    console.log(urldown);
    const [fileList, setFileList] = useState([]);
    const meta = {
        title: 'title 1',
        contents: 'contents 1',
    }


    console.log(image);

    const [listProduct, setlistProduct] = useState([]);

    /*     useEffect(() => {
            axios.get("http://127.0.0.1:5000/api/v1/producer").then((res) => {
                setlistProduct(res.data.data)
            })
        }, []) */
    console.log(listProduct);
    console.log(props.listType);

    const listType = [
        {
            key: 1,
            maloai: 'at',
            tenloai: 'Áo thun',
        },
        {
            key: 2,
            maloai: 'ak',
            tenloai: 'Áo khoát',
        }
    ];
    const nsx = [
        {
            key: 1,
            mansx: 'ym',
            tennsx: 'YaMe',
        },
        {
            key: 2,
            mansx: 'rt',
            tennsx: 'Routine',
        }
    ];
    const mau = [
        {
            key: 1,
            mamau: 'xanh',
            tenmau: 'Xanh',
        },
        {
            key: 2,
            mamau: 'do',
            tenmau: 'Đỏ',
        },
        {
            key: 3,
            mamau: 'den',
            tenmau: 'Đen',
        },
        {
            key: 4,
            mamau: 'trang',
            tenmau: 'Trắng',
        }
    ];
    const options = [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
    ];
    const danhmuc = [
        {
            key: 1,
            madm: 'bl',
            tendm: 'Balo'
        },
        {
            key: 2,
            madm: 'ao',
            tendm: 'Áo'
        },
        {
            key: 3,
            madm: 'giay',
            tendm: 'Giày'
        },
        {
            key: 4,
            madm: 'pk',
            tendm: 'Phụ Kiện'
        }
    ];
    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }
    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin sản phẩm</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={addProduct}
                    scrollToFirstError
                >
                    <Form.Item
                        name="code"
                        label="Code"
                        rules={[
                            {
                                //required: true,
                                message: 'Nhập Code!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Tên sản phẩm"
                        rules={[
                            {
                                //required: true,
                                message: 'Nhập tên sản phẩm!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="soluong"
                        label="Số lượng"
                    >
                        <InputNumber min={1} max={20} defaultValue={1} />
                    </Form.Item>
                    <Form.Item
                        name="size"
                        label="Size"
                    //rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="mau"
                        label="Màu"
                    //rules={[{ required: false }]}
                    >
                        <Select>
                            {mau.map((item) => {
                                return (
                                    <>
                                        <Option value={item.mamau}>{item.tenmau}</Option>
                                    </>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="gia"
                        label="Giá"
                        rules={[
                            {
                                //required: true,
                                message: 'Nhập giá sản phẩm!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                    name="redPrice"
                    label="Khuyến mãi"
                    rules={[{ required: false }]}
                >
                    <Input />
                </Form.Item> */}
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
                    {/* <input type="file" onChange={handleChange}/>
                <button onClick={handleUpload}>Upload</button> */}
                    <Form.Item
                        name="mota"
                        label="Mô tả"
                        rules={[
                            {
                                //required: true,
                                message: 'Nhập mô tả sản phẩm!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item name="trangthai"
                        label="Trạng thái"
                    //rules={[{ required: true, message: 'Chọn trạng thái!' }]}
                    >
                        <Checkbox.Group options={options} onChange={onChange} />
                    </Form.Item> */}
                    <Form.Item name="mansx"
                        label="Nhà sản xuất"
                    //rules={[{ required: true, message: 'Chọn nhà sản xuất!' }]}
                    >
                        <Select>
                            {nsx.map((item) => {
                                return (
                                    <>
                                        <Option value={item.mansx}>{item.tennsx}</Option>
                                    </>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="maloai"
                        label="Loại sản phẩm"
                    //rules={[{ required: true, message: 'Chọn mã loại!' }]}
                    >
                        <Select>
                            {listType.map((item) => {
                                return (
                                    <>
                                        <Option value={item.maloai}>{item.tenloai}</Option>
                                    </>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="madm"
                        label="danh mục"
                    //rules={[{ required: true, message: 'Chọn mã loại!' }]}
                    >
                        <Select>
                            {danhmuc.map((item) => {
                                return (
                                    <>
                                        <Option value={item.madm}>{item.tendm}</Option>
                                    </>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Thêm sảm phẩm
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddProduct;
