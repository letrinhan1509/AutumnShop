import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, Steps, message, Form, Layout, Select, Divider } from "antd";
import { CloseOutlined, RollbackOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "container/components-css/payments.scss"
import city from 'API_Call/Api_city/city';

const { Step } = Steps;
const { Option } = Select;
const Payments = (props) => {
  const history = useHistory();
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [listCart, setListCart] = useState([]);
  const [order, setOrder] = useState([]);
  console.log(cart);
  useEffect(() => {
    if (cart !== "") {
      setListCart(cart);
    }
  }, [])
  console.log(listCart);


  //API Thành Phố
  const [listCity, setlistCity] = useState([]);
  useEffect(() => {
    city.getAll().then((res) => {
      setlistCity(res.data.city);
    })
  }, []);
  console.log(listCity);
  //API Quận - Huyện
  const [listDistrict, setlistDistrict] = useState([]);
  let idCity = "";
  const onChangeCity = (e) => {
    idCity = e;
    city.getCityDistrict(idCity).then((res) => {
      setlistDistrict(res.data.district);
    })
  };

  //API Phường - Xã
  const [listWard, setlistWard] = useState([]);
  let idDistrict = "";
  const onChangeDistrict = (e) => {
    idDistrict = e;
    city.getDistrictWard(idDistrict).then((res) => {
      setlistWard(res.data.ward);
    })
  };

  const pay = (values) => {
    values['cart'] = listCart;
    localStorage.setItem('order',  JSON.stringify(values));
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
      setTimeout(() => {
        history.push('/xac-nhan-don-hang');
      }, 2000)
  };

  /* useEffect(() => {
    localStorage.setItem(...["cart", JSON.stringify(props.cart)]);
  }, [props.cart]); */

  let ship = 20000;

  const [isCitizen, setisCitizen] = useState(true);
  const onChange = (e) => {
    setisCitizen(e.target.checked);
  };


  return (
    <>
      <Layout className="container">
        <div className="cart-form">
          <h1>Quy trình đặt hàng</h1>
          <Row className="step">
            <Steps size="small" current={0}>
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
                <div className="col-one-box">
                  <Divider orientation="left" plain><h3>Thông tin khách hàng</h3></Divider>
                  <Form.Item
                    name="tenkh"
                    label="Họ và tên"
                    //tooltip="Đây là tên đăng nhập của bạn."
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên tài khoảng !!!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="sodienthoai"
                    label="Điện thoại"
                    rules={[{
                      required: true,
                      message: 'Vui lòng nhập số điện thoại !'
                    }]}
                  >
                    <Input style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    id="email"
                    label="E-mail"
                    rules={[
                      {
                        type: "email",
                        message: "Vui lòng nhập đúng E-mail!",
                      },
                      {
                        required: true,
                        message: "Bạn chưa nhập E-mail !",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="city"
                    id="city"
                    label="Thành phố"
                  >
                    <Select onChange={onChangeCity}>
                      {listCity.map((item) => {
                        return (
                          <>
                            <Option value={item.ID}>{item.Title}</Option>
                          </>
                        )
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="district"
                    id="district"
                    label="Quận - Huyện"
                  >
                    <Select onChange={onChangeDistrict}>
                      {listDistrict.map((item) => {
                        return (
                          <>
                            <Option value={item.ID}>{item.Title}</Option>
                          </>
                        )
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="ward"
                    id="ward"
                    label="Phường - Xã"
                  >
                    <Select>
                      {listWard.map((item) => {
                        return (
                          <>
                            <Option value={item.ID}>{item.Title}</Option>
                          </>
                        )
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="address"
                    id="address"
                    label="Địa chỉ"
                    rules={[{
                      required: true,
                      message: 'Vui lòng nhập địa chỉ !'
                    }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>
              <Col className="col-two">
                <Row>
                  <Col><h3>Tóm tắt đơn hàng</h3></Col>
                </Row>
                {cart.map(item => (
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
                      <Col className="price"><p>20000Đ</p></Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="product-sum">
                  <Col className="title"><p>Tổng Thanh toán</p></Col>
                  <Col className="price"><p>{ship + Number(props.PriceCart)}Đ</p></Col>
                </Row>
                <Row className="button-group">
                  <Button className="pay" value="submit" type="primary" htmlType="submit" >Tiếp tục</Button>
                  <Button className="continue">
                    <Link to="/gio-hang">Quay lại<RollbackOutlined /></Link>
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

export default Payments;
