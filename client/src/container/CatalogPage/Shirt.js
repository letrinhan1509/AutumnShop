import React, { useState, useEffect } from "react";
import { Row, Col, Card, Image, Button, Carousel, Menu, Pagination } from "antd";
import { Link, useParams } from "react-router-dom";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import "container/components-css/ProductType.scss";
import PRODUCT from 'API_Call/Api_product/product';
import catalog from 'API_Call/Api_catalog/catalog';

const { Meta } = Card;
const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
const keyDM = (localStorage.getItem("keyDM"));
const keyType = (localStorage.getItem("keyType"));
const Shirt = (props) => {
  const [ListProduct, setListProduct] = useState([]);
  const [listTypes, setlistTypes] = useState([]);
  useEffect(() => {
    //Lấy sản phẩm theo danh mục
    if(keyDM !== null){
      PRODUCT.getDM(keyDM).then((res) => {
        if(res.data.status === "Success"){
          setListProduct(res.data.data);
        }
      });
    }
    //Lấy sản phẩm theo loại
    if(keyType !== null){
      PRODUCT.getLoai(keyType).then((res) => {
        if(res.data.status === "Success"){
          setListProduct(res.data.data);
        }
      });
    }
    let id = "DMA";
    catalog.getTypeDanhmucID(id).then((res) => {
            setlistTypes(res.data.data);
        })
  }, [])
  //const ak = props.ListProductHome.filter(ListProductHome => ListProductHome.tendm === "Áo");
  //let Ao = [];
  //Ao = ak;
  console.log(listTypes);


  const [visible, setVisible] = useState(6);
  const showMoreProduct = () => {
    setVisible((preValueProduct) => preValueProduct + 6);
  };
  const handleClick = (productItem) => {
        localStorage.setItem('detail', JSON.stringify(productItem));
    };

  const onChange = () => {
    /* if (visible > Ao.length) {
      document.getElementById("load").style.display = "none";
    } */
  }


  return (
    <>
        <Row className="content-box">
        <Col className="right">
          <Carousel dots="" autoplay className="carousel">
            <div>
              <img src="../images/slider/slider_aokhoac.png" alt="slider" />
            </div>
            <div>
              <img src="../images/slider/slider_aothun.jpg" alt="slider" />
            </div>
            <div>
              <img src="../images/slider/slider_somi.jpg" alt="slider" />
            </div>
          </Carousel>
          <div className="site-card-wrapper product_home">
            <Row>
                  {listTypes.map((item) => (
                    <Col>{item.tenloai}</Col>
                  ))}
            </Row>
            <Row  justify="space-around">
              {ListProduct.slice(0, visible).map((productItem) => {
                return (
                  <Col key={productItem.masp} style={{width: 350}}>
                    <Card
                      width={'100%'}
                      key={productItem.masp}
                      className="card-pro card_product_home"
                      bordered={false}
                      hoverable
                    >
                      <div className="img-box">
                        <Image
                          width={'100%'}
                          src={productItem.hinh}
                          preview={{
                            visible: false,
                            /* onVisibleChange: () => { onClick() }, */
                            mask: <div className="icon_product">
                              <span onClick={() => props.Thongbao_Them(productItem)}>
                                <ShoppingCartOutlined
                                  style={{ fontSize: '36px' }} />
                              </span>
                              <span>
                                <Link onClick={() => handleClick(productItem)} to={`/san-pham/chi-tiet-san-pham/${productItem.masp}`}>
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
                        <Col>{`${productItem.gia} VNĐ`}</Col>
                      </Row>
                      <Row className="product-name">
                        <Col>{productItem.tensp}</Col>
                      </Row>
                    </Card>
                  </Col>
                );
              })}
            </Row>
            {/* <Pagination defaultCurrent={1} total={50} /> */}
            {
              ListProduct.length > 6 ? (
                <Row className="btn-box">
                  <Col>
                    <Button
                      id="load"
                      type="primary"
                      onChange={onChange()}
                      onClick={showMoreProduct}
                      className="btn-load"
                    >
                      Xem thêm
                    </Button>
                  </Col>
                </Row>
              ) : ("")

            }
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Shirt;
