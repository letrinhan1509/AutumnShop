import React, { useState, useEffect } from 'react';
import { Table, Image, Button, message, Tag} from 'antd';
import { LockOutlined, UnlockOutlined, SearchOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "./scss/addpro.scss"

const ListComment = (props) => {
    const history = useHistory();
    let result =JSON.parse(localStorage.getItem('user'));
    const [listComment, setListComment] = useState([]);
    useEffect (()=>{
        axios.get("http://127.0.0.1:5000/api/v1/binh-luan").then((res)=>{
            setListComment(res.data.data);
        })
    }, []);

    const unlockCmt = (e) => {
        let id = e.currentTarget.dataset.id;
        let values = {
        "mabl": id,
        "trangthai": 1
        };
        const url = "http://127.0.0.1:5000/api/v1/binh-luan/cap-nhat/trang-thai-bluan"
        axios.put(url, values).then((res) => {
            if (res.data.status === "Success") {
            message.success(res.data.message)
            setTimeout(() => {
                history.go({ pathname: '/danh-sach-binh-luan' });
            }, 800)
            
            }
        }) 
            .catch(err => {
                console.log(err.response);
                message.error(`Lỗi...! Hiện bình luận thất bại!\n ${err.response.data.message}`)
            })
        
    }
    const lockCmt = (e) => {
        let id = e.currentTarget.dataset.id;
        let values = {
        "mabl": id,
        "trangthai": 0
        };
        const url = "http://127.0.0.1:5000/api/v1/binh-luan/cap-nhat/trang-thai-bluan"
        axios.put(url, values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                history.go('/danh-sach-binh-luan')
                }, 800)
            }
        }) 
            .catch(err => {
                message.error(`Lỗi...! Ẩn bình luận thất bại!\n ${err.response.data.message}`)
            })
    };
    const [a, setA] = useState([]);
    const [comment, setComment] = useState([]);
    const detail = (e) => {
        let id = e.currentTarget.dataset.id;
        console.log(id);
        setA(id);
    };
    useEffect (()=>{
        if(a != ''){
            let url = "http://127.0.0.1:5000/api/v1/binh-luan/"+ a /* +"/chi-tiet-bluan" */;
            axios.get(url).then((res)=>{
                setComment(res.data.dataCmt);
            })
        }
    }, [a]);
    if(comment != ''){
        localStorage.setItem('detailComment', JSON.stringify(comment));
    }

    if(listComment != null) {
      listComment.forEach(element => {
        if(element.trangthai === 1){
        element.trangthai = [];
        element.trangthai.stt = ["Hiện"];
        element.trangthai.id = element.mabl;
        }
        if(element.trangthai === 0 ){
        element.trangthai = [];
        element.trangthai.stt = ["Ẩn"];
        element.trangthai.id = element.mabl;
        }
      });
    };
  
    /* let { sortedInfo, filteredInfo } = useState([]);
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {}; */
    const columns = [
        {
          title: 'Mã',
          dataIndex: 'mabl',
          key: 'mabl',
        },
        {
          title: 'Mã SP',
          dataIndex: 'masp',
          key: 'masp',
        },
        {
          title: 'Mã KH',
          dataIndex: 'makh',
          key: 'makh',
        },
        {
            title: 'Nội dung',
            dataIndex: 'noidung',
            key: 'noidung',
            width: 400
        },
        {
            title: 'Ngày bình luận',
            dataIndex: 'ngaybl',
            key: 'ngaybl',
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
        {
            title: 'Chi tiết',
            dataIndex: 'mabl',
            key: 'mabl',
            render: (mabl) => <Button data-id={mabl} type="primary" icon={<SearchOutlined />} onClick={detail} />
        },
        result.permission === 'Admin' ? (
        {
          title: 'Hành động',
          dataIndex: 'trangthai',
          data: 'makh',
          key: 'trangthai',
          render: (trangthai) => //(<Button data-id={text} type="primary" icon={<LockOutlined />} /* onClick={linkto} */></Button>)
          (
            <>
              {trangthai.stt.map(tragth => {
                if (tragth === 'Ẩn') {
                  return (
                    <Button data-id={trangthai.id} type="primary" icon={<UnlockOutlined />} onClick={unlockCmt}>
                    </Button>
                  );
                }else{
                  return (
                    <Button data-id={trangthai.id} type="danger" icon={<LockOutlined />} onClick={lockCmt}>
                    </Button>
                  )
                }  
              })}
            </>
          )
        }):(<> </>)

      ];
    
    return (
    <>
        <div className="product-wrapper">
            <h2 style={{ textAlign: 'center', marginTop: "20px", marginBottom: "20px" }}>DANH SÁCH TẤT CẢ BÌNH LUẬN</h2>
            <Table className="proItem" dataSource={listComment} columns={columns} pagination={{ pageSize: 8 }}  size="small" />
        
            {/* <a className="ant-btn ant-btn-primary" href='/Themsanpham'  type="primary">Thêm sản phẩm</a> */}
        </div>
    </>
    );
}

export default ListComment;