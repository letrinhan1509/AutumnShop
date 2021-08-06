//import logo from './logo.svg';
import "./App.css";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import CART from 'API_Call/API_cart/cart';
import { Layout, Modal } from "antd";
import HeaderPage from "./components/include/HeaderPage";
import { Content } from "antd/lib/layout/layout";
import ProductDetail from "container/MainPage/Product-detail";
import Home from "container/MainPage/Home";
import Footer from "./components/include/Footer";
import Register from "container/UserPage/Register";
import Login from "container/UserPage/Login";
import Cart from "container/CartPage/Cart";
import Payments from "container/CartPage/Payments";
import Payments2 from "container/CartPage/Payments2";
import Payments3 from "container/CartPage/Payments3";
import Contact from "container/MainPage/Contact";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Shirt from "container/CatalogPage/Shirt";
import Type from "container/CatalogPage/Type";
import firebase from 'container/Config/firebase';
//import { storage } from "./container/firebase";
//import AllProduct from './container/All-Product';
import UserInfo from "container/UserPage/UserInfo";
import SearchResult from "container/MainPage/SearchResult";
import Error404 from "container/MainPage/Error404";
import Order from "container/MainPage/Order";
import OrderDetail from "container/MainPage/OrderDetail";
import Order_NotLogin from "container/MainPage/Order_NotLogin";
import ScrollToTop from "container/Config/ScrollToTop";
import product from "API_Call/Api_product/product";
import ForgotPass from "container/UserPage/forgotPass";
import EditUser from "container/UserPage/EditUser";
import ChangePass from "container/UserPage/ChangePass";
import SaleInf from "container/MainPage/SaleInf";




