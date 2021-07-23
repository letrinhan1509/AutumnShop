import { Row, Col, Badge, Menu, Dropdown, Button } from 'antd';
import React, { useState, useEffect } from "react";
import { ShoppingCartOutlined, UserOutlined, UserAddOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
import "../components-css/Header.scss"
import SearchBar from "./SearchBar";
import catalog from 'API_Call/Api_catalog/catalog';

const menu = {
    fontSize: '25px',
    fontWeight: '500'
}
const { SubMenu } = Menu;
const HeaderPage = (props) => {

    const history = useHistory();
    const [current, setCurrent] = useState("home");
    const handClick1 = (e) => {
        setCurrent(e.key);
        if (e.key === '/') {
            history.push('/')
        }
        else {
            history.push(`/${e.key}`);
        }
    }
    const handClick2 = (e) => {
        setCurrent(e.key);
        if (e.key === '/') {
            history.push('/')
        }
        else {
            history.push(`/san-pham/${e.key}`);
        }
    }
    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        history.push('/dang-nhap');
        window.location.reload()
    }
    const User = JSON.parse(localStorage.getItem('user'));


    const drops = (
        <Menu>
            <Menu.Item key="don-hang">
                <Link to={'/don-hang'}>Đơn hàng</Link>
            </Menu.Item>
            <Menu.Item key="thong-tin-tai-khoan">
                <Link to={'/thong-tin-tai-khoan'}>Tài khoản</Link>
            </Menu.Item>
            <Menu.Item key="logout" onClick={logout} icon={<LogoutOutlined />}>
                <a target="_blank" rel="logout">
                    Log out
                </a>
            </Menu.Item>
        </Menu>
    );

    //API Danh mục - loại sản phẩm
    const [listCategory, setlistCategory] = useState([]);
    useEffect(() => {
        catalog.getAll().then((res) => {
            setlistCategory(res.data.listCategorys);
        })
    }, []);

    const [listTypes, setlistTypes] = useState([]);
    const onOpenChange = (e) => {
        let id = "";
        id = e[0];
        if (id === undefined) {
            console.log("not found");
        } else {
            catalog.getTypeDanhmucID(id).then((res) => {
                setlistTypes(res.data.data);
                console.log(res.data.data);
            })
        }
    };

    return (
        <>
            <Row className="menu1-wrapper">
                <Col className="menu1-box">
                    <Menu mode="horizontal"
                        className="menu1"
                        onClick={handClick1}
                        selectedKeys={[current]}>

                        <div className="logo-box">
                            <Link className="logo" to={'/'}>
                                <img width="50px" alt='logo' src="/images/icon/images.png" />
                                <p>autumn</p>
                            </Link>
                        </div>

                        <SearchBar ListProductHome={props.ListProductHome} receiveDataa={props.receiveData} />
                        <Menu.Item key="gio-hang">
                            <Badge size="small" count={props.CountCart}>
                                <div className="box-cart">
                                    <ShoppingCartOutlined style={{ fontSize: '26px' }}>
                                    </ShoppingCartOutlined>
                                </div>
                            </Badge>
                        </Menu.Item>
                        {/* <Menu.Item key="price">
                            {props.PriceCart}Đ
                        </Menu.Item> */}
                        <Menu.Item key="lien-he">
                            Liên hệ
                        </Menu.Item>

                        {JSON.parse(localStorage.getItem('user')) === null ? (
                            <>
                                <Menu.Item key="don-hang-khong-dang-nhap">
                                    Đơn hàng
                                </Menu.Item>
                                <Menu.Item key="dang-ky" style={menu} icon={<UserAddOutlined style={{ fontSize: 20 }} />}>
                                </Menu.Item>
                                <Menu.Item key="dang-nhap" style={menu} icon={<LoginOutlined style={{ fontSize: 20 }} />}>
                                </Menu.Item>
                            </>
                        ) : (
                            <>
                                <Dropdown overlay={drops} placement="bottomLeft">
                                    <Link to="/thong-tin-tai-khoan"><UserOutlined />{User.username}</Link>
                                </Dropdown>
                            </>
                        )}
                    </Menu>
                </Col>
            </Row>
            <Row className="menu2-wrapper">
                <Col className="menu2-box" >
                    <Menu mode="horizontal"
                        className="menu2"
                        onClick={handClick2}
                        selectedKeys={[current]}
                        onOpenChange={onOpenChange}
                    >

                        {/* <Menu.Item key="/" style={menu} >
                            Home
                        </Menu.Item>
                        <Menu.Item key="san-pham/ao" style={menu}>
                            Shirt
                        </Menu.Item>
                        <Menu.Item key="san-pham/balo" style={menu}>
                            Bag
                        </Menu.Item>
                        <Menu.Item key="san-pham/giay" style={menu}>
                            Shoes
                        </Menu.Item>
                        <Menu.Item key="san-pham/phu-kien" style={menu}>
                            Acessories
                        </Menu.Item> */}
                        {listCategory.map((item) => (
                            <SubMenu key={`${item.madm}`} title={item.tendm} onTitleClick={handClick2} subMenuOpenDelay={0.5} >
                                {listTypes.length === 1 ? ("") : (
                                    listTypes.map((type) => (
                                        <Menu.Item key={`${type.maloai}`}>{type.tenloai}</Menu.Item>
                                    ))
                                )}

                            </SubMenu>
                        ))}
                        <Menu.Item key="khuyen-mai" style={menu}>
                            Khuyến mãi
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </>
    );
};
export default HeaderPage;