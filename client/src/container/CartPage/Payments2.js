import React, { useState, useEffect } from "react";
import { Row, Col, Button, Radio, Input, Space, Steps, message, Form, Layout, Select, Divider, Spin } from "antd";
import { RollbackOutlined, LoadingOutlined, CheckCircleOutlined, FormOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "container/components-css/payments2.scss"
import city from 'API_Call/Api_city/city';
import Oder from 'API_Call/Api_order/order';
import Paypal from "./Paypal";

const { Step } = Steps;
const { Option } = Select;
const Payments2 = (props) => {
  const history = useHistory();
  const order = JSON.parse(localStorage.getItem("order"));
  const voucher = JSON.parse(localStorage.getItem("voucher"));
  const [CITY, setCITY] = useState("");
  const [DISTRICT, setDISTRICT] = useState("");
  const [WARD, setWARD] = useState("");
  const [loading, setLoading] = useState(false);

  //API Thành Phố
  useEffect(() => {
    city.getCityID(order.city).then((res) => {
      setCITY(res.data.city.Title);
    })
    city.getDistrictID(order.district).then((res) => {
      setDISTRICT(res.data.district.Title);
    })
    city.getWardID(order.ward).then((res) => {
      setWARD(res.data.ward.Title);
    })
    setTimeout(() => {
      if (order !== null) {
        setLoading(true);
      }
    }, 1000);
  }, []);

  /* const [cod, setisCod] = useState(true);
  const onChange = (e) => {
    setisCod(e.target.value);
  }; */
  const [notes, setNotes] = useState("");
  const note = (e) => {
    setNotes(e.target.value);
  };
  const [ship, setShip] = useState(20000);

  const [payValue, setPayValue] = useState("Thanh toán khi nhận hàng");
  const selectPay = (e) => {
    setPayValue(e.target.value);
    console.log(payValue);
  };
  const [deliveryValue, setDeliveryValue] = useState("Hệ thống cửa hàng");
  const selectDelivery = (e) => {
    setDeliveryValue(e.target.value);
    console.log(deliveryValue);
  };

  const pay = (values) => {
    values['order'] = order;
    values['note'] = notes;
    values['pay'] = payValue;
    values['delivery'] = deliveryValue;

    console.log(values);
    //Oder.addOrder(values)
    //const url = "http://localhost:5000/api/v1/don-hang/";
    /* Oder
      .addOrder(values)
      .then(async (res) => {
        if (res.data.status === "Success") {
          console.log(values);
          message.success(res.data.message);
          localStorage.removeItem("cart");
          localStorage.removeItem("order");
          setTimeout(() => {
            history.push("/hoan-tat-don-hang");
            window.location.reload();
          }, 1000);
        } else {
          message.error("Đặt hàng thất bại !");
        }
      })
      .catch((err) => {
        message.error(
          `Đặt hàng thất bại ! \n ${err.response.data.message}`
        );
      }); */
  };

  const back = () => {
    localStorage.removeItem("order");
    localStorage.removeItem("voucher");
  }

  const [kq, setKq] = useState("");
  const receiveData = function (data) {
    setKq(data);
    console.log('bbbb', kq);
  }

  let pays = {};
  pays['order'] = order;
  pays['note'] = notes;
  pays['pay'] = payValue;
  pays['delivery'] = deliveryValue;
  const demo = pays;
  localStorage.setItem('payment', JSON.stringify(demo));

  
  return (
    <>
      <Layout className="container">
        <div className="cart-form">
          <h1>Quy trình đặt hàng</h1>
          <Row className="step">
            <Steps size="small" current={1}>
              <Step status="finish" icon={<FormOutlined />} title="Địa chỉ giao hàng" />
              <Step status="process" title="Xác nhận và thanh toán" icon={<LoadingOutlined />} />
              <Step title="Hoàn tất đơn hàng" icon={<CheckCircleOutlined />} />
            </Steps>
          </Row>
          {loading === false ? (
            <Row className="spin-wrapper">
              <Spin className="spin" size="large" />
            </Row>
          ) : (
            <Row className="cart-wrapper">
              <Form
                name="pay"
                onFinish={pay}
              >
                <Col className="col-one">
                  <div className="col-one-box1">
                    <Divider orientation="left" plain><h3>Thông tin khách hàng</h3></Divider>
                    <ul>
                      <li><span>Họ Tên: </span>{order.tenkh}</li>
                      <li><span>Điện thoại: </span>{order.sodienthoai}</li>
                      <li><span>E-mail: </span>{order.email}</li>
                      <li><span>Địa chỉ: </span>{order.address}</li>
                      <li><span>Phường/Xã: </span>{WARD}</li>
                      <li><span>Quận/Huyện: </span>{DISTRICT}</li>
                      <li><span>Tỉnh/Thành Phố: </span>{CITY}</li>
                    </ul>
                  </div>
                  <div className="col-one-box2">
                    <Col>
                      <Row><h3>Hình thức thanh toán</h3></Row>
                      <Row className="select-pay">
                        <Radio.Group onChange={selectPay} value={payValue}>
                          <Space direction="vertical">
                            <Radio value="Thanh toán khi nhận hàng"><img width="30" src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/icon-pay%2Fmoney.png?alt=media&token=b6ce9a3e-7c5a-4dc6-ae58-4bee355d6c60" />Thanh toán khi nhận hàng</Radio>
                            <Radio value="Thanh toán Paypal"><img width="30" src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/icon-pay%2Fpaypal.png?alt=media&token=d14f113b-b997-443d-8aca-ec03dd254371" />Thanh toán Paypal</Radio>
                            <Radio value="Thanh toán MOMO"><img width="30" src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/icon-pay%2Fmomo.png?alt=media&token=090c933f-a9f0-4944-a835-b2d0662e3d45" />Thanh toán MOMO</Radio>
                          </Space>
                        </Radio.Group>
                      </Row>
                    </Col>
                    <Col>
                      <Row><h3>Hệ thống vận chuyển</h3></Row>
                      <Row className="select-pay">
                        <Radio.Group onChange={selectDelivery} value={deliveryValue}>
                          <Space direction="vertical">
                            <Radio value="Hệ thống cửa hàng"><img width="30" src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/icon-pay%2FGHCH.png?alt=media&token=dbff4bfa-eb58-40f4-95dd-e7d5988a3dc5" />Hệ thống cửa hàng</Radio>
                            <Radio value="Giao hàng tiết kiệm"><img width="30" src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/icon-pay%2FGHTK.png?alt=media&token=ac61547a-5896-49b3-a0da-49cf94db70b6" />Giao hàng tiết kiệm</Radio>
                          </Space>
                        </Radio.Group>
                      </Row>
                    </Col>
                  </div>
                </Col>
                <Col className="col-two">
                  <Row>
                    <Col><h3>Tóm tắt đơn hàng</h3></Col>
                  </Row>
                  {order.cart.map(item => (
                    <Row className="product-count">
                      <Col className="title"><p>{item.soluong}x {item.tensp}</p></Col>
                      <Col><p>{item.soluong * item.gia}Đ</p></Col>
                    </Row>
                  ))}
                  <Row className="product-code">
                    <Col className="abc">
                      <Row className="sum-cart">
                        <Col className="title"><p>Tổng đơn hàng</p></Col>
                        <Col className="price"><p>{order.sumpay}Đ</p></Col>
                      </Row>
                      <Row className="ship">
                        <Col className="title"><p>Phí vận chuyển</p></Col>
                        <Col className="price"><p>{ship}Đ</p></Col>
                      </Row>
                      {voucher === null ? ("") : (
                        <>
                          <h3>Áp dụng voucher</h3>
                          <Row className="voucher">
                            <Col className="title"><p>{voucher.voucher}</p></Col>
                            <Col className="price"><p>- {voucher.giagiam}Đ</p></Col>
                          </Row>
                        </>
                      )}
                    </Col>
                  </Row>
                  <Row className="product-sum">
                    <Col className="title"><p>Tổng Thanh toán</p></Col>
                    <Col className="price"><p>{order.sumpay}Đ</p></Col>                    
                  </Row>
                  <Row><textarea placeholder="Ghi chú" onChange={note} /></Row>
                  <Row className="button-group">
                    {payValue === "Thanh toán Paypal" ? (
                      <>
                        <Col className="paypal"><Paypal/></Col>
                      </>
                    ) : (
                      <Button className="pay" value="submit" type="primary" htmlType="submit" >
                        Thanh toán
                      </Button>
                    )}

                    <Button className="continue" onClick={back} >
                      <Link to="/nhap-thong-tin-giao-hang">Quay lại<RollbackOutlined /></Link>
                    </Button>
                  </Row>
                </Col>
              </Form>
            </Row>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Payments2;
