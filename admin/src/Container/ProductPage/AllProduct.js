import { Button, message, Modal, Table, Tag, Select } from 'antd';
import product from 'API_Call/Api_product/product';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import "Container/scss/addpro.scss";

const { Option } = Select;
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
    if (a != '') {
      let url = "http://127.0.0.1:5000/api/v1/san-pham/" + a;
      axios.get(url).then((res) => {
        if (res.data.status === "Success") {
          setProductEdit(res.data.dataSpham);
        }
      })
    }
  }, [a]);
  //window.localStorage.setItem('Product', JSON.stringify(product));
  if (productEdit != '') {
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
      setWordSearch(res.data.data);
    });
  }, []);

  let { sortedInfo, filteredInfo } = useState([]);
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

  const columns = [
    {
      title: 'Mã',
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
      title: 'Ảnh',
      dataIndex: 'hinh',
      key: 'hinh',
      render: text => <img src={text} width={70} />,
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
      key: 'trangthai',
      render: trangthai => trangthai === 1 ? (
        <Tag color={'green'} key={trangthai}>
          {trangthai}
        </Tag>
      ) : (
        <Tag color={'red'} key={trangthai}>
          {trangthai}
        </Tag>
      )
    },
    {
      title: 'Nhà sản xuất',
      dataIndex: 'tennsx',
      key: 'tennsx'
    },
    {
      title: 'Loại',
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
      title: 'Danh mục',
      dataIndex: 'tendm',
      key: 'tendm'
    },
    result.permission === 'Admin' ?
      {
        dataIndex: "masp",
        key: "masp",
        render: masp => (<div className="btn-box"><Button data-id={masp} onClick={loadEdit} type="primary">Sửa</Button></div>)
      } : (<> </>),
    result.permission === 'Admin' ?
      {
        dataIndex: "masp",
        key: "masp",
        render: masp => (<div className="btn-box"><Button data-id={masp} onClick={onClick} type="danger" >Xoá</Button></div>)
      } : (<> </>)
  ];

  //Tìm kiếm
  function removeAccents(str) {
    return str.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }
  function filterItems(arr, query) {
    return arr.filter(function (el) {
      if (removeAccents(el.tensp.toLowerCase()).indexOf(removeAccents(query.toLowerCase())) !== -1) {
        return el;
      } else {
        return "";
      }

    });
  }
  let demo = ListProductHome;
  const [wordSearch, setWordSearch] = useState(...demo);
  console.log(wordSearch);
  function onChange(e) {
    if (e.target.value !== "") {
      let filter = filterItems(ListProductHome, e.target.value);
      if (filter !== "") {
        demo = filter;
        setWordSearch(demo);
      } else {
        demo = ListProductHome;
        setWordSearch(demo);
      }
    } else {
      demo = ListProductHome;
      setWordSearch(demo);
    }
    console.log(demo);
  }
  //let PSize = 6;
  const [pageSize, setPageSize] = useState(4);
  const size = [
    {
      key: 1,
      PSize: 4,

    },
    {
      key: 2,
      PSize: 6,
    },
    {
      key: 3,
      PSize: 8,
    },
    {
      key: 3,
      PSize: 10,
    }
  ];
  const ChangeSize = (e) => {
    setPageSize(e);
  };

  return (
    <>
      <div className="product-wrapper">
        <h2>Danh sách sản phẩm</h2>
        <div className="View-layout">
          <div>
            <span>Sản phẩm hiển thị: </span>
            <Select defaultValue="4" Option style={{ width: 70 }} onChange={e => ChangeSize(e)}>
              {size.map((item) => {
                return (
                  <>
                    <Option value={item.PSize}>{item.PSize}</Option>
                  </>
                )
              })}
            </Select>
          </div>
          <div className="search-box">
            <span>Tìm kiếm: </span>
            <input placeholder='Nhập tên sản phẩm' style={{ width: 300 }} onChange={e => onChange(e)} />
          </div>
        </div>
        <Table className="proItem" dataSource={wordSearch} rowKey="uid" columns={columns} pagination={{ pageSize: `${pageSize}` }} style={{ padding: 10 }} size="middle" />
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
