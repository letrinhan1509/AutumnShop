import React, { useState, useEffect } from 'react';
import { Button, Table,Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useHistory } from 'react-router';
const AllProduct = () => {
  let link = useHistory()
  const [idPro, setIdPro]=useState([]);
  const [a, setA] = useState([]);


  const loadEdit= (e)=>{
    let i =e.currentTarget.dataset.id;
    console.log(i);
    setA(i);
    setTimeout(()=>{
      link.push('/Editsanpham');
     },100) 
   
  }
  const onClick=(e)=>{
    let id = e.currentTarget.dataset.id
    setIdPro(id)
    console.log('Content: ', e.currentTarget.dataset.id);
    console.log(idPro);
    setIsModalVisible(true);
  }
 
  const masp = window.localStorage.getItem("masp");
  const [product, setProduct] = useState([]);
  /* let url = "http://127.0.0.1:5000/api/v1/product-id/" +a
  useEffect(() => {
      axios.get(url).then((res) => {
          if(res.data.status ==="Success"){
              setProduct(res.data.data)
              console.log(res.data.data);
          }
         
         

      })

  }, [a]) */
  console.log(product.code);
  window.localStorage.setItem('Product', JSON.stringify(product));
  let result =JSON.parse(localStorage.getItem('user'))
  console.log(result.permission);
  ///Modal Xoá
  const [isModalVisible, setIsModalVisible] = useState(false);

 
  const handleOk = () => {
    let url = "http://127.0.0.1:5000/api/v1/del-product/"+idPro;
    console.log(url);
     axios.get(url).then((res)=>{
       if(res.data.status ==="Success"){
          message.success(res.data.message);
          window.location.reload()
       }
       if(res.data.status ==="Fail"){
        message.error(res.data.message);
       }
      
   
      })
     
    setIsModalVisible(false);
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [ListProductHome, setListProductHome] = useState([]);
/*   useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/product").then((res) => {
      setListProductHome(res.data.data);
    });
  }, []); */

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
          title: 'Hình',
          dataIndex: 'hinh',
          key: 'hinh',
        },
        {
            title: 'Hình chi tiết',
            dataIndex: 'hinhchitiet',
            key: 'hinhchitiet',
        },
        {
            title: 'Mô tả',
            dataIndex: 'mota',
            key: 'mota',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangthai',
            key: 'trangthai',
        },
        {
            title: 'Nhà sản xuất',
            dataIndex: 'mansx',
            key: 'mansx',
        },
        {
            title: 'Mã loại',
            dataIndex: 'maloai',
            key: 'maloai',
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
            dataIndex: 'madm',
            key: 'madm',
        },
        {
          title: 'Action',
          dataIndex:"masp",
          key:"masp",
          render:text =>result.permission ==='Admin' ?(<Button data-id={text} onClick={onClick}>Xoá</Button>):(<p></p>)
          
        },
        {
          title: '',
          dataIndex:"masp",
          key:"masp",
          render:text =>result.permission ==='Admin' ?(<Button data-id={text} onClick={loadEdit} >Sửa</Button>):(<p></p>)
        }
      ];
      
      const data = [
        {
          key: '1',
          masp: 'SP01',
          code: 'SP01BLGOKU',
          tensp: 'Áo Goku xanh',
          soluong: '10',
          size: 'L',
          mau: 'xanh',
          gia: '10000',
          hinh: 'goku.png',
          hinhchitiet: ['goku1.png', 'goku2.png'],
          mota: 'that episode was awsome, johhny taking his language whole vid and did you see hiow big his smile was the whole vid ^^',
          trangthai: '1',
          mansx: 'MAPU',
          maloai: 'at',
          madm: 'Ao'
        },
        {
            key: '2',
            masp: 'SP02',
            code: 'SP01BLGOKU',
            tensp: 'Áo Goku xanh',
            soluong: '10',
            size: 'M',
            mau: 'xanh',
            gia: '20000',
            hinh: 'goku.png',
            hinhchitiet: ['goku1.png', 'goku2.png'],
            mota: 'that episode was awsome, johhny taking his language whole vid and did you see hiow big his smile was the whole vid ^^',
            trangthai: '1',
            mansx: 'MAPU',
            maloai: 'at',
            madm: 'Ao'
        },
      ];


    return (
        <>
        <Table dataSource={data} rowKey="uid"   columns={columns} pagination={{ pageSize: 6 }}  size="middle"
       
        />
         <Modal title="Thông báo" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       
        <p>Bạn có muốn xoá sản phẩm này không ?</p>
      </Modal>
        
        
        <Link to={'/Themsanpham'}><p className="ant-btn ant-btn-primary" type="primary">Thêm sản phẩm</p></Link>
        </>
    );
}

export default AllProduct;
