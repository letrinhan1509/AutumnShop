import { Button, message, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "Container/scss/addpro.scss";

const ListProducer = () => {
  const link = useHistory();
  const [a, setA] = useState([]);

  const [listProducer, setListProducer] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/nha-sx").then((res) => {
      setListProducer(res.data.data);
    })
  }, []);

  const edit = (e) => {
    let id = e.currentTarget.dataset.id
    setA(id);
    console.log(id);
    setTimeout(() => {
      link.push('/danh-sach-nha-sx/sua-nha-sx');
    }, 100)
  }
  const [producer, setProducer] = useState([]);
  useEffect(() => {
    if (a != "") {
      let url = "http://127.0.0.1:5000/api/v1/nha-sx/" + a;
      axios.get(url).then((res) => {
        setProducer(res.data);
      });
    }
  }, [a]);
  if(producer != ''){
    localStorage.setItem('producer', JSON.stringify(producer));
  }
  let result = JSON.parse(localStorage.getItem('user'));

  const deleteType = (e) => {
    let id = e.currentTarget.dataset.id;
    const url = "http://127.0.0.1:5000/api/v1/nha-sx/xoa-nha-sx/" + id;
    axios.delete(url).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setTimeout(() => {
          link.go({ pathname: '/danh-sach-admin' });
        }, 800)
      }
    })
      .catch(err => {
        //message.error(`${err.response.data.message}\n Có sản phẩm chứa nhà sản xuất nên không thể xoá!!! `);
        message.error(`Lỗi!!! Có sản phẩm chứa nhà sản xuất nên không thể xoá!!! `);
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

  const columns = [
    {
      title: 'Mã nhà sản xuất',
      dataIndex: 'mansx',
      key: 'mansx',
    },
    {
      title: 'Tên nhà sản xuất',
      dataIndex: 'tennsx',
      key: 'tennsx',
    },
    {
      title: 'Xuất xứ',
      dataIndex: 'xuatxu',
      key: 'xuatxu',
    },
    result.permission === 'Admin' ?
      {
        dataIndex: 'mansx',
        key: 'mansx',
        render: mansx => (<div className="btn-box"><Button data-id={mansx} key={mansx} onClick={edit}> Sửa </Button></div>)
      } : (<> </>),
    result.permission === 'Admin' ?
      {
        dataIndex: 'mansx',
        key: 'mansx',
        render: mansx => (<div className="btn-box"><Button data-id={mansx} key={mansx} type="danger" onClick={deleteType}> Xoá </Button></div>)
      } : (<> </>)

  ];


  return (
    <>
      <div className="form-wrapper">
        <h2 style={{ textAlign: 'center', marginTop: "30px" }}>DANH SÁCH NHÀ SẢN XUẤT</h2>
        <Table dataSource={listProducer} columns={columns} pagination={{ pageSize: 10 }} style={{padding: 10}} size="middle" />
        <div className="btn-wrapper">
          <Link to={'/them-nha-san-xuat'}>
            <Button type="primary">
              Thêm nhà sản xuất
            </Button>
          </Link>
        </div>
      </div>
      {/* <Link to={'/Themnhanvien'}><p className="ant-btn ant-btn-primary" type="primary">Thêm nhân viên</p></Link> */}

    </>
  );
}

export default ListProducer;