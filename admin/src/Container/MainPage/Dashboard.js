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


const admin = JSON.parse(localStorage.getItem('user'));
console.log(admin);
const Dashboard = () => {

    const [ListProduct, setListProduct] = useState([]);
    useEffect(() => {
        product.getAll().then((res) => {
            setListProduct(res.data.data);
        });
    }, []);

    const [ListProducer, setListProducer] = useState([]);
    useEffect(() => {
        producer.getAll().then((res) => {
            setListProducer(res.data.data);
        });
    }, []);

    const [ListProType, setListProType] = useState([]);
    useEffect(() => {
        catalog.getAllType().then((res) => {
            setListProType(res.data.data);
        });
    }, []);

    const [ListCatalog, setListCatalog] = useState([]);
    useEffect(() => {
        catalog.getAll().then((res) => {
            setListCatalog(res.data.data);
        });
    }, []);

    const [ListAdmin, setListAdmin] = useState([]);
    useEffect(() => {
        admins.getAll().then((res) => {
            setListAdmin(res.data.data);
        });
    }, []);

    const [ListUser, setListUser] = useState([]);
    useEffect(() => {
        user.getAll().then((res) => {
            setListUser(res.data.data);
        });
    }, []);

    return (
        <>
            <div>
                <h2>Xin chào {admin.username}</h2>
            </div>
            <div className="wrapper">
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