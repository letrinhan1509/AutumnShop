import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Input, Button, Spin } from 'antd';
import Menus from "./Menus";
import { useHistory, Link } from "react-router-dom";
import "Container/scss/account.scss";
import admin from 'API_Call/Api_admin/admin';

const { TextArea } = Input;
const AccountInfo = (props) => {
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

    return (
        <div>
            <Row className="col-wrapper">
                <Col className="col-one">
                    <Menus url={url} />
                </Col>
                <Col className="col-two">
                    <Row className="account-box">
                        <Col className="form">
                            {loading === false ? (
                                <Row className="spin-wrapper">
                                    <Spin className="spin" size="large" />
                                </Row>
                            ) : (
                                <>
                                    <Row className="title-box">
                                        <h1 className="user-title">Thông tin tài khoản</h1>
                                        <Col className="img-box">
                                            <Image
                                                src={user.hinh}
                                            />
                                        </Col>
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
                                </>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    );
}

export default AccountInfo;
