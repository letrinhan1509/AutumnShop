import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, message, Table, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "Container/scss/addpro.scss";

const ListUserAdmin = () => {
  const link = useHistory();
  const [a, setA] = useState([]);
  const [ListAdmin, setListAdmin] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/admin/danh-sach").then((res) => {
      setListAdmin(res.data.data);
    })
  }, []);
  const linkto = (e) => {
    let id = e.currentTarget.dataset.id
    setA(id);
    console.log(id);
    setTimeout(() => {
      link.push('/danh-sach-admin/sua-thong-tin-tai-khoan');
    }, 100)
  }
  const [Admin, setAdmin] = useState([]);
  useEffect(() => {
    if(a != ""){
      let url = "http://127.0.0.1:5000/api/v1/admin/admin-id/" + a
      axios.get(url).then((res) => {
        setAdmin(res.data);
      });
    }
  }, [a]);
  if(Admin != ''){
    localStorage.setItem('admin', JSON.stringify(Admin))
  }
  let result = JSON.parse(localStorage.getItem('user'));

  const unlock = (e) => {
    let id = e.currentTarget.dataset.id;
    let unLock = 1;
    console.log("Id:", id);
    let values = {
      "adminId": id,
      "stt": unLock
    };
    const url = "http://127.0.0.1:5000/api/v1/admin/cap-nhat-trang-thai"
    axios.put(url, values).then((res) => {
        if (res.data.status === "Success") {
          message.success(res.data.message)
          setTimeout(() => {
            link.go({ pathname: '/danh-sach-admin' });
          }, 800) 
        }
        else {
            message.error("Mở khoá tài khoản thất bại")
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
      "adminId": id,
      "stt": shutdown
    };
    const url = "http://127.0.0.1:5000/api/v1/admin/cap-nhat-trang-thai"
    axios.put(url, values).then((res) => {
        if (res.data.status === "Success") {
            message.success(res.data.message)
            setTimeout(() => {
              link.go('/danh-sach-admin')
            }, 800)
        }
        else {
            message.error("Khoá tài khoản thất bại!")
        }
    }) 
        .catch(err => {
            console.log(err.response);
            message.error(`Lỗi...! Khoá tài khoản thất bại! \n ${err.response.data}`)
        })
  };

  ListAdmin.forEach(element => {
    if(element.trangthai === 1){
      element.trangthai = [];
      element.trangthai.stt = ["Hoạt động"];
      element.trangthai.id = element.manv;
    }
    if(element.trangthai === 0 ){
      element.trangthai = [];
      element.trangthai.stt = ["Khoá"];
      element.trangthai.id = element.manv;
    }
  })

  const columns = [
    {
      title: 'Mã nhân viên',
      dataIndex: 'manv',
      key: 'manv',
    },
    {
      title: 'Gmail',
      dataIndex: 'admin',
      key: 'admin',
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'tennv',
      key: 'tennv',
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
      title: 'Chức vụ',
      dataIndex: 'quyen',
      key: 'quyen',
      
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
    result.permission === 'Admin' ?
      {
        title: '',
        dataIndex: 'trangthai',
        key: 'trangthai',
        render: (trangthai) =>
          (
            <>
              {trangthai.stt.map(tragth => {
                if (tragth === 'Khoá') {
                  return (
                    <Button data-id={trangthai.id} type="primary" icon={<UnlockOutlined />} onClick={unlock}>
                    </Button>
                  );
                }else{
                  return (
                    <Button data-id={trangthai.id} type="danger" icon={<LockOutlined />} onClick={lock}>
                    </Button>
                  )
                }  
              })}
            </>
          )
      } : (<> </>),
      result.permission === 'Admin' ?
      {
        title: 'Hành động',
        dataIndex: 'manv',
        key: 'manv',
        render: manv => (<Button data-id={manv} key={manv} type="primary" onClick={linkto}>Sửa</Button>)
      } : (<> </>)
    
  ];





  return (
    <>
      <div className="product-wrapper" >
        <h2 style={{ textAlign: 'center', marginTop: "20px", marginBottom: "20px" }}>DANH SÁCH TÀI KHOẢN NHÂN VIÊN</h2>
        <Table className="proItem" dataSource={ListAdmin} columns={columns} pagination={{ pageSize: 6 }} size="middle"/>
        <div className="btn-wrapper" >
          <Link to={'/them-nhan-vien'}>
            <Button type="primary">
              Thêm tài khoản nhân viên
            </Button>
          </Link>
        </div>
        {/* <Link to={'/Themnhanvien'}><p className="ant-btn ant-btn-primary" type="primary">Thêm nhân viên</p></Link> */}
      </div>
    </>
  );
}

export default ListUserAdmin;