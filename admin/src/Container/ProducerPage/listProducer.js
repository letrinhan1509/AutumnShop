import { Button, message, Table, Tag } from 'antd';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "Container/scss/addpro.scss";
import producers from 'API_Call/Api_producer/producer';

const ListProducer = () => {
  const link = useHistory();
  let result = JSON.parse(localStorage.getItem('user'));
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
    producers.getid(id).then((res) => {
      if (res.data.status === "Success") {
        localStorage.setItem('producer', JSON.stringify(res.data.data));
        setTimeout(() => {
          link.push('/danh-sach-nha-sx/sua-nha-sx');
        }, 100)
      }
    });
  }

  // Cập nhật trạng thái nhà sản xuất
  const unlock = (e) => {
    let id = e.currentTarget.dataset.id;
    let values = {
      "mansx": id,
      "trangthai": 1
    };
    producers.updateStatus(values).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setTimeout(() => {
          link.go({ pathname: '/danh-muc-san-pham' });
        }, 800)
      }
    })
      .catch(err => {
        message.error(`${err.response.data.message} !!!`)
      })
  };
  const lock = (e) => {
    let id = e.currentTarget.dataset.id;
    let values = {
      "mansx": id,
      "trangthai": 0
    };
    producers.updateStatus(values).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setTimeout(() => {
          link.go('/danh-muc-san-pham')
        }, 800)
      }
    })
      .catch(err => {
        message.error(`${err.response.data.message}`)
      })
  };

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


  listProducer.forEach(element => {
    if (element.trangthai === 1) {
      element.trangthai = [];
      element.trangthai.stt = ["Hiện"];
      element.trangthai.id = element.mansx;
    }
    if (element.trangthai === 0) {
      element.trangthai = [];
      element.trangthai.stt = ["Ẩn"];
      element.trangthai.id = element.mansx;
    }
  })

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
    {
      title: 'Trạng thái',
      dataIndex: 'trangthai',
      key: 'trangthai',
      render: (trangthai) => (
        <>
          {trangthai.stt.map(tragth => {
            let color = 'green';
            if (tragth === 'Ẩn') {
              color = 'red';
            }
            return (
              <Tag color={color} key={tragth}>
                {tragth.toUpperCase()}
              </Tag>
            );
          })}

        </>
      ),
      filters: [
        { text: "Ẩn", value: "Ẩn" },
        { text: "Hiện", value: "Hiện" },
      ],
      onFilter: (value, record) => record.trangthai.stt.includes(value),
    },
    {
      dataIndex: 'trangthai',
      key: 'trangthai',
      render: (trangthai) =>
      (
        <>
          {trangthai.stt.map(tragth => {
            if (tragth === 'Ẩn') {
              return (
                <div className="btn-box lock"><Button data-id={trangthai.id} type="primary" icon={<UnlockOutlined />} onClick={unlock}></Button></div>
              );
            } else {
              return (
                <div className="btn-box lock"><Button data-id={trangthai.id} type="danger" icon={<LockOutlined />} onClick={lock}></Button></div>
              )
            }
          })}
        </>
      )
    },
    {
      dataIndex: 'mansx',
      key: 'mansx',
      render: mansx => (<div className="btn-box fix"><Button data-id={mansx} type="primary" key={mansx} onClick={edit}> Sửa </Button></div>)
    },
    result.permission === 'Admin' || result.permission === 'QL' ?
      {
        dataIndex: 'mansx',
        key: 'mansx',
        render: mansx => (<div className="btn-box delete"><Button data-id={mansx} key={mansx} type="danger" onClick={deleteType}> Xoá </Button></div>)
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
        <Table className="item" dataSource={listProducer} columns={columns} pagination={{ pageSize: 6 }} style={{ padding: 10 }} size="middle" />
      </div>
      {/* <Link to={'/Themnhanvien'}><p className="ant-btn ant-btn-primary" type="primary">Thêm nhân viên</p></Link> */}

    </>
  );
}

export default ListProducer;