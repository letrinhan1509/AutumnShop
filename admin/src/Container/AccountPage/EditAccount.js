import React, { useState } from 'react';
import { Image, Input, Button, message, Form, Upload, Tooltip , Row, Col} from 'antd';
import { UploadOutlined, DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { storage } from 'Container/Firebase/firebase';
import Menus from "./Menus";
import { useHistory, Link } from "react-router-dom";
import "Container/scss/account.scss";
import admin from 'API_Call/Api_admin/admin';

const { TextArea } = Input;
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
const EditAccount = (props) => {
    const history = useHistory();

    var url = window.location.toString();
    url = url.replace("http://localhost:3000/", '');


    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const [image, setImage] = useState("");
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

    const update = (values) => {
        values['manv'] = user.manv;
        if (link !== "") {
            values['img'] = link;
        }
        console.log(values)
        admin.updateInfo(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/tai-khoan');
                }, 2000)
            }
            else {
                //message.error("Sửa thông tin thất bại")
                message.error(res.data.message)
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`${err.response.data.message}`)
            })
    };

    return (
        <div>
            <Row className="col-wrapper">
                <Col className="col-one">
                    <Menus url={url} />
                </Col>
                <Col className="col-two">
                    <Row className="account-box">
                        <Form
                            name="update"
                            onFinish={update}
                            initialValues={{
                                tennv: `${user.username}`,
                                email: `${user.email}`,
                                sdt: `${user.phone}`,
                                diachi: `${user.diachi}`,
                                permission: `${user.permission}`,
                            }}
                            scrollToFirstError
                            className="form"
                        >
                            <h1 className="user-title">Chỉnh sửa thông tin</h1>
                            {link !== "" ? (
                                <Image
                                    width={150}
                                    src={link}
                                />
                            ) : (
                                <Image
                                    width={150}
                                    src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2Fuser.png?alt=media&token=6ec247df-90ab-4cc9-b671-7261ef37215f"
                                />
                            )}
                            <Form.Item
                                name="hinh"
                                label="Ảnh nhân viên"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                className="load-img"
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

                            <Form.Item label="Downloat link ảnh" className="load-img" >

                                {
                                    link == "" ? (
                                        <Button icon={<DownloadOutlined />} onClick={upfirebase} >Downlink</Button>
                                    ) : (
                                        <Button icon={<DownloadOutlined />} onClick={upfirebase} disabled>Downlink</Button>
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                name="tennv"
                                id="tennv"
                                label="Tên nhân viên"
                            >
                                <Input placeholder="User name" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                id="email"
                                label="Email"
                            >
                                <Input placeholder="email" disabled/>
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                id="phone"
                                label="Số điện thoại"
                            >
                                <Input placeholder="Số điện thoại" />
                            </Form.Item>
                            <Form.Item
                                name="diachi"
                                id="diachi"
                                label="Địa chỉ"
                            >
                                <Input placeholder="Địa chỉ" />
                            </Form.Item>
                            <Form.Item
                                name="permission"
                                id="permission"
                                label="Quyền hạn"
                            >
                                <Input placeholder="Quyền hạn" disabled />
                            </Form.Item>
                            <Button value="submit" type="primary" htmlType="submit">Cập nhật</Button>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </div>

    );
}

export default EditAccount;
