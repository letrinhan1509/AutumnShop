import React, { useState, useEffect } from 'react';
import { LockOutlined, UnlockOutlined} from '@ant-design/icons';
import { Button, Table, Tag, message } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const ListProductType = () => {
  const link = useHistory();
  const [a, setA] = useState([]);
  
  const [ListType, setListType] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/danh-muc/danh-sach-loai").then((res) => {
        setListType(res.data.data);
    })
  }, []);
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
    if(a != ""){
      let url = "http://127.0.0.1:5000/api/v1/danh-muc/loai-id/" + a
      axios.get(url).then((res) => {
        setType(res.data);
      });
    }
  }, [a]);
  localStorage.setItem('type', JSON.stringify(Type))
  let result = JSON.parse(localStorage.getItem('user'))

  const deleteType = (e) => {
    let id = e.currentTarget.dataset.id;
    console.log("Id:", id);
    let values = {
      "typeId": id
    };
    console.log(values);
    const url = "http://127.0.0.1:5000/api/v1/danh-muc/xoa-loai/"+id
    axios.delete(url).then((res) => {
        if (res.data.status === "Success") {
          message.success(res.data.message)
          setTimeout(() => {
            link.go({ pathname: '/danh-sach-admin' });
          }, 800) 
        }
        else {
            //message.error("Xoá loại thất bại!")
            message.error(res.data.message)
        }
    }) 
        .catch(err => {
            console.log(err.response);
            message.error(`Lỗi...! Xoá loại thất bại!\n ${err.response.data}`)
        })
  }
  

  /* ListAdmin.forEach(element => {
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
  }) */
  console.log(ListType);

  const columns = [
    {
      title: 'Mã loại',
      dataIndex: 'maloai',
      key: 'maloai',
    },
    {
      title: 'Tên loại',
      dataIndex: 'tenloai',
      key: 'admin',
    },
    {
      title: 'Mã danh mục',
      dataIndex: 'madm',
      key: 'madm',
    },
    /* result.permission === 'Admin' ?
      {
        title: 'Hành động',
        dataIndex: 'maloai',
        key: 'maloai',
        render: maloai => (<Button data-id={maloai} key={maloai} type="primary" onClick={linkto}>Sửa</Button>)
      } : (<> </>), */
    result.permission === 'Admin' ?
    {
        title: 'Hành động',
        dataIndex: 'maloai',
        key: 'maloai',
        render: maloai => (<Button data-id={maloai} key={maloai} type="danger" onClick={deleteType}> Xoá </Button>)
    } : (<> </>)
    
  ];


  return (
    <>
      <h2 style={{ textAlign: 'center', marginTop: "30px" }}>DANH SÁCH LOẠI SẢN PHẨM</h2>
      <Table dataSource={ListType} columns={columns} pagination={{ pageSize: 10 }} size="middle"
      />
      {/* <Link to={'/Themnhanvien'}><p className="ant-btn ant-btn-primary" type="primary">Thêm nhân viên</p></Link> */}

    </>
  );
}

export default ListProductType;