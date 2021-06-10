import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Col, Row } from "antd";
import Layout from "antd/lib/layout/layout";
import Content from 'antd/lib/layout/layout';
import Login from "./Container/Login";
import HeaderPage from "./Container/Components/Header";
import Dashboard from "./Container/Dashboard";
import Navigation from "./Container/Components/Navigation";
import Footer from "./Container/Components/Footer";
import ListUserKH from "./Container/listUserKH";
import ListUserAdmin from "./Container/listUserAdmin";
import EditAdmin from "./Container/editAdmin";
import AddNVien from "./Container/addNVien";
import AddProduct from "./Container/AddProduct";
import AllProduct from "./Container/AllProduct";
import AddProductType from "./Container/AddProductType";
import AddProducer from "./Container/AddProducer";
import AddCategory from "./Container/AddCategory";
import AddVoucher from "./Container/AddVoucher";
import AddSale from "./Container/AddSale";
import UserInf from "./Container/UserInf";
import ProtectedRoute from "./Container/ProtectedRoute";




function App() {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem('user') !== null
        ? <Dashboard />
        : <Login />
      /* ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} /> */
    )} />
  )
  const [isAuth, setIsAuth] = useState(true);
  //localStorage.getItem('user') === null ? setIsAuth(false) : setIsAuth(true)
  const admin = localStorage.getItem('user'); 
  return (
    <>
      {localStorage.getItem('user') === null ? ( 
        <Layout>
          <Content className="content-wrapper">
            <Router>
              <Login />
            </Router>
          </Content>
        </Layout>
      ): (
        <Router exact path="/admin">
          <Layout>
            <HeaderPage />
            <Row className="content-box">
              <Col>
                <Navigation />
              </Col>
              <Col span={18} push={1} width={'100%'}>
                <Content className="content-wrapper">
                  <Route exact path="/">
                    <Dashboard />
                  </Route>
                  <Route exact path="/danh-sach-khach-hang">
                    <ListUserKH />
                  </Route>
                  <Route exact path="/danh-sach-admin">
                    <ListUserAdmin />
                  </Route>
                  <Route exact path="/them-nhan-vien">
                    <AddNVien />
                  </Route>
                  <Route exact path="/danh-sach-admin/sua-thong-tin-tai-khoan">
                    <EditAdmin />
                  </Route>
                  <Route exact path="/them-san-pham">
                    <AddProduct />
                  </Route>
                  <Route exact path="/tat-ca-san-pham">
                    <AllProduct />
                  </Route>
                  <Route exact path="/them-loai-san-pham">
                    <AddProductType />
                  </Route>
                  <Route exact path="/them-nha-san-xuat">
                    <AddProducer />
                  </Route>
                  <Route exact path="/them-danh-muc">
                    <AddCategory />
                  </Route>
                  <Route exact path="/them-voucher">
                    <AddVoucher />
                  </Route>
                  <Route exact path="/them-khuyen-mai">
                    <AddSale />
                  </Route>
                  <Route exact path="/thong-tin-tai-khoan">
                    <UserInf />
                  </Route>
                </Content>
              </Col>
            </Row>
            <Footer />
          </Layout>
        </Router>
      )}
    </>
  );
}



export default App;