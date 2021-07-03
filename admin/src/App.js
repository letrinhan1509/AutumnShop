import './App.css';
import "antd/dist/antd.css";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Col, Row } from "antd";
import Layout from "antd/lib/layout/layout";
import Content from 'antd/lib/layout/layout';
import Login from "./Container/UserPage/Login";
import HeaderPage from "./Container/Components/Header";
import Dashboard from "./Container/MainPage/Dashboard";
import Navigation from "./Container/Components/Navigation";
import Footer from "./Container/Components/Footer";
import ListUserKH from "./Container/UserPage/listUserKH";
import ListUserAdmin from "./Container/UserPage/listUserAdmin";
import EditAdmin from "./Container/UserPage/editAdmin";
import AddNVien from "./Container/UserPage/addNVien";
import AddProduct from "./Container/ProductPage/AddProduct";
import AllProduct from "./Container/ProductPage/AllProduct";
import AddProductType from "./Container/ProtypePage/AddProductType";
import AddProducer from "./Container/ProducerPage/AddProducer";
import AddCategory from "./Container/CatalogPage/AddCategory";
import AddSale from "./Container/AddVoucher";
import AddVoucher from "./Container/SalePage/AddVoucher";
import UserInf from "./Container/UserPage/UserInf";
import ListProductType from "./Container/ProtypePage/ListProductType";
import EditProductType from "./Container/ProtypePage/EditProductType";
import ListCatalog from "./Container/CatalogPage/listCatalog";
import ListProducer from "./Container/ProducerPage/listProducer";
import EditProducer from "./Container/ProducerPage/editProducer";
import EditCatalog from "./Container/CatalogPage/editCategory";
import ListComment from "./Container/listComment";
import EditProduct from "./Container/ProductPage/editProduct";
import ListOrder from "./Container/OrderPage/listOrder";
import OrderDetail from "./Container/OrderPage/OrderDetail";
import EditOrder from "./Container/OrderPage/editOrder";
import ListVoucher from "./Container/SalePage/listVoucher";
import EditVoucher from "./Container/SalePage/EditVoucher";

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
            <Row className="content-box" style={{minHeight: 750}}>
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
                  <Route exact path="/tat-ca-san-pham/sua-san-pham">
                    <EditProduct />
                  </Route>
                  <Route exact path="/danh-sach-loai">
                    <ListProductType />
                  </Route>
                  <Route exact path="/them-loai-san-pham">
                    <AddProductType />
                  </Route>
                  <Route exact path="/danh-sach-loai/sua-loai">
                    <EditProductType />
                  </Route>
                  <Route exact path="/them-nha-san-xuat">
                    <AddProducer />
                  </Route>
                  <Route exact path="/danh-sach-nha-sx">
                    <ListProducer />
                  </Route>
                  <Route exact path="/danh-sach-nha-sx/sua-nha-sx">
                    <EditProducer />
                  </Route>
                  <Route exact path="/them-danh-muc">
                    <AddCategory />
                  </Route>
                  <Route exact path="/danh-muc-san-pham">
                    <ListCatalog />
                  </Route>
                  <Route exact path="/danh-muc-san-pham/sua-danh-muc">
                    <EditCatalog />
                  </Route>
                  <Route exact path="/them-khuyen-mai">
                    <AddSale />
                  </Route>
                  <Route exact path="/them-voucher">
                    <AddVoucher />
                  </Route>
                  <Route exact path="/danh-sach-binh-luan">
                    <ListComment />
                  </Route>
                  <Route exact path="/thong-tin-tai-khoan">
                    <UserInf />
                  </Route>
                  <Route exact path="/danh-sach-don-hang">
                    <ListOrder />
                  </Route>
                  <Route exact path="/danh-sach-don-hang/sua-don-hang">
                    <EditOrder />
                  </Route>
                  <Route exact path="/danh-sach-don-hang/chi-tiet">
                    <OrderDetail />
                  </Route>
                  <Route exact path="/danh-sach-voucher">
                    <ListVoucher />
                  </Route>
                  <Route exact path="/danh-sach-voucher/sua-voucher">
                    <EditVoucher />
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