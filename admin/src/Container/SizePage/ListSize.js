import { Button, message, Table } from 'antd';
//import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "Container/scss/addpro.scss";
import size from 'API_Call/Api_product/product';

const ListSize = () => {
    const link = useHistory();
    let result = JSON.parse(localStorage.getItem('user'));
    //API Size
    const [listSize, setListSize] = useState([]);
    useEffect(() => {
        size.getSize().then((res) => {
            setListSize(res.data.listSize);
        })
    }, []);

    //Redirect sửa size theo masize
    const edit = (e) => {
        let id = e.currentTarget.dataset.id
        size.getSizeId(id).then((res) => {
        if (res.data.status === "Success") {
            localStorage.setItem('size', JSON.stringify(res.data.size));
            setTimeout(() => {
            link.push('/bang-size/sua-size');
            }, 100)
        }
        });
    }

    //Xóa size
    const deleteType = (e) => {
        let id = e.currentTarget.dataset.id;
        size.deleteSize(id).then((res) => {
        if (res.data.status === "Success") {
            message.success(res.data.message)
            setTimeout(() => {
            link.go({ pathname: '/danh-sach-size' });
            }, 800)
        }
        })
        .catch(err => {
            message.error(`${err.response.data.message}`);
        })
    }

    const columns = [
        {
            title: 'Mã size',
            dataIndex: 'masize',
            key: 'masize',
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
            title: 'Giới tính',
            dataIndex: 'gioitinh',
            key: 'gioitinh',
            filters: [
                { text: 'Nam', value: 'Nam' },
                { text: 'Nữ', value: 'Nữ' },
            ],
            onFilter: (value, record) => record.gioitinh.includes(value),
        },
        {
            title: `Cân nặng từ`,
            dataIndex: 'cannangtu',
            key: 'cannangtu',
        },
        {
            title: 'Cân nặng đến',
            dataIndex: 'cannangden',
            key: 'cannangden',
        },
        {
            title: 'Chiều cao từ',
            dataIndex: 'chieucaotu',
            key: 'chieucaotu',
        },
        {
            title: 'Chiều cao đến',
            dataIndex: 'chieucaoden',
            key: 'chieucaoden',
        },
        result.permission === 'Admin' || result.permission === 'QLCH' ?
        {
            dataIndex: 'masize',
            key: 'masize',
            render: masize => (<div className="btn-box fix"><Button data-id={masize} type="primary" key={masize} onClick={edit}> Sửa </Button></div>)
        } : (<></>),
        result.permission === 'Admin' || result.permission === 'QLCH' ?
        {
            dataIndex: 'masize',
            key: 'masize',
            render: masize => (<div className="btn-box delete"><Button data-id={masize} key={masize} type="danger" onClick={deleteType}> Xoá </Button></div>)
        } : (<></>)

    ];


    return (
        <>
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center', marginTop: "30px" }}>BẢNG SIZE QUẦN ÁO THEO CHIỀU CAO - CÂN NẶNG</h2>
            {result.permission === 'Admin' || result.permission === 'QLCH' ? (
            <div className="btn-wrapper">
                <Link to={'/them-size'}>
                <Button type="primary">
                    Thêm size
                </Button>
                </Link>
            </div>
            ) : ("")}
            <Table className="item" dataSource={listSize} columns={columns} pagination={{ pageSize: 6 }} style={{ padding: 10 }} size="middle" />
        </div>

        </>
    );
}

export default ListSize;