import { Button, message, Table, Tag, Modal } from 'antd';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "Container/scss/addpro.scss";
import statusOrder from 'API_Call/Api_admin/admin';

const ListStatusOrder = () => {
    const link = useHistory();
    const { confirm } = Modal;
    let result = JSON.parse(localStorage.getItem('user'));
    //API ListStatusOrder
    const [listStatus, setListStatus] = useState([]);
    useEffect(() => {
        statusOrder.getTitle().then((res) => {
            setListStatus(res.data.data);
        })
    }, []);

    //Redirect sửa
    const edit = (e) => {
        let id = e.currentTarget.dataset.id
        statusOrder.getTitleID(id).then((res) => {
        if (res.data.status === "Success") {
            localStorage.setItem('statusOrder', JSON.stringify(res.data.data));
            setTimeout(() => {
            link.push('/danh-sach-trang-thai/sua-trang-thai');
            }, 100)
        }
        });
    }

    //Xóa trạng thái đơn hàng
    const deleteProducer = (e) => {
        let id = e.currentTarget.dataset.id;
        confirm({
        title: 'Bạn có thật sự muốn xóa trạng thái đơn hàng này không?',
        okText: 'Xóa',
        okType: 'danger',
        cancelText: 'Không',
        onOk() {
            statusOrder.deleteStatusOrder(id).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                link.go({ pathname: '/danh-sach-trang-thai' });
                }, 800)
            }
            })
            .catch(err => {
                message.error(`Không thể xoá trạng thái đơn hàng này !!! `);
            })
        },
        onCancel() {
            console.log('Cancel');
        },
        });
    }

    const columns = [
    {
      title: 'Mã trạng thái',
      dataIndex: 'trangthai',
      key: 'trangthai',
    },
    {
      title: 'Tên trạng thái',
      dataIndex: 'tentt',
      key: 'tentt',
    },
    result.permission === 'Admin' || result.permission === 'QLCH' ?
    {
        title: 'Hành động',
        dataIndex: 'trangthai',
        key: 'trangthai',
        render: trangthai => (<div className="btn-box fix"><Button data-id={trangthai} type="primary" key={trangthai} onClick={edit}> Sửa </Button></div>)
    } : (<> </>),
    result.permission === 'Admin' || result.permission === 'QLCH' ?
    {
        dataIndex: 'trangthai',
        key: 'trangthai',
        render: trangthai => (<div className="btn-box delete"><Button data-id={trangthai} key={trangthai} type="danger" onClick={deleteProducer}> Xoá </Button></div>)
    } : (<> </>)

  ];


  return (
    <>
      <div className="form-wrapper">
        <h2 style={{ textAlign: 'center', marginTop: "30px" }}>DANH SÁCH TRẠNG THÁI ĐƠN HÀNG</h2>
        {result.permission === 'Admin' ? (
          <div className="btn-wrapper">
            <Link to={'/them-trang-thai'}>
              <Button type="primary">
                Thêm trạng thái đơn hàng
              </Button>
            </Link>
          </div>
        ) : ("")}
        <Table className="item" dataSource={listStatus} columns={columns} pagination={{ pageSize: 6 }} style={{ padding: 10 }} size="middle" />
      </div>
    </>
  );
}

export default ListStatusOrder;