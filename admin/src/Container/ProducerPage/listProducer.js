import { Button, message, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "Container/scss/addpro.scss";
import producers from 'API_Call/Api_producer/producer';

const ListProducer = () => {
  const link = useHistory();
  const [a, setA] = useState([]);

  //API ListProducer
  const [listProducer, setListProducer] = useState([]);
  useEffect(() => {
    producers.getAll().then((res) => {
      setListProducer(res.data.data);
    })
  }, []);

  //Redirect sửa nhà sản xuất theo ID
  const edit = (e) => {
    let id = e.currentTarget.dataset.id
    setA(id);
    console.log(id);
    setTimeout(() => {
      link.push('/danh-sach-nha-sx/sua-nha-sx');
    }, 100)
  }

  //Lấy thông tin nhà sản xuất theo ID
  const [producer, setProducer] = useState([]);
  useEffect(() => {
    if (a != "") {
      producers.getid(a).then((res) => {
        setProducer(res.data);
      });
    }
  }, [a]);
  if (producer != '') {
    localStorage.setItem('producer', JSON.stringify(producer));
  }
  let result = JSON.parse(localStorage.getItem('user'));


  //Xóa nhà sản xuất
  const deleteType = (e) => {
    let id = e.currentTarget.dataset.id;
    producers.deleteProducer(id).then((res) => {
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
      filters: [
        { text: 'Đức', value: 'Đức' },
        { text: 'Việt Nam', value: 'Việt Nam' },
        { text: 'Mỹ', value: 'Mỹ' },
        { text: 'Pháp', value: 'Pháp' },
        { text: 'Hàn Quốc', value: 'Hàn Quốc' },
      ],
      onFilter: (value, record) => record.xuatxu.includes(value),
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
        {result.permission === 'Admin' ? (
          <div className="btn-wrapper">
            <Link to={'/them-nha-san-xuat'}>
              <Button type="primary">
                Thêm nhà sản xuất
              </Button>
            </Link>
          </div>
        ) : ("")}
        <Table className="item" dataSource={listProducer} columns={columns} pagination={{ pageSize: 10 }} style={{ padding: 10 }} size="middle" />
      </div>
      {/* <Link to={'/Themnhanvien'}><p className="ant-btn ant-btn-primary" type="primary">Thêm nhân viên</p></Link> */}

    </>
  );
}

export default ListProducer;