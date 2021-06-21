import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Image, Input, Button } from 'antd';
import Meta from "antd/lib/card/Meta";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "container/components-css/Form.scss";
const { TextArea } = Input;

const user = JSON.parse(localStorage.getItem("user"));
const UserInfo = (props) => {

    return (
        <Container>
            <Row>
                <Col className="user-warrper">
                    <Form className="form">
                        <Meta id='register-title' className="user-title" title="Thông tin tài khoản" />
                        <Image
                            width={150}
                            src="https://cdn0.iconfinder.com/data/icons/a-restaurant/500/SingleCartoonRestaurantAlice_1-512.png"
                        />
                        <Form.Group>
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control type="file" name="profileImage" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tên</Form.Label>
                            <Input placeholder="User name" value={user.username}/>
                        </Form.Group>
                        

                        <Form.Group>
                            <Form.Label>Mật khẩu</Form.Label>
                            <Input.Password
                            placeholder="Password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            value={user.matkhau}
                        />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Input placeholder="E-mail" value={user.email} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Điện thoại</Form.Label>
                            <Input value={user.sdt} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Địa chỉ</Form.Label>
                            <TextArea value={user.diachi} />
                        </Form.Group>
                        <Button type="primary">Update Profile</Button>
                    </Form>
                </Col>

            </Row>

        </Container>

    );
}

export default UserInfo;
