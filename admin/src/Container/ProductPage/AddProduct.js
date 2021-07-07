import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Select, Upload } from 'antd';
import product from 'API_Call/Api_product/product';
import catalog from 'API_Call/Api_catalog/catalog';
import producer from 'API_Call/Api_producer/producer';
import { storage } from 'Container/Firebase/firebase';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
const { TextArea } = Input;

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
    const [form] = Form.useForm();
    const history = useHistory();
    const [fileList, setFileList] = useState([]);

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
                    .then(url => {
                        console.log("ulr:", url);
                        setLink(url);
                    });
                message.success("download link thành công!");
            }
        );

    };
    console.log(link);

    const addProduct = (values) => {
        console.log(link);
        values['img'] = link;
        console.log(values.img);
        console.log(values);
        product.addproduct(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/tat-ca-san-pham');
                }, 2000)
            };
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Thêm thất bại!\n ${err.response.data.message}`)
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

    //API NSX - DM - Loại
    const [listProducer, setlistProducer] = useState([]);
    useEffect(() => {
        producer.getAll().then((res) => {
            setlistProducer(res.data.data)
        })
    }, []);

    const [listCategory, setlistCategory] = useState([]);
    useEffect(() => {
        catalog.getAll().then((res) => {
            setlistCategory(res.data.data);
        })
    }, []);

    const [listTypes, setlistTypes] = useState([]);
    useEffect(() => {
        catalog.getAllType().then((res) => {
            setlistTypes(res.data.data);
        })
    }, []);

    //Hiển thị loại theo danh mục
    const onChange = (e) => {
        let id = "";
        id = e;
        console.log(id);
        catalog.getTypeDanhmucID(id).then((res) => {
            setlistTypes(res.data.data);
        })
    };

    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin sản phẩm</h2>

                <Form
                    {...formItemLayout}
                    form={form}
                    name="addProduct"
                    onFinish={addProduct}
                    scrollToFirstError
                //initialValues={{img: link}}

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
                        name="ten"
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
                        name="mau"
                        label="Màu"
                    //rules={[{ required: false }]}
                    >
                        <Select style={{ width: 150 }}>
                            {mau.map((item) => {
                                return (
                                    <>
                                        <Option value={item.tenmau}>{item.tenmau}</Option>
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
                        name="img"
                        label="img"
                        hidden
                    >
                        <Input />
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
                        <TextArea rows={3} />
                    </Form.Item>
                    <Form.Item name="trangthai"
                        label="Trạng thái"
                    //rules={[{ required: true, message: 'Chọn trạng thái!' }]}
                    >
                        {/* <Checkbox.Group options={options} onChange={onChange} /> */}
                        <Select style={{ width: 150 }}>
                            <Option value="1" >Hiện</Option>
                            <Option value="0" >Ẩn</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="mansx"
                        label="Nhà sản xuất"
                    //rules={[{ required: true, message: 'Chọn nhà sản xuất!' }]}
                    >
                        <Select>
                            {listProducer.map((item) => {
                                return (
                                    <>
                                        <Option value={item.mansx}>{item.tennsx}</Option>
                                    </>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="madm"
                        label="Danh mục"
                    //rules={[{ required: true, message: 'Chọn mã loại!' }]}
                    >
                        <Select onChange={onChange}>
                            {listCategory.map((item) => {
                                return (
                                    <>
                                        <Option value={item.madm}>{item.tendm}</Option>
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
                            {listTypes.map((item) => {
                                return (
                                    <>
                                        <Option value={item.maloai}>{item.tenloai}</Option>
                                    </>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Link to={'/tat-ca-san-pham'} >
                            <Button className="ant-btn ant-btn-dashed " htmlType="submit" style={{ marginLeft: -30 }}>
                                Trở về
                            </Button>
                        </Link>
                        {
                            link == "" ? (
                                <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }} disabled>Thêm sản phẩm</Button>
                            ) : (
                                <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>Thêm sản phẩm</Button>
                            )
                        }

                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddProduct;
