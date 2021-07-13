import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Image, Input, Button, message, Form, Menu } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Menus from "./Menus";
import { useHistory, Link } from "react-router-dom";
import "container/components-css/Form.scss";
import users from 'API_Call/Api_user/user';

const { TextArea } = Input;
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
const ChangePass = (props) => {
    const history = useHistory();

    const update = (values) => {
        console.log(values)
        users.changePass(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/Thong-tin-tai-khoan');
                }, 2000)
            }
            else {
                message.error(res.data.message)
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`ERROR !\n ${err.response.data.message}`)
            })
    };

    var url = window.location.toString();
    url = url.replace("http://localhost:3000/", '');

    return (
        <Container>
            <Row className="col-wrapper">
                <Col className="col-one">
                    <Menus url={url} />
                </Col>
                <Col className="col-two">
                    <Row className="box">
                        <Form
                            name="update"
                            onFinish={update}
                            initialValues={{
                                email: `${user.email}`
                            }}
                            scrollToFirstError
                            className="form"
                        >
                            <h1 className="user-title">Thay đổi mật khẩu</h1>
                            <Form.Item
                                name="email"
                                id="email"
                                label="Email"
                            >
                                <Input placeholder="email" disabled />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                id="password"
                                label="Mật khẩu cũ"
                            >
                                <Input.Password placeholder="Nhập mật khẩu cũ" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                            </Form.Item>
                            <Form.Item
                                name="newPassword"
                                id="newPassword"
                                label="Mật khẩu mới"
                            >
                                <Input.Password placeholder="Nhập mật khẩu mới" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                id="confirmPassword"
                                label="Nhập lại mật khẩu mới"
                            >
                                <Input.Password placeholder="Nhập lại mật khẩu mới" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                            </Form.Item>
                            <Button value="submit" type="primary" htmlType="submit">Cập nhật</Button>
                        </Form>
                    </Row>
                </Col>
            </Row>


        </Container>

    );
}

export default ChangePass;