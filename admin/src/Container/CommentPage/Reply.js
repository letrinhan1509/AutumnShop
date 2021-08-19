import React, { useState, useEffect } from 'react';
import { Table, Image, Button, message, Tag } from 'antd';
import { useHistory, Link } from "react-router-dom";
import COMMENTS from 'API_Call/Api_comment/comment';
import "Container/scss/addpro.scss"
import moment from 'moment';

const Reply = (props) => {
  const token = localStorage.getItem("token");
  const history = useHistory();
  const detailComment = JSON.parse(localStorage.getItem('detailComment'));
  /* const [listComment, setListComment] = useState([]);
  useEffect(() => {
    COMMENTS.getAll().then((res) => {
      setListComment(res.data.listComments);

    })
  }, []); */


  return (
    <>
      <div className="product-wrapper">
        <h2 style={{ textAlign: 'center', marginTop: "20px", marginBottom: "20px" }}>DANH SÁCH TẤT CẢ BÌNH LUẬN</h2>
        {/* <a className="ant-btn ant-btn-primary" href='/Themsanpham'  type="primary">Thêm sản phẩm</a> */}
      </div>
    </>
  );
}

export default Reply;