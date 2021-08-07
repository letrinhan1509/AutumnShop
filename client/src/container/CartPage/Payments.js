import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, Steps, message, Form, Layout, Select, Divider, Spin } from "antd";
import { CloseOutlined, RollbackOutlined, LoadingOutlined, CheckCircleOutlined, FileDoneOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "container/components-css/payments.scss"
import city from 'API_Call/Api_city/city';
import voucher from 'API_Call/Api_discount/discount';

const { Step } = Steps;
const { Option } = Select;
const Payments = (props) => {
  const history = useHistory();
  const cart = JSON.parse(localStorage.getItem("cart"));
  const User = JSON.parse(localStorage.getItem("user"));
  let VOUCHER = JSON.parse(localStorage.getItem("voucher"));
  const [khuyenmai, setKhuyenmai] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartView, setCartView] = useState([]);

  console.log(cart);
  useEffect(() => {
    /* if (User !== null) {
      let url = `http://127.0.0.1:5000/api/v1/gio-hang/khach-hang/${User.makh}`;
      axios.get(url).then((res) => {
        if (res.data.status === "Success") {
          console.log(res.data.cart);
          setCartView(res.data.cart);
          setTimeout(() => {
            if (VOUCHER !== null) {
              localStorage.removeItem("voucher");
            }
            localStorage.removeItem("order");
            if (res.data.cart.length !== 0) {
              setLoading(true);
            }
          }, 1000);
        }
      });
    } else {
      
    } */
    setCartView(props.cart);
    setTimeout(() => {
      if (VOUCHER !== null) {
        localStorage.removeItem("voucher");
      }
      localStorage.removeItem("order");
      if (props.cart.length !== 0) {
        setLoading(true);
      }
    }, 1000);
  }, [])


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
  const [ship, setShip] = useState(0);
  const onChangeDistrict = (e) => {
    idDistrict = e;
    city.getDistrictWard(idDistrict).then((res) => {
      setlistWard(res.data.ward);
    })
    //lấy phí ship
    /* city.getShip(idDistrict).then((res) => {
      setShip(res.data.ship);
    }) */
  };
  

  const pay = (values) => {
    values['cart'] = cartView;
    values['ship'] = ship;
    if (khuyenmai.length !== 0) {
      values['sumpay'] = ship + Number(sumUser) - Number(khuyenmai.giagiam);
      values['makm'] = khuyenmai.makm;
    } else {
      values['sumpay'] = ship + Number(sumUser);
    }
    localStorage.setItem('order', JSON.stringify(values));
    console.log(values);
    setTimeout(() => {
      history.push('/xac-nhan-don-hang');
    }, 2000)
  };

  //let ma = "";
  //const [ma, setMa] = useState([]);
  var ma = "";
  const code = (e) => {
    ma = e.target.value;
    console.log(ma);
  };
  const useCode = () => {
    let id = ma;
    console.log(id);
    voucher.getVoucherID(id).then((res) => {
      if (res.data.status === "Success") {
        if (sumUser >= res.data.voucher.dieukien) {
          message.success("Áp dụng VOUCHER thành công !")
          localStorage.setItem('voucher', JSON.stringify(res.data.voucher));
          setKhuyenmai(JSON.parse(localStorage.getItem("voucher")));
        } else {
          message.error(`Áp dụng mã thất bại!\n Tổng đơn hàng phải lớn hơn hoặc bằng ${res.data.voucher.dieukien}Đ`);
        }

      }
    })
      .catch(err => {
        message.error(`Áp dụng mã thất bại!\n ${err.response.data.message}`);
      })
  };

  

  const deleteVoucher = () => {
    localStorage.removeItem("voucher");
    setKhuyenmai([]);
  };
  const sumUser = cartView.reduce((a, c) => a + c.gia * c.soluong, 0);

  return (
    <>
      <Layout className="container">
        <div className="cart-form">
          <h1>Quy trình đặt hàng</h1>
          <Row className="step">
            <Steps size="small" current={0}>
              <Step status="process" icon={<LoadingOutlined />} title="Địa chỉ giao hàng" />
              <Step title="Xác nhận và thanh toán" icon={<FileDoneOutlined />} />
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
                initialValues={User === null ? ("") : (
                  {
                    makh: `${User.makh}`,
                    tenkh: `${User.tenkh}`,
                    email: `${User.email}`,
                    sodienthoai: `${User.sodienthoai}`,
                  }
                )}
              >
                <Col className="col-one">
                  <div className="col-one-box">
                    <Divider orientation="left" plain><h3>Thông tin khách hàng</h3></Divider>
                    <Form.Item
                      name="makh"
                      label="Họ và tên"
                      hidden
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="tenkh"
                      label="Họ và tên"
                      //tooltip="Đây là tên đăng nhập của bạn."
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập họ và tên !!!",
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
                      <Input />
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
                  {cartView.map(item => (
                    <Row className="product-count">
                      <Col className="title"><p>{item.soluong}x {item.tensp}</p></Col>
                      <Col><p>{item.soluong * item.gia}Đ</p></Col>
                    </Row>
                  ))}
                  <Row className="product-code">
                    <Col className="abc">
                      <Row className="sum-cart">
                        <Col className="title"><p>Tổng đơn hàng</p></Col>
                        <Col className="price"><p>{sumUser}Đ</p></Col>
                      </Row>
                      {khuyenmai.length === 0 ? (
                        <>
                          <Input onChange={code} placeholder="Nhập mã khuyến mãi" />
                          <Button className="use-code" onClick={useCode} type="primary">Áp dụng</Button>
                        </>
                      ) : (
                        <>
                          <Input onChange={code} value={khuyenmai.voucher} placeholder="Nhập mã khuyến mãi" disabled />
                          <Button type="primary" disabled>Áp dụng</Button>
                        </>
                      )}

                      <Row className="ship">
                        <Col className="title"><p>Phí vận chuyển</p></Col>
                        <Col className="price"><p>{ship}Đ</p></Col>
                      </Row>
                      {khuyenmai.length === 0 ? ("") : (
                        <>
                          <h3>Áp dụng voucher</h3>
                          <Row className="voucher">
                            <Col className="title"><a onClick={deleteVoucher}><CloseOutlined /></a><p>{khuyenmai.voucher}</p></Col>
                            <Col className="price"><p>- {khuyenmai.giagiam}Đ</p></Col>
                          </Row>
                        </>
                      )}

                    </Col>
                  </Row>
                  <Row className="product-sum">
                    <Col className="title"><p>Tổng Thanh toán</p></Col>
                    {khuyenmai.length === 0 ? (
                      <Col className="price"><p>{ship + Number(sumUser)}Đ</p></Col>
                    ) : (
                      <Col className="price"><p>{ship + Number(sumUser) - Number(khuyenmai.giagiam)}Đ</p></Col>
                    )}
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
          )}
        </div>
      </Layout>
    </>
  );
};

export default Payments;