function App() {
  const User = JSON.parse(localStorage.getItem('user'));
  const [userEmail, setUserEmail] = useState([]);
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {

    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        //user logs out, handle somthing here
        console.log('user is not logged in!');
        return;
      }

      console.log('Logged in user: ', user);
      const token = await user.getIdToken;
      console.log('logged in user token: ', token);
      userEmail["name"] = user.displayName;
      userEmail["gmail"] = user.email;
      userEmail["uid"] = user.uid;
      userEmail["img"] = user.photoURL;

    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);




  //Lấy Data bằng API
  const [ListProductHome, setListProductHome] = useState([]);
  const { confirm } = Modal;
  useEffect(() => {
    product.getAll().then((res) => {
      setListProductHome(res.data.data);

    });
  }, []);

  console.log(ListProductHome);
  //Hàm random sản phẩm
  const shuffled = ListProductHome.sort(() => 0.5 - Math.random());
  const randomItem = shuffled.slice(0, 4);


  //callback child to parent
  const [kqSearch, setKqSearch] = useState([]);
  const receiveData = function (data) {
    setKqSearch(data);
  }
  const [count, setCount] = useState([]);
  const CountUsercart = function (data) {
    setCount(data);
  }
  let storageItem = (localStorage.getItem("cart") || "[]");
  console.log("storageItem", storageItem);
  const [cart, setCart] = useState(JSON.parse(storageItem));
  useEffect(() => {
    localStorage.setItem(...['cart', JSON.stringify(cart)]);
  }, [cart])
  console.log("cart", cart);
  function Thongbao_Them(productItem) {
    const exist = cart.find((x) => x.masp === productItem.masp && x.mau === productItem.mau && x.size === productItem.size);
    if (exist) {
      setCart(
        cart.map((x) => x.masp === productItem.masp && x.mau === productItem.mau && x.size === productItem.size ? { ...exist, soluong: exist.soluong + 1 } : x)
      );
      Modal.success({
        content: 'Bạn đã thêm 1 sản phẩm vào giỏ hàng !',
      });
    } else {
      setCart([...cart, { ...productItem, soluong: 1 }]);
      Modal.success({
        content: 'Bạn đã thêm 1 sản phẩm vào giỏ hàng !',
      });
    }
  }

  const addCart = (productItem) => {
    const exist = cart.find((x) => x.masp === productItem.masp && x.mau === productItem.mau && x.size === productItem.size);
    if (exist) {
      if (User !== null) {
        let value = {};
        value["magiohang"] = productItem.magiohang;
        value["phuongthuc"] = 1;
        console.log(value);
        /* CART.updateCart(value).then((res) => {
          if (res.data.status === "Success") {
            console.log(res.data);
            setCart(
              cart.map((x) => x.masp === productItem.masp && x.mau === productItem.mau && x.size === productItem.size ? { ...exist, soluong: exist.soluong + 1 } : x)
            );
          }
        }); */
      } else {
        setCart(
          cart.map((x) => x.masp === productItem.masp && x.mau === productItem.mau && x.size === productItem.size ? { ...exist, soluong: exist.soluong + 1 } : x)
        );
      }
    } else {
      setCart([...cart, { ...productItem, soluong: 1 }]);
    }
  };
  const removeCart = (productItem) => {
    const exist = cart.find((x) => x.masp === productItem.masp && x.mau === productItem.mau && x.size === productItem.size);
    if (exist.soluong === 1) {
      showDeleteCart(exist);
    } else {
      if (User !== null) {
        let value = [];
        value["magiohang"] = productItem.magiohang;
        value["phuongthuc"] = 0;
        console.log(value);
        /* CART.updateCart(value).then((res) => {
        if (res.data.status === "Success") {
          console.log(res.data);
          setCart(
            cart.map((x) => x.masp === productItem.masp && x.mau === productItem.mau && x.size === productItem.size ? { ...exist, soluong: exist.soluong - 1 } : x)
          );
        }
      }); */
      } else {
        setCart(
          cart.map((x) => x.masp === productItem.masp && x.mau === productItem.mau && x.size === productItem.size ? { ...exist, soluong: exist.soluong - 1 } : x)
        );
      }
    }
  };
  function showDeleteCart(productItem) {
    confirm({
      title: 'Bạn muốn xóa sản phẩm khỏi giỏ hàng?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        if (User !== null) {
          let value = [];
          value["magiohang"] = productItem.magiohang;
          value["phuongthuc"] = 0;
          console.log(value);
          /* CART.updateCart(value).then((res) => {
          if (res.data.status === "Success") {
            console.log(res.data);
            setCart(
              cart.filter((x) => x.masp !== productItem.masp || x.mau !== productItem.mau || x.size !== productItem.size)
            );
          }
        }); */
        } else {
          setCart(
            cart.filter((x) => x.masp !== productItem.masp || x.mau !== productItem.mau || x.size !== productItem.size)
          );
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  //Firebase get image
  const [link, setLink] = useState([]);

  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route path='/'>
            <Layout>
              <HeaderPage ListProductHome={ListProductHome} cart={cart} receiveData={receiveData} count={count} />
              <Content className="content-wrapper">
                <Route exact path="/">
                  <Home ListProductHome={ListProductHome} link={link} Thongbao_Them={Thongbao_Them} />
                </Route>
                <Route exact path="/san-pham/chi-tiet-san-pham/:id">
                  <ProductDetail
                    initRelatedItems={randomItem}
                    ListProductHome={ListProductHome}
                    link={link}
                    cart={cart}
                    Thongbao_Them={Thongbao_Them}
                    setCart={setCart}
                  />
                </Route>
                <Route path="/dang-ky">
                  <Register />
                </Route>
                <Route exact path="/dang-nhap">
                  <Login />
                </Route>
                <Route exact path="/san-pham/:id">
                  <Shirt link={link} Thongbao_Them={Thongbao_Them} />
                </Route>
                <Route exact path="/san-pham/theo-loai/:id">
                  <Type link={link} Thongbao_Them={Thongbao_Them} />
                </Route>
                <Route path="/Timkiem">
                  <SearchResult kqSearch={kqSearch} countkqSearch={kqSearch.length} Thongbao_Them={Thongbao_Them} />
                </Route>
                <Route exact path="/thong-tin-tai-khoan">
                  <UserInfo />
                </Route>
                <Route exact path="/thong-tin-tai-khoan/chinh-sua-thong-tin">
                  <EditUser />
                </Route>
                <Route exact path="/thong-tin-tai-khoan/doi-mat-khau">
                  <ChangePass />
                </Route>
                <Route exact path="/dang-nhap/quen-mat-khau">
                  <ForgotPass />
                </Route>
                <Route path="/gio-hang">
                  <Cart cart={cart} CountUsercart={CountUsercart} addCart={addCart} removeCart={removeCart} showDeleteCart={showDeleteCart} />
                </Route>
                <Route path="/nhap-thong-tin-giao-hang">
                  <Payments cart={cart} />
                </Route>
                <Route path="/xac-nhan-don-hang">
                  <Payments2 cart={cart} />
                </Route>
                <Route path="/hoan-tat-don-hang">
                  <Payments3 cart={cart} />
                </Route>
                <Route exact path="/don-hang">
                  <Order />
                </Route>
                <Route exact path="/don-hang/chi-tiet">
                  <OrderDetail />
                </Route>
                <Route exact path="/don-hang-khong-dang-nhap">
                  <Order_NotLogin />
                </Route>
                <Route path="/lien-he">
                  <Contact />
                </Route>
                <Route exact path="/khuyen-mai">
                  <SaleInf />
                </Route>
              </Content>
              <Footer />
            </Layout>
          </Route>
          <Route path='*'>
            <Error404 />
          </Route>
        </Switch>
      </ScrollToTop>
    </Router>

  );
}

export default App;
