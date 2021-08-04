import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Select, Upload, Image, Col, Row, Modal } from "antd";
import product from 'API_Call/Api_product/product';
import catalog from 'API_Call/Api_catalog/catalog';
import producer from 'API_Call/Api_producer/producer';
import { storage } from 'Container/Firebase/firebase';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";

const { Option } = Select;
const { confirm } = Modal;
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

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const EditProduct = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const ProductEdit = JSON.parse(localStorage.getItem("product"))
    const [ImgEdit, setImgEdit] = useState(ProductEdit.hinh);
    const [imageName, setImageName] = useState("");
    const [fileList, setFileList] = useState([]);
    const [link, setLink] = useState("");

    //Upload ảnh lên firebase
    const beforeUpload = file => {
        setFileList(fileList.concat(file));
        return false;
    }
    const handleChange = file => {
        if (file.fileList.length !== 0) {
            const upload = storage.ref(`Product_Img/${fileList[0].name}`).put(fileList[0]);
            upload.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("Product_Img")
                        .child(fileList[0].name)
                        .getDownloadURL()
                        .then(url => {
                            console.log("ulr:", url);
                            setLink(url);
                            setImgEdit(url);
                            setImageName(fileList[0]);
                            setFileList([]);
                        });
                    message.success("Tải ảnh thành công!");
                }
            );
        }
    };

    //Xóa ảnh trên firebase
    const onRemove = file => {
        const del = storage.ref(`Product_Img/${imageName.name}`);
        del.delete().then((res) => {
            setLink("");
            setImageName("");
            message.success("Đã xóa ảnh!");
        }).catch((error) => {
            console.log(error);
        });
    };

    //nút trở về
    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách sản phẩm?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                if (link !== "") {
                    localStorage.removeItem("product");
                    const del = storage.ref(`Product_Img/${imageName.name}`);
                    del.delete().then((res) => {
                        history.push('/tat-ca-san-pham');
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    localStorage.removeItem("product");
                    history.push('/tat-ca-san-pham');
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const update = (values) => {
        values['masp'] = ProductEdit.masp;
        if (imageName !== "") {
            values['imgName'] = imageName.name;
        } else {
            values['imgName'] = ProductEdit.tenhinh;
        }
        if (link !== "") {
            values['img'] = link;
        } else {
            values['img'] = ProductEdit.hinh;
        }
        console.log(values);
        product.updatePro(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                if (link !== "") {
                    const del = storage.ref(`Product_Img/${ProductEdit.tenhinh}`);
                    del.delete().then((res) => {
                        message.success("Đã xóa ảnh!");
                    }).catch((error) => {
                        console.log(error);
                    });
                }
                localStorage.removeItem("product");
                setTimeout(() => {
                    history.push('/tat-ca-san-pham');
                }, 2000)
            }
        })
            .catch(err => {
                message.error(`Sửa sản phẩm thất bại!\n ${err.response.data.message}`);
            })
    };


    //lấy data các trường NSX - Danh mục - Loại SP
    const [listProducer, setlistProducer] = useState([]);
    useEffect(() => {
        producer.getAll().then((res) => {
            setlistProducer(res.data.data)
        })
    }, []);

    const [listCategory, setlistCategory] = useState([]);
    useEffect(() => {
        catalog.getAll().then((res) => {
            setlistCategory(res.data.listCategorys);
        })
    }, []);

    const [listTypes, setlistTypes] = useState([]);
    useEffect(() => {
        catalog.getAllType().then((res) => {
            setlistTypes(res.data.data);
        })
    }, []);

    //xóa ảnh đã có để tải ảnh mới lên firebase
    const deleteImg = () => {
        setImgEdit("");
    }


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

    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>SỬA THÔNG TIN SẢN PHẨM</h2>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={update}
                initialValues={{
                    code: `${ProductEdit.code}`,
                    tensp: `${ProductEdit.tensp}`,
                    soluong: `${ProductEdit.soluong}`,
                    size: `${ProductEdit.size}`,
                    mau: `${ProductEdit.mau}`,
                    gia: `${ProductEdit.gia}`,
                    mota: `${ProductEdit.mota}`,
                    trangthai: `${ProductEdit.trangthai}`,
                    mansx: `${ProductEdit.mansx}`,
                    madm: `${ProductEdit.madm}`,
                    maloai: `${ProductEdit.maloai}`,
                }}
                scrollToFirstError
                className="register-form"
            >
                {/* <Form.Item
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
                </Form.Item> */}
                <Form.Item
                    name="tensp"
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
                <Form.Item
                    name="hinh"
                    label="Ảnh sản phẩm"
                    rules={[{ required: false }]}
                >
                    <Row>
                        <Col>
                            {link !== "" ? (
                                <Image src={link} width={120} />
                            ) : (ImgEdit === "" ? (<span>Chưa có ảnh sản phẩm !</span>) : (<Image src={ImgEdit} width={120} />))}

                        </Col>
                        <Col className="del-img">{link !== "" ? ("") : (ImgEdit === "" ? ("") : (<Button onClick={deleteImg} type="primary" danger><DeleteOutlined /></Button>))}</Col>
                    </Row>
                </Form.Item>
                <Form.Item
                    label="Tải ảnh mới"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    name=" "
                >
                    <Upload
                        listType="picture"
                        multiple='true'
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        onRemove={onRemove}
                        fileList
                    >
                        {link !== "" || ImgEdit !== "" ? (
                            <Button disabled icon={<UploadOutlined />} >Tải ảnh lên</Button>
                        ) : (<Button icon={<UploadOutlined />} >Tải ảnh lên</Button>)}
                    </Upload>
                </Form.Item>
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
                <Form.Item name="trangthai"
                    label="Trạng thái"
                //rules={[{ required: true, message: 'Chọn trạng thái!' }]}
                >

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
                    <Button className="ant-btn ant-btn-dashed" onClick={back} style={{ marginLeft: -30 }}>
                        Trở về
                    </Button>
                    {
                        link === "" && ImgEdit === "" ? (
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }} disabled>Xác nhận</Button>
                        ) : (
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>Xác nhận</Button>
                        )
                    }
                </Form.Item>
            </Form>
        </div>
    );
}
export default EditProduct;