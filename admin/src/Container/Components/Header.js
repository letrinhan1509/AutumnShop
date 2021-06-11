import { Row, Col, Menu,Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import React from "react";
/* import {  LoginOutlined } from '@ant-design/icons'; */
import { BrowserRouter as Router} from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../Components/scss/Header.scss"
import { Layout } from 'antd';
//import { getAdminId } from '../../../api/models/model_admin';
const { Header} = Layout;

const HeaderPage = () => {
    let history = useHistory();
    let link = useHistory();
    const linkto = (e) => {
        link.push((`/${e.key}`));
    }
    const logout = ()=>{
        //localStorage.removeItem("token")
        localStorage.removeItem("user")
        history.push('/');
        window.location.reload();
    }
const admin = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Header className="header">
                <Row>
                    <Router>
                        <Col className="logo">
                            <p>Autumn</p>
                        </Col>
                        <Col span={20} offset={1}>
                            <Menu  mode="horizontal">
                                    <Menu.Item onClick={linkto} key="thong-tin-tai-khoan">
                                        <Avatar>N</Avatar> &nbsp;
                                        {admin.username}
                                    </Menu.Item>
                                    <Menu.Item onClick={logout} key="item" icon={<LogoutOutlined />}>
                                        Đăng xuất
                                </Menu.Item>
                            </Menu>
                        </Col>

                    </Router>
                </Row>
            </Header>
        </>
    );
};
export default HeaderPage;