import React, { useState, useEffect } from "react";
import { Row, Col, Card, Tabs, Image, Carousel } from 'antd';
import { Link, useHistory } from "react-router-dom";
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import "./components-css/HomeBestseller.scss";
import cookies from "react-cookies";


const { TabPane } = Tabs;



const { Meta } = Card;

const button = [
    { name: "all", value: "Tất cả" },
    { name: "asm", value: "Áo sơ mi" },
    { name: "ak", value: "Áo Khoác" },
    { name: "bl", value: "Balo" },
    { name: "giay", value: "Giày" }
]


const HomeBestseller = (props) => {
    const [ProductHome, setProductHome] = useState(props.ProductHomeS);
    useEffect(() => {
        setProductHome(props.ProductHomeS)
    }, [props.ProductHomeS])
    const handleClick = (e) => {
        setProductHome(props.ProductHomeS);
        let filterProduct = [];
        if (e === "all") {
            filterProduct = props.ProductHomeS;
        } else {
            filterProduct = props.ProductHomeS.filter(
                ProductHomeS => ProductHomeS.maloai === e
            )
        }
        setProductHome(filterProduct)
    };
    const [hiddenitem] = useState(4);
    //const history = useHistory();
    const history = useHistory();
    useEffect(() => {
        if (!cookies.load('jwt')) {
            history.push('/')
            //window.location.reload()
        }
    })




    useEffect(() => {
        localStorage.setItem(...['cart', JSON.stringify(props.cart)]);

    }, [props.cart]);


    return (
        <>
            <div className="menu_filter">
                <h3>Best Seller</h3>
                {/* <Tabs defaultActiveKey={'all'} onChange={handleClick} centered="true" >
                    {button.map(({ name, value }) => (
                        <TabPane
                            tab={value}
                            key={name}
                            name={name}>
                        </TabPane>
                    ))}
                </Tabs> */}
            </div>
            {/* <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel> */}
            <div className="site-card-wrapper product_home">
                
            </div>
        </>
    )
}
export default HomeBestseller;