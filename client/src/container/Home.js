import React, { useState, useEffect } from "react";
import { Row, Col, Carousel, Card, Tabs, Image } from 'antd';
import { Link, useHistory } from "react-router-dom";
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import "./components-css/Home.scss";
import cookies from "react-cookies";
import Sale from '../components/Sale';
import HomeBestseller from "../components/HomeBestseller";

//import ProductDetail from "./Product-detail";





const Home = (props) => {

    const history = useHistory();
    useEffect(() => {
        if (!cookies.load('jwt')) {
            history.push('/')
            //window.location.reload()
        }
    })

    const info_sale = {
        height: '300px',
        color: '#fff',
        textAlign: 'center',
    };

    useEffect(() => {
        localStorage.setItem(...['cart', JSON.stringify(props.cart)]);
    }, [props.cart]);

    return (
        <>
            <Carousel className="slider__bg" autoplay dots={false}>
                <div className="box-img">
                    <img src="../images/slider/slider5.jpg" alt="slider" />
                </div>
                <div className="box-img">
                    <img src="../images/slider/slider1.jpeg" alt="slider" />
                </div>
                <div className="box-img">
                    <img src="../images/slider/slider4.jpg" alt="slider" />
                </div>
            </Carousel>
            <Row>
                <Col span={22} offset={1}>
                    <Sale />
                </Col>
                <Col span={22} offset={1}>
                    <HomeBestseller ProductHomeS={props.ListProductHome} Thongbao_Them={props.Thongbao_Them} />
                </Col>
            </Row>
            <Row>
                <Col className="four">
                    <div className="box">
                        {/* <div className="h_light">
                            <p>THE WINTER</p>
                        </div> */}
                        <h1>THE WINTER</h1>

                        <p>COLLECTION</p>
                        <div className="button-wrapper"><button className="btn10">Xem</button></div>
                    </div>

                </Col>
            </Row>
        </>
    )
}
export default Home;

