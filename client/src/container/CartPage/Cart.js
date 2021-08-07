import { Col, Layout, Row, Button, Input, Spin, Modal } from "antd";
import React, { useState, useEffect } from 'react';
import "container/components-css/cart.scss"
import { CloseOutlined, RollbackOutlined, WarningOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import CART from 'API_Call/API_cart/cart';
import axios from "axios";


const { Content } = Layout;
const { confirm } = Modal;
const Cart = (props) => {
    const User = JSON.parse(localStorage.getItem('user'));
    const cart = localStorage.getItem('cart');
    const [cartView, setCartView] = useState([]);
    console.log(props.cart);
    const [loading, setLoading] = useState(false);
    useEffect(() => {       
       /*  if (User !== null) {
            let url = `http://127.0.0.1:5000/api/v1/gio-hang/khach-hang/${User.makh}`;
            axios.get(url).then((res) => {
                if (res.data.status === "Success") {
                    console.log(res.data.cart);
                    setCartView(res.data.cart);
                    setTimeout(() => {
                        if (res.data.cart.length !== 0) {
                            setLoading(true);
                        }
                    }, 1000);
                }
            });
        } else {
            
        } */
        setCartView(props.cart);
            console.log(props.cart);
            setTimeout(() => {
                if (props.cart.length !== 0) {
                    setLoading(true);
                }
            }, 1000);
    }, [])
    useEffect(() => {
        localStorage.setItem(...['cart', JSON.stringify(cartView)]);
    }, [cartView])
    // Đếm số lượng
    let sum = 0;
    props.cart.map((item) => (<>{sum = sum + item.soluong}</>))
    props.CountUsercart(cartView)
    //Thành tiền User
    const sumUser =  props.cart.reduce((a, c) => a + c.gia * c.soluong, 0);

    const addCart = (productItem) => {
        const exist = cartView.find((x) => x.masp === productItem.masp && x.mau === productItem.mau && x.size === productItem.size);
        if (exist) {
            setCartView(
                cartView.map((x) => x.masp === productItem.masp && x.mau === productItem.mau && x.size === productItem.size ? { ...exist, soluong: exist.soluong + 1 } : x)
            );
        } else {
            setCartView([...cartView, { ...productItem, soluong: 1 }]);
        }
    };
    const removeCart = (productItem) => {
        const exist = cartView.find((x) => x.masp === productItem.masp && x.mau === productItem.mau && x.size === productItem.size);
        if (exist.soluong === 1) {
            showDeleteCart(productItem);
        } else {
            setCartView(
                cartView.map((x) => x.masp === productItem.masp && x.mau === productItem.mau && x.size === productItem.size ? { ...exist, soluong: exist.soluong - 1 } : x)
            );
        }
    };
    function showDeleteCart(productItem) {
        confirm({
            title: 'Bạn muốn xóa sản phẩm khỏi giỏ hàng?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                setCartView(
                    cartView.filter((x) => x.masp !== productItem.masp || x.mau !== productItem.mau || x.size !== productItem.size)
                );
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (
        <Layout className="container">
            {cartView.length === 0 ? (
                <div className="cart-empty">
                    <div>
                        <p>Giỏ hàng của bạn chưa có sản phẩm nào !</p>
                        <div>
                            <Link to="/">
                                <Button type="primary" shape="round" size="large">
                                    Mua Hàng
                                </Button>
                            </Link>

                        </div>
                        <img src="https://chillydraji.files.wordpress.com/2015/08/empty_cart.jpeg" alt="empty" />
                    </div>
                </div>
            ) :
                (
                    <div className="cart-form">
                        <h1>Giỏ Hàng</h1>
                        <Row className="cart-wrapper">
                            {loading === false ? (
                                <Col className="spin-wrapper">
                                    <Spin className="spin" size="large" />
                                </Col>
                            ) : (
                                <>
                                    <Col className="col-one">
                                        {props.cart.map((item) => (
                                            <Row>
                                                <Col className="abc">
                                                    <Row className="product-name">
                                                        <Col>
                                                            <h3>{item.tensp}</h3>
                                                        </Col>
                                                        <Col>
                                                            <Button onClick={() => props.showDeleteCart(item)} type="primary" danger>
                                                                <CloseOutlined />
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    <Row className="product-detail">
                                                        <Col key={item.masp}>
                                                            <img src={item.hinh} alt="imgProduct" />
                                                        </Col>
                                                        <Col>
                                                            <ul>
                                                                <li>Màu: {item.mau}</li>
                                                                <li>Size: {item.size}</li>
                                                                <li>Giá: {item.gia}Đ</li>
                                                            </ul>
                                                        </Col>
                                                    </Row>
                                                    <Row className="product-quantity">
                                                        <Col>
                                                            <div className="quantity-box">
                                                                <button onClick={() => props.removeCart(item)} className="remove">-</button>
                                                                    <p>{item.soluong}</p>
                                                                <button onClick={() => props.addCart(item)} className="add">+</button>
                                                            </div>
                                                        </Col>
                                                        <Col><p>{item.soluong * item.gia.toFixed(2)}Đ</p></Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        ))}
                                        <Row className="product-count">
                                            <Col><p>{sum} Sản phẩm</p></Col>
                                            <Col className="price"><p>{sumUser.toFixed(2)}Đ</p></Col>
                                        </Row>
                                    </Col>
                                    <Col className="col-two">
                                        <Row className="product-count">
                                            <Col><p>{sum} Sản phẩm</p></Col>
                                            <Col className="price"><p>{sumUser.toFixed(2)}Đ</p></Col>
                                        </Row>
                                        <Row className="product-sum">
                                            <Col className="title"><p>Tổng đơn hàng</p></Col>
                                            <Col className="price"><p>{sumUser.toFixed(2)}Đ</p></Col>
                                        </Row>
                                        <Row className="product-warning">
                                            {/* <Input placeholder="Nhập mã khuyến mãi" />
                                    <Button type="primary">Áp dụng</Button> */}
                                            <p><WarningOutlined />Quý khách vui lòng kiểm tra thông tin sản phẩm thật kỹ trước khi <span>tiến hành thanh toán</span>.</p>
                                        </Row>
                                        <Row className="button-group">
                                            <Button className="pay" type="primary">
                                                <Link to="/nhap-thong-tin-giao-hang">Tiến hành thanh toán</Link>
                                            </Button>
                                            <Button className="continue">
                                                <Link to="/">Tiếp tục mua hàng <RollbackOutlined /></Link>
                                            </Button>
                                        </Row>
                                    </Col>
                                </>
                            )}
                        </Row>
                    </div>
                )
            }
        </Layout>
    );
}

export default Cart;



