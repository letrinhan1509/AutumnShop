import React, { useState, useEffect } from 'react';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Table, Tag, message, Modal } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import "Container/scss/addpro.scss";
import catalog from 'API_Call/Api_catalog/catalog';
import { storage } from 'Container/Firebase/firebase';

const ListCata = () => {
  const link = useHistory();
  const { confirm } = Modal;
  //API ListCategory
  const [listCategory, setListCategory] = useState([]);
  useEffect(() => {
    catalog.getAll().then((res) => {
      setListCategory(res.data.listCategorys);
    })
  }, []);

  //Redirect sửa danh mục theo ID
  const linkto = (e) => {
    let id = e.currentTarget.dataset.id
    catalog.getDanhmucID(id).then((res) => {
      if (res.data.status === "Success") {
        localStorage.setItem('category', JSON.stringify(res.data.data));
        setTimeout(() => {
          link.push('/danh-muc-san-pham/sua-danh-muc');
        }, 100)
      }
    });
  }

  let result = JSON.parse(localStorage.getItem('user'));

  // Xoá danh mục
  const deleteCategory = (e) => {
    let id = e.currentTarget.dataset.id;
    let cata = [];
    catalog.getDanhmucID(id).then((res) => {
      if (res.data.status === "Success") {
        cata = res.data.data;
      }
    });
    confirm({
      title: 'Bạn muốn xóa danh mục này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        catalog.deleteCatalog(id).then((res) => {
          if (res.data.status === "Success") {
            message.success(res.data.message)
            const del = storage.ref(`Catalog_Img/${cata.tenhinh}`);
            del.delete().then((res) => {
              message.success("Đã xóa ảnh!");
            }).catch((error) => {
              console.log(error);
            });
            setTimeout(() => {
              window.location.reload()
            }, 1000);
          }
          else {
            message.error(res.data.message)
          }
        })
          .catch(err => {
            message.error(`${err.response.data.message} !!!`)
          })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  //Cập nhật trạng thái danh mục
  const unlock = (e) => {
    let id = e.currentTarget.dataset.id;
    let values = {
      "madm": id,
      "trangthai": 1
    };
    catalog.updateStatusCata(values).then((res) => {
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
      "madm": id,
      "trangthai": 0
    };
    catalog.updateStatusCata(values).then((res) => {
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

  listCategory.forEach(element => {
    if (element.trangthai === 1) {
      element.trangthai = [];
      element.trangthai.stt = ["Hiện"];
      element.trangthai.id = element.madm;
    }
    if (element.trangthai === 0) {
      element.trangthai = [];
      element.trangthai.stt = ["Ẩn"];
      element.trangthai.id = element.madm;
    }
  });

  const columns = [
    {
      title: 'Mã danh mục',
      dataIndex: 'madm',
      key: 'madm',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'tendm',
      key: 'tendm',
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
      dataIndex: 'madm',
      key: 'madm',
      render: madm => (<div className="btn-box fix"><Button data-id={madm} key={madm} type="primary" onClick={linkto}> Sửa </Button></div>)
    },
    result.permission === 'Admin' || result.permission === 'QLCH' ?
      {
        dataIndex: 'madm',
        key: 'madm',
        render: madm => (<div className="btn-box delete"><Button data-id={madm} key={madm} type="danger" onClick={deleteCategory}> Xoá </Button></div>)
      } : (<> </>),
  ];


  return (
    <>
      <div className="form-wrapper">
        <h2 style={{ textAlign: 'center', marginTop: "30px" }}>DANH SÁCH CÁC DANH MỤC</h2>
        {result.permission === 'Admin' || result.permission === 'QLCH' ? (
          <div className="btn-wrapper">
            <Link to={'/them-danh-muc'}>
              <Button type="primary">
                Thêm danh mục
              </Button>
            </Link>
          </div>
        ) : ("")}
        <Table className="item" dataSource={listCategory} columns={columns} pagination={{ pageSize: 6 }} style={{ padding: 10 }} size="middle" />
      </div>
    </>
  );
}

export default ListCata;