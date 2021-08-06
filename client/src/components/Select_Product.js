import { Col, Layout, Row, Rate, Statistic, Select, Button, Card, Carousel, Tabs, Comment, List, Form, Input, Avatar, message, Radio, Modal } from "antd";
import moment from 'moment';
import { ShoppingCartOutlined, HeartOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import React, { createContext, useState, useEffect } from 'react';
import "../components/components-css/SelectProduct.scss";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import comment from 'API_Call/Api_comment/comment';
import PRODUCT from 'API_Call/Api_product/product';
import CART from 'API_Call/API_cart/cart';
import axios from "axios";
//import moment from 'moment';


const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;
export const DataContext = createContext()
const Select_Product = (props) => {
    const User = JSON.parse(localStorage.getItem('user'));
    const detail = JSON.parse(localStorage.getItem('detail'));
    const chitiet = JSON.parse(detail.chitiet);
    const { id } = useParams();
    const [sizeID, setSizeID] = useState("");
    const [colorID, setColorID] = useState("");
    const [hide, setHide] = useState(true);
    const [proTemp, setProTemp] = useState("");
    const [Proadd, setProadd] = useState({});
    function Changesize(value) {
        setSizeID(value);
        let a = chitiet.find((x) => x.masize === value);
        if (a === undefined) {
            setHide(false);
            setColorID("");
        } else {
            setHide(true);
        }
    }
    function Changecolor(value) {
        setColorID(value);
        let a = chitiet.find((x) => x.mamau === value && x.masize === sizeID);
        setProTemp(a);
        let add = {};
        add['gia'] = detail.gia;
        add['hinh'] = detail.hinh;
        add['masp'] = detail.masp;
        add['tensp'] = detail.tensp;
        add['size'] = sizeID;
        add['mau'] = value;
        //add['soluong'] = value;
        console.log(add);
        setProadd(add);
    }
    let visible = 4;
    const [ListComment, setListComment] = useState([]);


    useEffect(() => {
        PRODUCT.getid(id).then((res) => {
            if (res.data.status === "Success") {
                console.log(res.data.dataSpham);
            }
        })
        console.log(detail);
        let idBL = detail.masp;
        comment.getProductID(idBL).then((res) => {
            setListComment(res.data.listComment);
            console.log(res.data.listComment);
        })
    }, []);

    const [size] = useState('large');
    const { TabPane } = Tabs;

    let values = '';
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = (value) => {
        let date2 = new Date();
        value['ngay'] = moment(date2).format('YYYY-MM-DD');
        console.log(value);
        //setSubmitting(true);

        comment.addComment(value).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message);
                document.getElementById("cmt").reset();
                /* setTimeout(() => {
                    window.location.reload();
                }, 100);  */
            } else {
                message.error(res.data.message)
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`ERROR !\n ${err.response.data.message}`)
            })
    };

    const handleChange = (e) => {
        values = e.target.value;
    };

    const SIZE = [
        {
            key: "1",
            value: "S"
        },
        {
            key: "2",
            value: "M"
        },
        {
            key: "3",
            value: "L"
        },
        {
            key: "4",
            value: "XL"
        }
    ];
    const Editor = () => (
        <>
            <Form
                onFinish={handleSubmit}
                id="cmt"
                initialValues={{
                    makh: `${User.makh}`,
                    tenkh: `${User.username}`,
                    masp: `${detail.masp}`,
                }}
            >
                <Form.Item
                    name="makh"
                    hidden
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="tenkh"
                    hidden
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="masp"
                    hidden
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="content"
                >
                    <TextArea placeholder="Nhập đánh giá của bạn" rows={4} onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                    <Button  /*loading={submitting}*/ htmlType="submit" type="primary">
                        Add Comment
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
    const TabsProduct = () => {
        return (
            <Tabs defaultActiveKey="1" style={{ width: 900 }}>
                <TabPane tab="Product Infomation" key="1">
                    <p>{detail.mota}</p>
                </TabPane>
                <TabPane tab="Reviews" key="2">
                    <List
                        className="comment-list"
                        header={`${ListComment.length} replies`}
                        itemLayout="horizontal"
                        dataSource={ListComment}
                        renderItem={item => {
                            var date = new Date(item.ngaybl).toLocaleDateString();
                            return (
                                <>
                                    <li>
                                        <Comment
                                            actions={[<span key="comment-list-reply-to-0">Reply to</span>]}
                                            author={item.tenkh}
                                            avatar={item.hinh}
                                            content={item.noidung}
                                            datetime={item.giobl + "  " + date}
                                        />

                                    </li>
                                </>
                            );
                        }}
                    />
                    {User !== null ? (
                        <Comment
                            avatar={
                                <Avatar
                                    src={User.hinh}
                                    alt={User.username}
                                    width="40"
                                />
                            }
                            author={User.username}
                            content={
                                <Editor
                                    onChange={handleChange}
                                    onSubmit={handleSubmit}
                                    submitting={submitting}
                                    value={values}
                                />
                            }
                        />
                    ) : ("")}


                </TabPane>
                <TabPane tab="Another Tab" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        );
    };



    /* const [current, setCurrent] = useState(product[0].src[0].id);

    const handleTab = (imgfile, e) => {

        let currentId = e.target.name;
        console.log(current)
        setCurrent(`${current}`);
        console.log(current)
        let listPhoto = document.getElementsByClassName('hinh');
        for (let i = 0; i < listPhoto.length; i++) {
            if (currentId === current) {
                document.getElementById(current).classList.add('active');
            }
            else
                if (listPhoto[i].classList.contains('active')) {
                    listPhoto[i].classList.remove('active');
                }
        }

    }; */
    const [title, setTitle] = useState("Nam");
    const [check, setCheck] = useState("");
    const selectTitle = (e) => {
        setTitle(e.target.value);
    };

    const findSize = (values) => {
        values["gioitinh"] = title;
        console.log(values);
        PRODUCT.getChecksize(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message);
                setCheck(res.data.message);
                console.log(res.data);
            } else {
                message.error(res.data.message)
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`ERROR !\n ${err.response.data.message}`)
            })
    };

    const Usercart = () => {
        let add = {};
        add['makh'] = User.makh;
        add['masp'] = detail.masp;
        add['gia'] = detail.gia;
        add['hinh'] = detail.hinh;
        if (proTemp.giagiam !== 0) {
            add['giagiam'] = proTemp.giagiam;
        } else {
            add['giagiam'] = 0;
        }
        add['size'] = sizeID;
        add['mau'] = colorID;
        add['soluong'] = proTemp.soluong;
        console.log(add);
        let url = "http://127.0.0.1:5000/api/v1/gio-hang";
        axios.post(url, add).then((res) => {
            if (res.data.status === "Success") {
                //console.log(res.data.data);
                message.success(res.data.message);
                const exist = props.cart.find((x) => x.masp === add.masp && x.mau === add.mau && x.size === add.size);
                if (exist) {
                    props.setCart(
                        props.cart.map((x) => x.masp === add.masp && x.mau === add.mau && x.size === add.size ? { ...exist, soluong: exist.soluong + 1 } : x)
                    );
                } else {
                    props.setCart([...props.cart, { ...add, soluong: 1 }]);
                }
                //localStorage.setItem(...['cart', JSON.stringify(res.data.cart)]);
            }
        })
            .catch(err => {
                message.error(`Thêm sản phẩm vào giỏ hàng thất bại`);
                //message.error(`${err.response.data.message}`);
            })
    };



    return (
        <>
            <Row className="cover-one">
                <Col className="box-one">
                    <Row className="box-row-one">
                        <Col className="img-box">
                            <Row>
                                <Col>
                                    <img src={detail.hinh} alt="product" />
                                </Col>
                            </Row>
                            <Row className="img-change">
                                <Col className="hinh"><img name={detail.id} src={detail.hinh} alt="product" /*onClick={(e) => handleTab(e.file, e)}*/ /></Col>
                            </Row>
                        </Col>
                        <Col className="imfo-col">
                            <h1>{detail.tensp}</h1>
                            <ul className="vote-star">
                                <li><Rate /></li>
                                <li><Statistic title="reviews" value={0} /></li>
                                <li><a href="#/">Submit a review</a></li>
                            </ul>
                            <div className="sale-imfo">
                                <Row>
                                    <Col><p>Giá:</p></Col>
                                    <Col offset={7}><p>{detail.gia}VNĐ</p></Col>
                                </Row>
                                <Row>
                                    <Col><p>Giảm giá:</p></Col>
                                    <Col offset={5}><p>{detail.giamgia}% OFF</p></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Thương hiệu:</p>
                                        <p>Loại sản phẩm:</p>
                                    </Col>
                                    <Col offset={3}>
                                        <p>{detail.tennsx}</p>
                                        <p>{detail.tenloai}</p>
                                    </Col>
                                </Row>
                            </div>
                            <div className="size-color">
                                <Col className="size-color-wrapper">
                                    <Row className="one">
                                        <Col>
                                            <span>Chọn size:</span>
                                        </Col>
                                        <Col>
                                            <Select style={{ width: 120 }} onChange={Changesize}>
                                                {SIZE.map((item) => {
                                                    return (
                                                        <Option key={item.key} value={item.value}>{item.value}</Option>
                                                    );
                                                })}
                                            </Select>
                                        </Col>
                                    </Row>
                                    {hide ? (
                                        <>
                                            <Row className="two">
                                                <Col>
                                                    <span>Chọn màu</span>
                                                </Col>
                                                <Col>
                                                    <Select style={{ width: 120 }} onChange={Changecolor}>
                                                        {chitiet.map((item) => {
                                                            return (
                                                                item.masize === sizeID ? (<Option key={item.mamau} value={item.mamau}>{item.mamau}</Option>) : ("")
                                                            );
                                                        })}
                                                    </Select>
                                                </Col>
                                            </Row>
                                            {
                                                colorID !== "" ? (
                                                    <Row className="three">
                                                        <Col>
                                                            <span>Số lượng tồn kho: {proTemp.soluong}</span>
                                                        </Col>
                                                    </Row>
                                                ) : ("")
                                            }
                                        </>
                                    ) : (<p>Sản phẩm đang tạm hết hàng !</p>)}
                                    <Row className="fourr">
                                        <p>{check}</p>
                                    </Row>
                                </Col>
                                <Col className="check-size">
                                    <Form
                                        name="basic"
                                        initialValues={{ remember: true }}
                                        onFinish={findSize}
                                    >
                                        <Form.Item
                                            label="Chiều cao"
                                            name="chieucao"
                                            rules={[{ required: true, message: 'Vui lòng nhập chiều cao!' }]}
                                        >
                                            <Input style={{ width: 100 }} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Cân nặng"
                                            name="cannang"
                                            rules={[{ required: true, message: 'Vui lòng nhập cân nặng!' }]}
                                        >
                                            <Input style={{ width: 100 }} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Giới tính"
                                        >
                                            <Radio.Group onChange={selectTitle} value={title}>
                                                <Radio value="Nam">Nam</Radio>
                                                <Radio value="Nữ">Nữ</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item >
                                            <Button type="primary" htmlType="submit">Tìm size</Button>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </div>
                            <div className="add-cart">
                                <Row>
                                    <Col offset={13} span={4}>
                                        {sizeID !== "" && colorID !== "" ? (
                                            User === null ? (
                                                <Button onClick={() => props.Thongbao_Them(Proadd)} className="btn-add" type="primary" icon={<ShoppingCartOutlined />} size={size}>
                                                    Add To Cart
                                                </Button>
                                            ) : (
                                                <Button onClick={Usercart} htmlType="submit" className="btn-add" type="primary" icon={<ShoppingCartOutlined />} size={size}>
                                                    Add To Cart
                                                </Button>
                                            )
                                        ) : (<Button onClick={() => props.Thongbao_Them(Proadd)} className="btn-add" type="primary" icon={<ShoppingCartOutlined />} size={size} disabled>
                                            Add To Cart
                                        </Button>)}

                                    </Col>
                                    <Col offset={4} span={2}>
                                        <Button className="btn-add" type="primary" icon={<HeartOutlined />} size={size} />
                                    </Col>
                                </Row>
                            </div>
                            <div className="social-network">
                                <Row>
                                    <Col>
                                        <Button className="btn-facebook" type="primary" icon={<FacebookOutlined />} size={size}>
                                            Share on Facebook
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button className="btn-switter" type="primary" icon={<TwitterOutlined />} size={size}>
                                            Share on Twitter
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <Row className="box-row-two">
                        <Col className="comments">
                            <TabsProduct />
                        </Col>
                    </Row>
                </Col>


                <Col className="best-seller">
                    <Row>
                        <Col>
                            <h1>Best Seller</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="box">
                            <Carousel autoplay style={{ width: 300 }}>
                                {props.ListPro.slice(0, visible).map((item) => {
                                    return (
                                        <div>
                                            <Link to={`/san-pham/chi-tiet-san-pham/${item.masp}`}>
                                                <Card
                                                    className="card"
                                                    hoverable
                                                    style={{ width: 300 }}
                                                    cover={<img alt="example" src={item.hinh} />}
                                                >
                                                    <Row>
                                                        <Col offset={5}>
                                                            <Rate />
                                                            {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
                                                            <ul className="price">
                                                                <li className="new">$299,00</li>
                                                                <li className="old">$534,33</li>
                                                            </ul>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </Carousel>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Select_Product;