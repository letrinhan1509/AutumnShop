import React, { useEffect, useState } from 'react';
import product from 'API_Call/Api_product/product';
import catalog from 'API_Call/Api_catalog/catalog';
import producer from 'API_Call/Api_producer/producer';
import admins from 'API_Call/Api_admin/admin';
import user from 'API_Call/Api_user/user';
import order from 'API_Call/Api_order/order';
import { Row, Col, Image } from 'antd';
import "Container/scss/dashboard.scss";
import { Link } from 'react-router-dom';
import { Line, Bar } from 'react-chartjs-2';

const admin = JSON.parse(localStorage.getItem('user'));
console.log(admin);
const Dashboard = () => {

    const [ListProduct, setListProduct] = useState([]);
    const [ListProducer, setListProducer] = useState([]);
    const [ListProType, setListProType] = useState([]);
    const [ListCatalog, setListCatalog] = useState([]);
    const [ListAdmin, setListAdmin] = useState([]);
    const [ListUser, setListUser] = useState([]);
    const [statistical, setStatistical] = useState([]);
    useEffect(() => {
        product.getAll().then((res) => {
            setListProduct(res.data.data);
        });
        producer.getAll().then((res) => {
            setListProducer(res.data.data);
        });
        catalog.getAllType().then((res) => {
            setListProType(res.data.data);
        });
        catalog.getAll().then((res) => {
            setListCatalog(res.data.listCategorys);
        });
        admins.getAll().then((res) => {
            setListAdmin(res.data.data);
        });
        user.getAll().then((res) => {
            setListUser(res.data.data);
        });
        order.statistical().then((res) => {
            setStatistical(res.data.statistical);
        });
    }, []);
    const [date, setDate] = useState([]);

    return (
        <>
            <div className="char">
                <div>
                    <Bar
                        data={{
                            labels: statistical.map((item) => {
                                var date = new Date(item.ngaydat);
                                return (
                                    date.toLocaleDateString()
                                );
                            }),
                            datasets: [
                                {
                                    label: 'Tổng đơn hàng',
                                    data: statistical.map((item) => {
                                        return (
                                            item.tongdonhang
                                        );
                                    }),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }
                            ]
                        }}
                        height={300}
                        width={500}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>
                <div>
                    <Bar
                        data={{
                            labels: statistical.map((item) => {
                                var date = new Date(item.ngaydat);
                                return (
                                    date.toLocaleDateString()
                                );
                            }),
                            datasets: [
                                {
                                    label: 'Doanh thu bán hàng',
                                    data: statistical.map((item) => {
                                        return (
                                            item.tongdoanhthu
                                        );
                                    }),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1,
                                }
                            ]
                        }}
                        height={300}
                        width={500}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    labelString: 'Ngày',
                                    display: true,
                                    scaleLabel: {

                                    }
                                }
                                ,
                                y: {
                                    beginAtZero: true,
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <div className="data-wrapper">
                <h1>Thống kê dữ liệu</h1>
                <Row className="box1">
                    <Link to={'/danh-sach-admin'}>
                        <div className="img-box">
                            <Image
                                className="sale_img"
                                src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Dashbroad%2FAdmin.jpg?alt=media&token=3ba6f182-2191-4c7a-b763-b15d676fef69"
                                preview={{
                                    visible: false,
                                    /* onVisibleChange: () => { onClick() }, */
                                    mask: <div className="link_product">

                                        <span>
                                            ADMIN: {ListAdmin.length}
                                        </span>
                                    </div>
                                }}
                            />
                        </div>
                    </Link>
                    <Link to={'/danh-sach-khach-hang'}>
                        <div className="img-box">
                            <Image
                                className="sale_img"
                                src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Voucher_img%2Fng%C4%83%CC%81m%20tr%C6%A1%CC%80i.jpg?alt=media&token=ebc41b47-37e0-4843-9555-a0d790644281"
                                preview={{
                                    visible: false,
                                    /* onVisibleChange: () => { onClick() }, */
                                    mask: <div className="link_product">

                                        <span>
                                            USER: {ListUser.length}
                                        </span>
                                    </div>
                                }}
                            />
                        </div>
                    </Link>
                    <Link to={'/tat-ca-san-pham'}>
                        <div className="img-box">
                            <Image
                                className="sale_img"
                                src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Voucher_img%2Fng%C4%83%CC%81m%20tr%C6%A1%CC%80i.jpg?alt=media&token=ebc41b47-37e0-4843-9555-a0d790644281"
                                preview={{
                                    visible: false,
                                    /* onVisibleChange: () => { onClick() }, */
                                    mask: <div className="link_product">

                                        <span>
                                            PRODUCT: {ListProduct.length}
                                        </span>
                                    </div>
                                }}
                            />
                        </div>
                    </Link>
                    <Link to={'/danh-sach-loai'}>
                        <div className="img-box">
                            <Image
                                className="sale_img"
                                src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Voucher_img%2Fng%C4%83%CC%81m%20tr%C6%A1%CC%80i.jpg?alt=media&token=ebc41b47-37e0-4843-9555-a0d790644281"
                                preview={{
                                    visible: false,
                                    /* onVisibleChange: () => { onClick() }, */
                                    mask: <div className="link_product">

                                        <span>
                                            PRODUCTTYPE: {ListProType.length}
                                        </span>
                                    </div>
                                }}
                            />
                        </div>
                    </Link>
                </Row>
            </div>
        </>
    );
}

export default Dashboard;