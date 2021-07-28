import { Button, message, Modal, Table, Tag, Select } from 'antd';
import product from 'API_Call/Api_product/product';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import "Container/scss/addpro.scss";

const { Option } = Select;
const AllProduct = () => {
  let link = useHistory()
  const { confirm } = Modal;
  const [idPro, setIdPro] = useState([]);
  let result = JSON.parse(localStorage.getItem('user'))

  //API ListProduct
  const [ListProductHome, setListProductHome] = useState([]);
  useEffect(() => {
    product.getAll().then((res) => {
      setListProductHome(res.data.data);
      setWordSearch(res.data.data);
    });
  }, []);

  //Redirect sua-san-pham 
  const loadEdit = (e) => {
    let i = e.currentTarget.dataset.id;
    product.getid(i).then((res) => {
      if (res.data.status === "Success") {
        localStorage.setItem('product', JSON.stringify(res.data.dataSpham));
        setTimeout(() => {
          link.push('/tat-ca-san-pham/sua-san-pham');
        }, 100)
      }
    })
  }



  ///Xoá SP
  const deletePro = (e) => {
    let id = e.currentTarget.dataset.id
    console.log(id);
    confirm({
      title: 'Bạn muốn xóa sản phẩm này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        product.deletePro(id).then((res) => {
          if (res.data.status === "Success") {
            message.success(res.data.message);
            window.location.reload()
          } if (res.data.status === "Fail") {
            message.error(res.data.message);
          }
        })
          .catch(err => {
            message.error(`${err.response.data.message}`);
          })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  //DataTable
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
      filters: [
        { text: 'S', value: 'S' },
        { text: 'M', value: 'M' },
        { text: 'L', value: 'L' },
      ],
      onFilter: (value, record) => record.size.includes(value),
    },
    {
      title: 'Màu',
      dataIndex: 'mau',
      key: 'mau',
      filters: [
        { text: 'Xanh', value: 'Xanh' },
        { text: 'Đỏ', value: 'Đỏ' },
        { text: 'Đen', value: 'Đen' },
        { text: 'Trắng', value: 'Trắng' },
      ],
      onFilter: (value, record) => record.mau.includes(value),
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
      key: 'tennsx',
      filters: [
        { text: 'ADIDAS', value: 'ADIDAS' },
        { text: 'BSK', value: 'BSK' },
        { text: 'BOUTON', value: 'BOUTON' },
        { text: 'DICKIES', value: 'DICKIES' },
        { text: 'ICON', value: 'ICON' },
        { text: 'LACOSTE', value: 'LACOSTE' },
        { text: 'MASCUS', value: 'MASCUS' },
        { text: 'MLB Korea', value: 'MLB Korea' },
        { text: 'NBA', value: 'NBA' },
        { text: 'NIKE', value: 'NIKE' },
        { text: 'NOMOUS', value: 'NOMOUS' },
        { text: 'PUMA', value: 'PUMA' },
        { text: 'SUPREME', value: 'SUPREME' },
        { text: 'T.MAN', value: 'T.MAN' },
        { text: 'Yame', value: 'Yame' },
      ],
      onFilter: (value, record) => record.tennsx.includes(value),
    },
    {
      title: 'Loại',
      dataIndex: 'tenloai',
      key: 'tenloai',
      filters: [
        { text: 'ÁO KHOÁC', value: 'ÁO KHOÁC' },
        { text: 'ÁO SƠ MI', value: 'ÁO SƠ MI' },
        { text: 'ÁO THUN', value: 'ÁO THUN' },
        { text: 'BALO - TÚI SÁCH', value: 'BALO - TÚI SÁCH' },
        { text: 'DÉP', value: 'DÉP' },
        { text: 'GIÀY', value: 'GIÀY' },
        { text: 'NÓN', value: 'NÓN' },
        { text: 'QUẦN JEAN', value: 'QUẦN JEAN' },
        { text: 'QUẦN KAKI', value: 'QUẦN KAKI' },
        { text: 'QUẦN SHORT', value: 'QUẦN SHORT' },
        { text: 'QUẦN TÂY', value: 'QUẦN TÂY' },
        { text: 'THẮT LƯNG', value: 'THẮT LƯNG' },
        { text: 'Túii', value: 'Túii' },
        { text: 'VỚ', value: 'VỚ' },
      ],
      //filteredValue: filteredInfo.maloai || null,
      onFilter: (value, record) => record.tenloai.includes(value),
    },
    {
      title: 'Danh mục',
      dataIndex: 'tendm',
      key: 'tendm',
      filters: [
        { text: 'ÁO', value: 'ÁO' },
        { text: 'Balo-Túi', value: 'Balo-Túi' },
        { text: 'Dép', value: 'Dép' },
        { text: 'Giày', value: 'Giày' },
        { text: 'Phụ kiện', value: 'Phụ kiện' },
        { text: 'Quần', value: 'Quần' },
      ],
      onFilter: (value, record) => record.tendm.includes(value),
    },
    {
      dataIndex: "masp",
      key: "masp",
      render: masp => (<div className="btn-box fix"><Button data-id={masp} onClick={loadEdit} type="primary">Sửa</Button></div>)
    },
    result.permission === 'Admin' || result.permission === 'QL' ?
      {
        dataIndex: "masp",
        key: "masp",
        render: masp => (<div className="btn-box delete"><Button data-id={masp} onClick={deletePro} type="danger">Xoá</Button></div>)
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
  const [wordSearch, setWordSearch] = useState([]);
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
  }

  //Hiển thị SP
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
          <div className="View-layout-left">
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
            <div className="btn-wrapper">
              <Link to={'/them-san-pham'}>
                <Button type="primary">
                  Thêm sản phẩm
                </Button>
              </Link>
            </div>
          </div>
          <div className="search-box">
            <span>Tìm kiếm: </span>
            <input placeholder='Nhập tên sản phẩm' style={{ width: 300 }} onChange={e => onChange(e)} />
          </div>
        </div>
        <Table className="proItem" dataSource={wordSearch} rowKey="uid" columns={columns} pagination={{ pageSize: `${pageSize}` }} style={{ padding: 10 }} size="middle" />
      </div>
    </>
  );
}

export default AllProduct;
