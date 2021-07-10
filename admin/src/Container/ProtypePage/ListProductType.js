import { Button, message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "Container/scss/addpro.scss";
import catalog from 'API_Call/Api_catalog/catalog';

const ListProductType = () => {
  const link = useHistory();
  let result = JSON.parse(localStorage.getItem('user'));

  const [ListType, setListType] = useState([]);
  useEffect(() => {
    catalog.getAllType().then((res) => {
      setListType(res.data.data);
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
      catalog.getTypeID(a).then((res) => {
        setType(res.data);
      });
    }
  }, [a]);
  if (Type != '') {
    localStorage.setItem('type', JSON.stringify(Type));
  }

  const deleteType = (e) => {
    let id = e.currentTarget.dataset.id;
    console.log("Id:", id);
    catalog.deleteProtype(id).then((res) => {
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
        message.error(`Lỗi...! Xoá loại thất bại!\n ${err.response.data.message}`)
      })
  }

  ListType.forEach(element => {
    if (element.trangthai === 1) {
      element.trangthai = [];
      element.trangthai.stt = ["Hiện"];
      element.trangthai.id = element.maloai;
    }
    if (element.trangthai === 0) {
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
      key: 'tenloai'
    },
    {
      title: 'Danh mục',
      dataIndex: 'madm',
      key: 'madm',
      filters: [
        { text: 'DMA', value: 'DMA' },
        { text: 'DMB', value: 'DMB' },
        { text: 'DMD', value: 'DMD' },
        { text: 'DMG', value: 'DMG' },
        { text: 'DMPK', value: 'DMPK' },
        { text: 'DMQ', value: 'DMQ' },
      ],
      onFilter: (value, record) => record.madm.includes(value),
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
        <h2 style={{ textAlign: 'center', marginTop: "30px", marginBottom:"5px" }}>DANH SÁCH LOẠI SẢN PHẨM</h2>
        {
          result.permission === 'Admin' ? (
            <div className="btn-wrapper">
              <Link to={'/them-loai-san-pham'}>
                <Button type="primary">
                  Thêm loại sản phẩm
                </Button>
              </Link>
            </div>
          ) : ("")
        }
        <Table className="item" dataSource={ListType} columns={columns} pagination={{ pageSize: 10 }} style={{ padding: 10 }} size="middle" />
        
        
      </div>

    </>
  );
}

export default ListProductType;