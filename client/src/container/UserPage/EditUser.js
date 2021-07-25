import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Image, Input, Button, message, Form, Upload, Tooltip, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { storage } from 'container/Config/firebase';
import Menus from "./Menus";
import { useHistory, Link } from "react-router-dom";
import "container/components-css/Form.scss";
import users from 'API_Call/Api_user/user';

const { TextArea } = Input;
const EditUser = (props) => {
    const history = useHistory();

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setUser(JSON.parse(localStorage.getItem("user")));
            if (user !== null) {
                setLoading(true);
            }
        }, 1000);
    }, [])

    var url = window.location.toString();
    url = url.replace("http://localhost:3000/", '');


    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const [imageName, setImageName] = useState("");
    const [fileList, setFileList] = useState([]);
    const [link, setLink] = useState("");

    const beforeUpload = file => {
        setFileList(fileList.concat(file));
        return false;
    }
    const handleChange = file => {
        if (file.fileList.length !== 0) {
            const upload = storage.ref(`User_Img/${fileList[0].name}`).put(fileList[0]);
            upload.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("User_Img")
                        .child(fileList[0].name)
                        .getDownloadURL()
                        .then(url => {
                            console.log("ulr:", url);
                            setLink(url);
                            setImageName(fileList[0]);
                            setFileList([]);
                        });
                    message.success("Tải ảnh thành công!");
                }
            );
        }
    };
    const onRemove = file => {
        setLink("");
        const del = storage.ref(`User_Img/${imageName.name}`);
        setImageName("");
        del.delete().then((res) => {
            message.success("Đã xóa ảnh!");
        }).catch((error) => {
            console.log(error);
        });
    };
    
    const upfirebase = () => {
        
    };
    const update = (values) => {
        if(imageName !== ""){
            values['imgName'] = imageName.name;
        }else{
            //values['imgName'] = user.imgName;
        }
        if(link !== ""){
            values['hinh'] = link;
        }else{
            values['hinh'] = user.hinh;
        }
        console.log(values)
        /* users.updateInfo(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                localStorage.removeItem("user");
                localStorage.setItem('user', JSON.stringify(res.data.data));
                setTimeout(() => {
                    history.push('/Thong-tin-tai-khoan');
                    window.location.reload();
                }, 2000)
            }
            else {
                message.error(res.data.message)
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`ERROR !\n ${err.response.data.message}`)
            }) */
    };

    return (
        <Container>
            <Row className="col-wrapper">
                <Col className="col-one">
                    <Menus url={url} />
                </Col>
                <Col className="col-two">
                    <Row className="box">
                        <Col className="form">
                            {loading === false ? (
                                <Row className="spin-wrapper">
                                    <Spin className="spin" size="large" />
                                </Row>
                            ) : (
                                <Form
                                    name="update"
                                    onFinish={update}
                                    initialValues={{
                                        username: `${user.username}`,
                                        matkhau: `${user.matkhau}`,
                                        email: `${user.email}`,
                                        sdt: `${user.sdt}`,
                                        diachi: `${user.diachi}`,
                                    }}
                                    scrollToFirstError

                                >
                                    <h1 className="user-title">Chỉnh sửa thông tin</h1>
                                    {link !== "" ? (
                                        <Col className="img-box">
                                            <Image
                                                src={link}
                                            />
                                        </Col>

                                    ) : (
                                        <Col className="img-box">
                                            <Image
                                                src={user.hinh}
                                            />
                                        </Col>
                                    )}
                                    <Form.Item
                                        name="hinh"
                                        label="Ảnh sản phẩm"
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
                                            onRemove={onRemove}
                                            fileList
                                        >
                                            <Button icon={<UploadOutlined />} >Tải ảnh lên</Button>
                                        </Upload>
                                    </Form.Item>
                                    <Form.Item
                                        name="username"
                                        id="username"
                                        label="Tên khách hàng"
                                    >
                                        <Input placeholder="User name" />
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        id="email"
                                        label="Email"
                                    >
                                        <Input placeholder="email" disabled />
                                    </Form.Item>
                                    <Form.Item
                                        name="sdt"
                                        id="sdt"
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
                                    <Button value="submit" type="primary" htmlType="submit">Cập nhật</Button>
                                </Form>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>


        </Container>

    );
}

export default EditUser;
