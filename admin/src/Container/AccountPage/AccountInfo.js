import React, {useState} from 'react';
import { Row, Col, Image, Input, Button, message, Form, Menu } from 'antd';
import Menus from "./Menus";
import { useHistory, Link } from "react-router-dom";
import "Container/scss/account.scss";
import admin from 'API_Call/Api_admin/admin';

const { TextArea } = Input;
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
const AccountInfo = (props) => {
    const history = useHistory();

    var url = window.location.toString();
    url = url.replace("http://localhost:3000/", '');
    
    return (
        <div>
            <Row className="col-wrapper">
                <Col className="col-one">
                    <Menus url={url}/>
                </Col>
                <Col className="col-two">
                    <Row className="account-box">
                        <Col className="form">
                            <Row className="title-box">
                                <h1 className="user-title">Thông tin tài khoản</h1>
                                <Image
                                    width={150}
                                    src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/User_Img%2Fuser.png?alt=media&token=6ec247df-90ab-4cc9-b671-7261ef37215f"
                                />
                            </Row>
                            <Row className="box-inf">
                                <Col className="label-inf">Tên nhân viên: </Col>
                                <Col className="inf">{user.username}</Col>
                            </Row>
                            <Row className="box-inf">
                                <Col className="label-inf">Email: </Col>
                                <Col className="inf">{user.email}</Col>
                            </Row>
                            <Row className="box-inf">
                                <Col className="label-inf">Số điện thoại: </Col>
                                <Col className="inf">{user.phone}</Col>
                            </Row>
                            <Row className="box-inf">
                                <Col className="label-inf">Địa chỉ: </Col>
                                <Col className="inf">{user.address}</Col>
                            </Row> 
                            <Row className="box-inf">
                                <Col className="label-inf">Quyền hạn: </Col>
                                <Col className="inf">{user.permission}</Col>
                            </Row> 
                            <Button value="submit" type="primary">
                                <Link to="/tai-khoan/chinh-sua-tai-khoan">Chỉnh sửa</Link>
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    );
}

export default AccountInfo;
