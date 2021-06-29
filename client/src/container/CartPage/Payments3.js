import React, { useState } from "react";
import { Button, Layout } from "antd";
import { Link } from "react-router-dom";
import "container/components-css/payments3.scss"


const Payments3 = (props) => {
  const [size, setSize] = useState('large');
  return (
    <>
      <Layout className="container">
        <div className="cart-empty">
          <div>
            <p>Đặt hàng thành công, Autumn chân thành cảm ơn !</p>
            <div>
              <Link to="/">
                <Button type="primary" shape="round" size={size}>
                  Tiếp tục mua hàng
                </Button>
              </Link>
            </div>
            <img src="https://jerichochambers.com/wp-content/uploads/2016/06/paper-shopping-bags-white-background-51453600-1.jpg" alt="empty" />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Payments3;
