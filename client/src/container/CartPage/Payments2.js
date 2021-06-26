import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, Steps, message, Form, Layout, Select, Divider, Checkbox  } from "antd";
import { DollarCircleOutlined, RollbackOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "container/components-css/payments2.scss"
import city from 'API_Call/Api_city/city';

const { Step } = Steps;
const { Option } = Select;
const Payments2 = (props) => {
  const history = useHistory();
  const order = JSON.parse(localStorage.getItem("order"));


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

  const [cod, setisCod] = useState(true);
  const onChange = (e) => {
    setisCod(e.target.value);
    
  };
  console.log(cod);
  const pay = (values) => {
    values['order'] = order;
    values['pay'] = cod;
    console.log(values);
    /* const url = "http://localhost:3001/users/api/payment";
    axios
      .post(url, values)
      .then(async (res) => {
        if (res.data.status === "success") {
          console.log(values);
          message.success(`Xin chào, ${res.data.data.username}`);
          console.log(res.data.data.username);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          setTimeout(() => {
            history.push("/");
            window.location.reload();
          }, 2000);
        } else {
          message.error("Đạt hàng thất bại, vui lòng đăng nhập để đặt hàng !");
        }
      })
      .catch((err) => {
        message.error(
          `Đạt hàng thất bại, vui lòng đăng nhập để đặt hàng ! \n ${err}`
        );
      }); */
  };

  /* useEffect(() => {
    localStorage.setItem(...["cart", JSON.stringify(props.cart)]);
  }, [props.cart]); */

  let ship = 10000;



  const back = () => {
    localStorage.removeItem("order");
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
                  <Row><Checkbox onChange={onChange} value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng<DollarCircleOutlined style={{ fontSize: '25px' }}/></Checkbox></Row>
                </div>
              </Col>
              <Col className="col-two">
                <Row>
                  <Col><h3>Tóm tắt đơn hàng</h3></Col>
                </Row>
                {order.cart.map(item => (
                  <Row className="product-count">
                    <Col className="title"><p>{item.qty}x {item.tensp}</p></Col>
                    <Col><p>{item.qty * item.gia.toFixed(2)}Đ</p></Col>
                  </Row>
                ))}
                <Row className="product-code">
                  <Col className="abc">
                    <Row className="sum-cart">
                      <Col className="title"><p>Tổng đơn hàng</p></Col>
                      <Col className="price"><p>{props.PriceCart.toFixed(2)}Đ</p></Col>
                    </Row>
                    <Input placeholder="Nhập mã khuyến mãi" />
                    <Button type="primary">Áp dụng</Button>
                    <Row className="ship">
                      <Col className="title"><p>Phí vận chuyển</p></Col>
                      <Col className="price"><p>10000Đ</p></Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="product-sum">
                  <Col className="title"><p>Tổng Thanh toán</p></Col>
                  <Col className="price"><p>{ship + Number(props.PriceCart)}Đ</p></Col>
                </Row>
                <Row className="button-group">
                  <Button className="pay" value="submit" type="primary" htmlType="submit" >
                    {/* <Link to="/nhap-thong-tin-giao-hang">Tiếp tục</Link> */}Tiếp tục
                  </Button>
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
