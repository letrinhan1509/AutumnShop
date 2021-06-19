import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, message, Table, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";

const ListUserKH = (props) => {
  const [ListUser, setListUser] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/khach-hang/danh-sach").then((res) => {
      setListUser(res.data.data);
    })
  }, []);
  const unlock = (e) => {
    let id = e.currentTarget.dataset.id;
    let unLock = 1;
    console.log("Id:", id);
    let values = {
      "userId": id,
      "stt": unLock
    };
    const url = "http://127.0.0.1:5000/api/v1/khach-hang/cap-nhat-trang-thai"
    axios.put(url, values).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setTimeout(() => {
          //history.go('/danh-sach-khach-hang')
          history.go({ pathname: '/danh-sach-khach-hang' });
        }, 800)

      }
      else {
        message.error("Cập nhật trạng thái thất bại")
      }
    })
      .catch(err => {
        console.log(err.response);
        message.error(`Lỗi...! Mở khoá tài khoản thất bại!\n ${err.response.data}`)
      })

  }
  const lock = (e) => {
    let id = e.currentTarget.dataset.id;
    let shutdown = 0;
    console.log("Id:", id);
    let values = {
      "userId": id,
      "stt": shutdown
    };
    const url = "http://127.0.0.1:5000/api/v1/khach-hang/cap-nhat-trang-thai"
    axios.put(url, values).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setTimeout(() => {
          history.go('/danh-sach-khach-hang')
        }, 800)
      }
      else {
        message.error("Cập nhật trạng thái thất bại")
      }
    })
      .catch(err => {
        console.log(err.response);
        message.error(`Lỗi...! Khoá tài khoản thất bại!\n ${err.response.data}`)
      })
  };

  let result = JSON.parse(localStorage.getItem('user'));
  ListUser.forEach(element => {
    if (element.trangthai === 1) {
      element.trangthai = [];
      element.trangthai.stt = ["Hoạt động"];
      element.trangthai.id = element.makh;
    }
    if (element.trangthai === 0) {
      element.trangthai = [];
      element.trangthai.stt = ["Khoá"];
      element.trangthai.id = element.makh;
    }
  })
  //console.log(ListUser);

  /* let { sortedInfo, filteredInfo } = useState([]);
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {}; */
  const columns = [
    {
      title: 'Mã khách hàng',
      dataIndex: 'makh',
      key: 'makh',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'tenkh',
      key: 'tenkh',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'sodienthoai',
      key: 'sodienthoai',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diachi',
      key: 'diachi',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangthai',
      key: 'trangthai',
      render: (trangthai) => (
        <>
          {trangthai.stt.map(tragth => {
            let color = 'green';
            if (tragth === 'Khoá') {
              color = 'red';
            }
            return (
              <Tag color={color} key={tragth}>
                {tragth.toUpperCase()}
              </Tag>
            );
          })}

        </>
      )
    },

    result.permission === 'Admin' ? (
      {
        title: 'Hành động',
        dataIndex: 'trangthai',
        data: 'makh',
        key: 'trangthai',
        render: (trangthai) => //(<Button data-id={text} type="primary" icon={<LockOutlined />} /* onClick={linkto} */></Button>)
        (
          <>
            {trangthai.stt.map(tragth => {
              if (tragth === 'Khoá') {
                return (
                  <Button data-id={trangthai.id} type="primary" icon={<UnlockOutlined />} onClick={unlock}>
                  </Button>
                );
              } else {
                return (
                  <Button data-id={trangthai.id} type="danger" icon={<LockOutlined />} onClick={lock}>
                  </Button>
                )
              }
            })}
          </>
        )
      }) : (<> </>)

  ];

  return (
    <>
      <div className="product-wrapper">
        <h2 style={{ textAlign: 'center', marginTop: "50px" }}>DANH SÁCH TÀI KHOẢN KHÁCH HÀNG</h2>
        <Table className="proItem" dataSource={ListUser} columns={columns} pagination={{ pageSize: 7 }} size="middle" />
      </div>

      {/* <a className="ant-btn ant-btn-primary" href='/Themsanpham'  type="primary">Thêm sản phẩm</a> */}
    </>
  );
}

export default ListUserKH;