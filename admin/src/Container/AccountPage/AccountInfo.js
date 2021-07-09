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

    const update = (values) => {
        console.log(values)
        /* users.updateInfo(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/Thong-tin-tai-khoan');
                }, 2000)
            }
            else {
                //message.error("Sửa thông tin thất bại")
                message.error(res.data.message)
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Login fail!\n ${err.response.data}`)
            }) */
    };

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
                                    src="https://cdn0.iconfinder.com/data/icons/a-restaurant/500/SingleCartoonRestaurantAlice_1-512.png"
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
                                <Link to="/">Chỉnh sửa</Link>
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    );
}

export default AccountInfo;
