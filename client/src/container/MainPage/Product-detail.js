import { Col, Layout, Row, Image, Card } from "antd";
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import React from 'react';
import "container/components-css/ProductDetail.scss"
import "components/Select_Product"
import SelectProduct from "components/Select_Product";
import LinkPage from "components/Link_Page";
import { Link, useHistory } from "react-router-dom";
const { Content } = Layout;

const ProductDetail = (props) => {
    const history = useHistory();
    const handleClick = (productItem) => {
        setTimeout(() => {
            history.push(`/san-pham/chi-tiet-san-pham/${productItem.masp}`);
            localStorage.setItem('detail', JSON.stringify(productItem));
            window.location.reload();
        }, 500);
    };
    return (
        <Content className="detail-wrapper">
            <LinkPage />
            <Row>
                <Col style={{ width: '100%' }}>
                    <SelectProduct ListPro={props.ListProductHome} Thongbao_Them={props.Thongbao_Them} />
                </Col>
            </Row>
            <Row className="related">
                <Col>
                    <Row className="title-related">
                        <Col offset={9} span={8}>
                            <h1>Related Products</h1>
                        </Col>
                    </Row>
                    <div className="site-card-wrapper product_home">
                        <Row>
                            {props.initRelatedItems.map((Items) => {
                                return (
                                    <Col key={Items.masp} span={6}>

                                        <Card
                                            width={'100%'}
                                            key={Items.masp}
                                            className="card-pro card_product_home"
                                            bordered={false}
                                            hoverable
                                        >
                                            <div className="img-box">
                                                <Image
                                                    width={'100%'}
                                                    src={Items.hinh}
                                                    preview={{
                                                        visible: false,
                                                        /* onVisibleChange: () => { onClick() }, */
                                                        mask: <div className="icon_product">
                                                            <span onClick={() => props.Thongbao_Them(Items)}>
                                                                <ShoppingCartOutlined
                                                                    style={{ fontSize: '36px' }} />
                                                            </span>
                                                            <span>
                                                                <Link onClick={() => handleClick(Items)}>
                                                                    <EyeOutlined
                                                                        style={{ fontSize: '36px' }}
                                                                    />
                                                                </Link>
                                                            </span>
                                                        </div>
                                                    }}
                                                />
                                            </div>
                                            <Row className="product-price">
                                                <Col>{`${Items.gia} VNĐ`}</Col>
                                            </Row>
                                            <Row className="product-name">
                                                <Col>{Items.tensp}</Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </Col>
            </Row>

        </Content>
    );
}

export default ProductDetail;