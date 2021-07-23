import { Col, Layout, Row, Rate, Statistic, Select, Button, Card, Carousel, Tabs, Comment, Tooltip, List, Form, Input, Avatar, message } from "antd";
import moment from 'moment';
import { ShoppingCartOutlined, HeartOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import React, { createContext, useState, useEffect } from 'react';
import "../components/components-css/SelectProduct.scss";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import comment from 'API_Call/Api_comment/comment';
import PRODUCT from 'API_Call/Api_product/product';
//import moment from 'moment';


const { Content } = Layout;
const { Option } = Select;
export const DataContext = createContext()
const Select_Product = (props) => {
    const User = JSON.parse(localStorage.getItem('user'));
    const detail = JSON.parse(localStorage.getItem('detail'));
    const history = useHistory();
    const { TextArea } = Input;
    const { id } = useParams();
    function Changecolor(value) {
        console.log(`selected ${value}`);
    }

    let visible = 4;
    const [listpro, setListpro] = useState([]);
    const [ListComment, setListComment] = useState([]);


    useEffect(() => {
        //const detail = JSON.parse(localStorage.getItem('detail'));
        console.log(detail);
        let idBL = detail.masp;
        comment.getProductID(idBL).then((res) => {
            setListComment(res.data.listComment);
            console.log(res.data.listComment);
        })
    }, []);

    const [size] = useState('large');
    const { TabPane } = Tabs;

    const data = [
        {
            actions: [<span key="comment-list-reply-to-0">Reply to</span>],
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
            ),
            datetime: (
                <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(1, 'days').fromNow()}</span>
                </Tooltip>
            ),
        }
    ];

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
        console.log(e.target.value);
        values = e.target.value;

    };

    const product = [
        {
            key: "1",
            name: "Product Name",
            color: [
                "red",
                "black",
                "white",
                "blue"
            ],
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
                                    <Col><p>Price:</p></Col>
                                    <Col offset={5}><p>{detail.gia} VNĐ</p></Col>
                                </Row>
                                <Row>
                                    <Col><p>Sale:</p></Col>
                                    <Col offset={6}><p>{detail.giamgia}% OFF</p></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Origin:</p>
                                        <p>Type:</p>
                                    </Col>
                                    <Col offset={5}>
                                        <p>{detail.tennsx}</p>
                                        <p>{detail.tenloai}</p>
                                    </Col>
                                </Row>
                            </div>
                            <div className="size-color">
                                <Row className="box-one">
                                    <Col>
                                        <span>Select Color</span>
                                    </Col>
                                    <Col>
                                        {
                                            product.map((items) => {
                                                return (
                                                    <div >
                                                        {items.color.map((item) => {
                                                            return (
                                                                <button className="select-color" style={{ background: item }}></button>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })
                                        }
                                    </Col>
                                </Row>
                                <Row className="box-two">
                                    <Col>
                                        <span>Size</span>
                                    </Col>
                                    <Col>
                                        <Select defaultValue="S" style={{ width: 120 }} onChange={Changecolor}>
                                            <Option value="S">S</Option>
                                            <Option value="M">M</Option>
                                            <Option value="L">L</Option>
                                            <Option value="XL">XL</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                            <div className="add-cart">
                                <Row>
                                    <Col offset={13} span={4}>
                                        <Button onClick={() => props.Thongbao_Them(detail)} className="btn-add" type="primary" icon={<ShoppingCartOutlined />} size={size}>
                                            Add To Cart
                                        </Button>
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