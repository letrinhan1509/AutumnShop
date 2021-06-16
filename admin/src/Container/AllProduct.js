import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useHistory } from 'react-router';
import product from '../API_Call/Api_product/product';
import "./scss/addpro.scss"
const AllProduct = () => {
  let link = useHistory()
  const [idPro, setIdPro] = useState([]);
  const [a, setA] = useState([]);
  let result = JSON.parse(localStorage.getItem('user'))

  const loadEdit = (e) => {
    let i = e.currentTarget.dataset.id;
    console.log(i);
    setA(i);
    setTimeout(() => {
      link.push('/tat-ca-san-pham/sua-san-pham');
    }, 100)

  }
  const onClick = (e) => {
    let id = e.currentTarget.dataset.id
    setIdPro(id)
    console.log('Content: ', e.currentTarget.dataset.id);
    console.log(idPro);
    setIsModalVisible(true);
  }

  //const masp = window.localStorage.getItem("masp");
  const [productEdit, setProductEdit] = useState([]);
  useEffect(() => {
    if(a != ''){
      let url = "http://127.0.0.1:5000/api/v1/san-pham/" + a;
      axios.get(url).then((res) => {
        if(res.data.status ==="Success"){
            setProductEdit(res.data.dataSpham);
        }
      })
    }
  }, [a]);
  //window.localStorage.setItem('Product', JSON.stringify(product));
  if(productEdit != ''){
    localStorage.setItem('product', JSON.stringify(productEdit));
  }

  ///Modal Xoá
  const [isModalVisible, setIsModalVisible] = useState(false);


  const handleOk = () => {
    let url = "http://127.0.0.1:5000/api/v1/san-pham/xoa-san-pham/" + idPro;
    console.log(url);
    axios.delete(url).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message);
        window.location.reload()
      } if (res.data.status === "Fail") {
        message.error(res.data.message);
      }
    })
      .catch(err => {
        message.error(`Lỗi...!\n ${err.response.data.message}`);
      })

    setIsModalVisible(false);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [ListProductHome, setListProductHome] = useState([]);
  useEffect(() => {
    product.getAll().then((res) => {
      setListProductHome(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  let { sortedInfo, filteredInfo } = useState([]);
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'masp',
      key: 'masp',

    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'tensp',
      key: 'tensp',
    },
    {
      title: 'Số lượng',
      dataIndex: 'soluong',
      key: 'soluong',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Màu',
      dataIndex: 'mau',
      key: 'mau',
    },
    {
      title: 'Giá',
      dataIndex: 'gia',
      key: 'gia',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangthai',
      key: 'trangthai'
    },
    {
      title: 'Nhà sản xuất',
      dataIndex: 'tennsx',
      key: 'tennsx'
    },
    {
      title: 'Mã loại',
      dataIndex: 'tenloai',
      key: 'tenloai'
      /* filters: [
          { text: 'asm', value: 'asm' },
          { text: 'at', value: 'at' },
          { text: 'ak', value: 'ak' },
          { text: 'Balo', value: 'bl' },
          { text: 'Dép', value: 'dep' },
          { text: 'Giày', value: 'giay' },
          { text: 'Nón', value: 'no' },
        ],
      filteredValue: filteredInfo.maloai || null,
  onFilter: (value, record) => record.maloai.includes(value), */

      //Bỏ
      //onFilter: (value, record) => record.maloai.indexOf(value) === 0,
      /*  sorter: (a, b) => a.maloai.length - b.maloai.length,
       sortOrder: sortedInfo.columnKey === 'maloai' && sortedInfo.order, */

      //ellipsis: true,
    },
    {
      title: 'Mã danh mục',
      dataIndex: 'tendm',
      key: 'tendm'
    },
    result.permission === 'Admin' ?
    {
      dataIndex: "masp",
      key: "masp",
      render: masp => (<div className="btn-box"><Button data-id={masp} onClick={loadEdit} >Sửa</Button></div>)
    } : (<> </>),
    result.permission === 'Admin' ?
    {
      dataIndex: "masp",
      key: "masp",
      render: masp => (<div className="btn-box"><Button data-id={masp} onClick={onClick} type="danger" >Xoá</Button></div>)
    } : (<> </>)
  ];




  return (
    <>
      <div className="product-wrapper">
        <Table className="proItem" dataSource={ListProductHome} rowKey="uid" columns={columns} pagination={{ pageSize: 6 }} style={{ padding: 10}} size="middle" />
        <Modal title="Thông báo" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Bạn có muốn xoá sản phẩm này không ?</p>
        </Modal>
        <div className="btn-wrapper">
          <Link to={'/them-san-pham'}>
            <Button type="primary">
              Thêm sản phẩm
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AllProduct;
