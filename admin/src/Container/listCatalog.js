import React, { useState, useEffect } from 'react';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Table, Tag, message } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios'
import "./scss/addpro.scss"
const ListCata = () => {
  const link = useHistory();
  const [a, setA] = useState([]);

  const [listCategory, setListCategory] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/danh-muc").then((res) => {
      setListCategory(res.data.data);
    })
  }, []);
  const linkto = (e) => {
    let id = e.currentTarget.dataset.id
    setA(id);
    console.log(id);
    setTimeout(() => {
      link.push('/danh-muc-san-pham/sua-danh-muc');
    }, 100)
  }
  const [category, setCategory] = useState([]);
  useEffect(() => {
    if (a != "") {
      let url = "http://127.0.0.1:5000/api/v1/danh-muc/" + a
      axios.get(url).then((res) => {
        setCategory(res.data);
      });
    }
  }, [a]);
  if(category != ''){
    localStorage.setItem('category', JSON.stringify(category));
  }
  let result = JSON.parse(localStorage.getItem('user'));

  const deleteCategory = (e) => {
    let id = e.currentTarget.dataset.id;
    const url = "http://127.0.0.1:5000/api/v1/danh-muc/xoa-danh-muc/" + id
    axios.delete(url).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setTimeout(() => {
          link.go({ pathname: '/danh-muc-san-pham' });
        }, 800)
      }
      else {
        message.error(res.data.message)
      }
    })
      .catch(err => {
        message.error(`Lỗi...! Xoá danh mục thất bại!\n ${err.response.data}`)
      })
  }

  const unlock = (e) => {
    let id = e.currentTarget.dataset.id;
    let values = {
      "madm": id,
      "trangthai": 1
    };
    const url = "http://127.0.0.1:5000/api/v1/danh-muc/cap-nhat-trang-thai/dm/"
    axios.put(url, values).then((res) => {
        if (res.data.status === "Success") {
          message.success(res.data.message)
          setTimeout(() => {
            link.go({ pathname: '/danh-sach-admin' });
          }, 800) 
        }
    }) 
        .catch(err => {
            message.error(`Lỗi...! Hiện danh mục thất bại!\n ${err.response.data}`)
        })
  };
  const lock = (e) => {
    let id = e.currentTarget.dataset.id;
    let values = {
      "madm": id,
      "trangthai": 0
    };
    const url = "http://127.0.0.1:5000/api/v1/danh-muc/cap-nhat-trang-thai/dm/"
    axios.put(url, values).then((res) => {
        if (res.data.status === "Success") {
            message.success(res.data.message)
            setTimeout(() => {
              link.go('/danh-sach-admin')
            }, 800)
        }
    }) 
        .catch(err => {
            message.error(`Lỗi...! Ẩn danh mục thất bại! \n ${err.response.data}`)
        })
  };

  listCategory.forEach(element => {
    if(element.trangthai === 1){
      element.trangthai = [];
      element.trangthai.stt = ["Hiện"];
      element.trangthai.id = element.madm;
    }
    if(element.trangthai === 0 ){
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
      )
    },
    result.permission === 'Admin' ?
      {
        dataIndex: 'trangthai',
        key: 'trangthai',
        render: (trangthai) =>
          (
            <>
              {trangthai.stt.map(tragth => {
                if (tragth === 'Ẩn') {
                  return (
                    <div className="btn-box"><Button data-id={trangthai.id} type="primary" icon={<UnlockOutlined />} onClick={unlock}></Button></div>  
                  );
                }else{
                  return (
                    <div className="btn-box"><Button data-id={trangthai.id} type="danger" icon={<LockOutlined />} onClick={lock}></Button></div>
                  )
                }  
              })}
            </>
          )
      } : (<> </>),
    result.permission === 'Admin' ?
      {
        dataIndex: 'madm',
        key: 'madm',
        render: madm => (<div className="btn-box"><Button data-id={madm} key={madm} type="primary" onClick={linkto}> Sửa </Button></div>)
      } : (<> </>),
    /* result.permission === 'Admin' ?
      {
        title: 'Hành động',
        dataIndex: 'maloai',
        key: 'maloai',
        render: maloai => (<Button data-id={maloai} key={maloai} type="danger" onClick={deleteCategory}> Xoá </Button>)
      } : (<> </>) */
  ];


  return (
    <>
      <div className="form-wrapper">
        <h2 style={{ textAlign: 'center', marginTop: "30px" }}>DANH SÁCH CÁC DANH MỤC</h2>
        <Table dataSource={listCategory} columns={columns} pagination={{ pageSize: 10 }} style={{padding: 10}} size="middle" />
        <div className="btn-wrapper">
          <Link to={'/them-danh-muc'}>
            <Button type="primary">
              Thêm danh mục
            </Button>
          </Link>
        </div>
      </div>
      {/* <Link to={'/Themnhanvien'}><p className="ant-btn ant-btn-primary" type="primary">Thêm nhân viên</p></Link> */}

    </>
  );
}

export default ListCata;