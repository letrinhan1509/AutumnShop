import React, { useState } from 'react';
import { Image, Row, Col, Input, Button, message, Select, Table } from 'antd';
import { useHistory, Link } from "react-router-dom";
import "container/components-css/order.scss";
import users from 'API_Call/Api_user/user';

const { TextArea } = Input;
const { Option } = Select;
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
const Order = (props) => {
    const history = useHistory();



    function removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    function filterItems(arr, query) {
        return arr.filter(function (el) {
            if (removeAccents(el.tennv.toLowerCase()).indexOf(removeAccents(query.toLowerCase())) !== -1) {
                return el;
            } else {
                return "";
            }

        });
    }
    //let demo = ListAdmin;
    const [wordSearch, setWordSearch] = useState([]);
    /* function onChange(e) {
        if (e.target.value !== "") {
            let filter = filterItems(ListAdmin, e.target.value);
            if (filter !== "") {
                demo = filter;
                setWordSearch(demo);
            } else {
                demo = ListAdmin;
                setWordSearch(demo);
            }
        } else {
            demo = ListAdmin;
            setWordSearch(demo);
        }
        console.log(demo);
    } */
    const [pageSize, setPageSize] = useState(6);
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

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'madonhang',
            key: 'madonhang',
        },
        {
            title: 'Mã khách hàng',
            dataIndex: 'makh',
            key: 'makh',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'tongtien',
            key: 'tongtien',
        },
        {
            title: 'Mã khuyến mãi',
            dataIndex: 'makm',
            key: 'makm',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'ngaydat',
            key: 'ngaydat',
        },
        {
            title: 'Ngày giao',
            dataIndex: 'ngaygiao',
            key: 'ngaygiao',
        },
        {
            title: 'Mã nhân viên',
            dataIndex: 'manv',
            key: 'manv',
        },

    ];

    return (
        <div className="order">
            <div className="order-wrapper" >
                <h2 style={{ textAlign: 'center', marginTop: "20px", marginBottom: "20px" }}>DANH SÁCH ĐƠN HÀNG</h2>
                <div className="View-layout">
                    <div>
                        <span>Đơn hàng hiển thị: </span>
                        <Select defaultValue="6" Option style={{ width: 70 }} onChange={e => ChangeSize(e)}>
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
                        <input placeholder='Nhập số điện thoại của đơn hàng cần tìm' style={{ width: 300 }} /*onChange={e => onChange(e)}*/ />
                    </div>
                </div>
                <Table className="proItem" dataSource={wordSearch} columns={columns} pagination={{ pageSize: `${pageSize}` }} size="middle" />
                {/* <Link to={'/Themnhanvien'}><p className="ant-btn ant-btn-primary" type="primary">Thêm nhân viên</p></Link> */}
            </div>
        </div>
    );
}

export default Order;
