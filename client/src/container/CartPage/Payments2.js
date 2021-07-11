import React, { useState, useEffect } from "react";
import { Row, Col, Button, Radio, Input, Space, Steps, message, Form, Layout, Select, Divider, Checkbox } from "antd";
import { DollarCircleOutlined, RollbackOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "container/components-css/payments2.scss"
import city from 'API_Call/Api_city/city';
import Paypal from "./Paypal";

const { Step } = Steps;
const { Option } = Select;
const Payments2 = (props) => {
  const history = useHistory();
  const order = JSON.parse(localStorage.getItem("order"));
  const voucher = JSON.parse(localStorage.getItem("voucher"));

  //let CITY = "";
  //let DISTRICT = "";
  //let WARD = "";
  const [CITY, setCITY] = useState("");
  const [DISTRICT, setDISTRICT] = useState("");
  const [WARD, setWARD] = useState("");
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

  const pay = (values) => {
    values['order'] = order;
    values['note'] = notes;
    values['pay'] = payValue;
    values['ship'] = ship;
    if (voucher !== null) {
      values['sumpay'] = ship + Number(props.PriceCart) - Number(voucher.giagiam);
      values['makm'] = voucher.makm;
    } else {
      values['sumpay'] = ship + Number(props.PriceCart);
    }

    console.log(values);
    const url = "http://localhost:5000/api/v1/don-hang/tao-don-hang";
    axios
      .post(url, values)
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
          message.error("Đạt hàng thất bại, vui lòng đăng nhập để đặt hàng !");
        }
      })
      .catch((err) => {
        message.error(
          `Đạt hàng thất bại, vui lòng đăng nhập để đặt hàng ! \n ${err}`
        );
      });
  };

  /* useEffect(() => {
    localStorage.setItem(...["cart", JSON.stringify(props.cart)]);
  }, [props.cart]); */

  const back = () => {
    localStorage.removeItem("order");
    localStorage.removeItem("voucher");
  }


  return (
    <>
      <Layout className="container">
        <div className="cart-form">
          <h1>Quy trình đặt hàng</h1>
          <Row className="step">
            <Steps size="small" current={1}>
              <Step title="Địa chỉ giao hàng" />
              <Step title="Xác nhận và thanh toán" />
              <Step title="Hoàn tất đơn hàng" />
            </Steps>
          </Row>
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
                  <Row><h3>Chọn hình thức thanh toán</h3></Row>
                  {/* <Row>
                    <Checkbox onChange={onChange} value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng<DollarCircleOutlined style={{ fontSize: '25px' }} /></Checkbox>
                  </Row>
                  <Row><Paypal /></Row> */}
                  <Row className="select-pay">
                    <Radio.Group onChange={selectPay} value={payValue}>
                      <Space direction="vertical">
                        <Radio value="Thanh toán khi nhận hàng"><img width="30" src="https://www.pngitem.com/pimgs/m/466-4661926_cash-payment-icon-money-icon-hd-png-download.png" />Thanh toán khi nhận hàng</Radio>
                        <Radio value="Thanh toán Paypal"><img width="30" src="https://cdn.iconscout.com/icon/free/png-256/paypal-1527455-1298285.png" />Thanh toán Paypal</Radio>
                        <Radio value="Thanh toán MOMO"><img width="30" src="https://developers.momo.vn/images/favicon/ms-icon-310x310.png" />Thanh toán MOMO</Radio>
                      </Space>
                    </Radio.Group>
                    {payValue === "Thanh toán Paypal" ? (
                      <Col><Paypal order={order} notes={notes} payValue={payValue} ship={ship} PriceCart={props.PriceCart} voucher={voucher}/></Col>
                    ) : ("")}
                  </Row>
                </div>
              </Col>
              <Col className="col-two">
                <Row>
                  <Col><h3>Tóm tắt đơn hàng</h3></Col>
                </Row>
                {order.cart.map(item => (
                  <Row className="product-count">
                    <Col className="title"><p>{item.qty}x {item.tensp}</p></Col>
                    <Col><p>{item.qty * item.gia}Đ</p></Col>
                  </Row>
                ))}
                <Row className="product-code">
                  <Col className="abc">
                    <Row className="sum-cart">
                      <Col className="title"><p>Tổng đơn hàng</p></Col>
                      <Col className="price"><p>{props.PriceCart}Đ</p></Col>
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
                  {voucher === null ? (<Col className="price"><p>{ship + Number(props.PriceCart)}Đ</p></Col>) : (
                    <Col className="price"><p>{ship + Number(props.PriceCart) - Number(voucher.giagiam)}Đ</p></Col>
                  )}

                </Row>
                <Row><textarea placeholder="Ghi chú" onChange={note} /></Row>
                <Row className="button-group">
                  {payValue === "Thanh toán Paypal" ? (
                    <Button className="pay" value="submit" type="primary" htmlType="submit" disabled>
                      Thanh toán
                    </Button>
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
        </div>
      </Layout>
    </>
  );
};

export default Payments2;
