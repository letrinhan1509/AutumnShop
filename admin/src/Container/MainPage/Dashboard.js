import React, { useEffect, useState } from 'react';
import product from 'API_Call/Api_product/product';
import catalog from 'API_Call/Api_catalog/catalog';
import producer from 'API_Call/Api_producer/producer';
import admins from 'API_Call/Api_admin/admin';
import user from 'API_Call/Api_user/user';
import { Row, Col } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
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
    }, []);
    console.log(ListCatalog);

    return (
        <>
            <div className="char">
                <div>
                    <Bar
                        data={{
                            labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
                            datasets: [
                                {
                                    label: 'Tổng đơn hàng',
                                    data: [12, 19, 3, 5, 2, 3, 7],
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
                            labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
                            datasets: [
                                {
                                    label: 'Doanh thu bán hàng',
                                    data: [3, 8, 3, 5, 18, 20, 30],
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
                                    borderWidth: 2
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
            </div>
            <div className="data-wrapper">
                <h1>Thống kê dữ liệu</h1>
                <Row className="box1">
                    <Link to={'/danh-sach-admin'}><Col className="ADMIN">ADMIN: {ListAdmin.length}</Col></Link>
                    <Link to={'/danh-sach-khach-hang'}><Col className="USER">USER: {ListUser.length}</Col></Link>
                    <Link to={'/tat-ca-san-pham'}><Col className="PRODUCT">PRODUCT: {ListProduct.length}</Col></Link>
                    <Link to={'/danh-sach-loai'}><Col className="PRODUCTTYPE">PRODUCTTYPE: {ListProType.length}</Col></Link>
                </Row>
                <Row className="box2">
                    <Link to={'/danh-sach-nha-sx'}><Col className="PRODUCER">PRODUCER: {ListProducer.length}</Col></Link>
                    <Link to={'/danh-muc-san-pham'}><Col className="CATALOG">CATAKIG: {ListCatalog.length}</Col></Link>
                    <Link to={'/danh-muc-san-pham'}><Col className="CATALOG2">CATAKIG: {ListCatalog.length}</Col></Link>
                    <Link to={'/danh-muc-san-pham'}><Col className="CATALOG3">CATAKIG: {ListCatalog.length}</Col></Link>
                </Row>
            </div>
        </>
    );
}

export default Dashboard;