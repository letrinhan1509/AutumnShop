import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Col, Row, Image } from "antd";
import Layout from "antd/lib/layout/layout";
import Content from 'antd/lib/layout/layout';
import Login from "./Container/Login";
import HeaderPage from "./Container/Header";
import Dashboard from "./Container/Dashboard";
import Navigation from "./Container/Navigation";
import Footer from "./Container/Footer";
import ListUserKH from "./Container/Components/listUserKH";
import ListUserAdmin from "./Container/Components/listUserAdmin";
import EditAdmin from "./Container/Components/editAdmin";
import AddNVien from "./Container/Components/addNVien";

import ProtectedRoute from "./Container/ProtectedRoute";
import Home from "./Container/Components/Client/home";

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
            <Row>
              <Col>
                <Navigation />
              </Col>
              <Col span={18} push={1} width={'100%'}>
                <Content className="content-wrapper">
                  <Route exact path="/dashboard">
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