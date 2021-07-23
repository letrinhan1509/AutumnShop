import { Col, Layout, Row, Button, Input, Spin } from "antd";
import React, { useState, useEffect } from 'react';
import "container/components-css/cart.scss"
import { CloseOutlined, RollbackOutlined, WarningOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";


const { Content } = Layout;
const Cart = (props) => {

    useEffect(() => {
        localStorage.setItem(...['cart', JSON.stringify(props.cart)]);
    }, [props.cart])
    
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            
            if (props.cart.length !== 0) {
                setLoading(true);
            }
        }, 1000);
    }, [])
    const [size, setSize] = useState('large');

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    let sum = 0;
    props.cart.map((item) => (<>{sum = sum + item.qty}</>))
    return (
        <Layout className="container">
            {props.cart.length === 0 ? (
                <div className="cart-empty">
                    <div>
                        <p>Giỏ hàng của bạn chưa có sản phẩm nào !</p>
                        <div>
                            <Link to="/">
                                <Button type="primary" shape="round" size={size}>
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
                                                            <Button onClick={() => props.showDeleteProduct(item)} type="primary" danger>
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
                                                                <p>{item.qty}</p>
                                                                <button onClick={() => props.addCart(item)} className="add">+</button>
                                                            </div>
                                                        </Col>
                                                        <Col><p>{item.qty * item.gia.toFixed(2)}Đ</p></Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        ))}
                                        <Row className="product-count">
                                            <Col><p>{sum} Sản phẩm</p></Col>
                                            <Col><p>{props.PriceCart.toFixed(2)}Đ</p></Col>
                                        </Row>
                                    </Col>
                                    <Col className="col-two">
                                        <Row className="product-count">
                                            <Col><p>{sum} Sản phẩm</p></Col>
                                            <Col><p>{props.PriceCart.toFixed(2)}Đ</p></Col>
                                        </Row>
                                        <Row className="product-sum">
                                            <Col className="title"><p>Tổng đơn hàng</p></Col>
                                            <Col className="price"><p>{props.PriceCart.toFixed(2)}Đ</p></Col>
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



