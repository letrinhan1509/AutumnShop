import React, { useState, useEffect } from 'react';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Table, Tag, message } from 'antd';
import { useHistory,Link } from 'react-router-dom';
import axios from 'axios'
import "./scss/addpro.scss"


const ListProductType = () => {
  const link = useHistory();
  let result = JSON.parse(localStorage.getItem('user'));
  
  const [ListType, setListType] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/danh-muc/loai").then((res) => {
      setListType(res.data.data);
      console.log(ListType);
    })
  }, []);
  
  const [a, setA] = useState([]);
  const linkto = (e) => {
    let id = e.currentTarget.dataset.id
    setA(id);
    console.log(id);
    setTimeout(() => {
      link.push('/danh-sach-loai/sua-loai');
    }, 100)
  }
  const [Type, setType] = useState([]);
  useEffect(() => {
    if (a != "") {
      let url = "http://127.0.0.1:5000/api/v1/danh-muc/loai/" + a;
      axios.get(url).then((res) => {
        setType(res.data);
      });
    }
  }, [a]);
  if(Type != ''){
    localStorage.setItem('type', JSON.stringify(Type));
  }
  
  const deleteType = (e) => {
    let id = e.currentTarget.dataset.id;
    console.log("Id:", id);
    let values = {
      "typeId": id
    };
    console.log(values);
    const url = "http://127.0.0.1:5000/api/v1/danh-muc/xoa-loai/" + id
    axios.delete(url).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setTimeout(() => {
          link.go({ pathname: '/danh-sach-loai' });
        }, 800)
      }
      else {
        message.error(res.data.message)
      }
    })
      .catch(err => {
        console.log(err.response);
        message.error(`Lỗi...! Xoá loại thất bại!\n ${err.response.data}`)
      })
  }

  ListType.forEach(element => {
    if(element.trangthai === 1){
      element.trangthai = [];
      element.trangthai.stt = ["Hiện"];
      element.trangthai.id = element.maloai;
    }
    if(element.trangthai === 0 ){
      element.trangthai = [];
      element.trangthai.stt = ["Ẩn"];
      element.trangthai.id = element.maloai;
    }
  })

  const columns = [
    {
      title: 'Mã loại',
      dataIndex: 'maloai',
      key: 'maloai',
    },
    {
      title: 'Tên loại',
      dataIndex: 'tenloai',
      key: 'tenloai',
    },
    {
      title: 'Danh mục',
      dataIndex: 'madm',
      key: 'madm',
    },
    result.permission === 'Admin' ?
      {
        
        dataIndex: 'maloai',
        key: 'maloai',
        render: maloai => (<div className="btn-box"><Button data-id={maloai} key={maloai} onClick={linkto}> Sửa </Button></div>)
      } : (<> </>),
    result.permission === 'Admin' ?
      {
        
        dataIndex: 'maloai',
        key: 'maloai',
        render: maloai => (<div className="btn-box"><Button data-id={maloai} key={maloai} type="danger" onClick={deleteType}> Xoá </Button></div>)
      } : (<> </>)

  ];


  return (
    <>
      <div className="form-wrapper">
        <h2 style={{ textAlign: 'center', marginTop: "30px" }}>DANH SÁCH LOẠI SẢN PHẨM</h2>
        <Table className="item" dataSource={ListType} columns={columns} pagination={{ pageSize: 10 }} style={{padding: 10}} size="middle" />
        <div className="btn-wrapper">
          <Link to={'/them-loai-san-pham'}>
            <Button type="primary">
              Thêm loại sản phẩm
            </Button>
          </Link>
        </div>
      </div>
      {/* <Link to={'/Themnhanvien'}><p className="ant-btn ant-btn-primary" type="primary">Thêm nhân viên</p></Link> */}

    </>
  );
}

export default ListProductType;