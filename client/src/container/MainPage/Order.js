import React, { useState, useEffect } from 'react';
import { Image, Row, Col, Input, Button, message, Select, Table } from 'antd';
import Meta from "antd/lib/card/Meta";
import { useHistory, Link } from "react-router-dom";
import "container/components-css/order.scss";
import order from 'API_Call/Api_order/order';

const { TextArea } = Input;
const { Option } = Select;
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
const Order = (props) => {
    const link = useHistory();
    const [ListOrder, setListOrder] = useState([]);
    //API Customer order list :
    useEffect(() => {
        order.getUserID(user.makh).then((res) => {
            setListOrder(res.data.data);
            setWordSearch(res.data.data);
        })
    }, []);
    console.log(ListOrder);


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


    const [orderList, setOrderList] = useState([]);
    const loadDetail = (e) => {
        let i = e.currentTarget.dataset.id;
        console.log(i);

        order.getOrderID(i).then((res) => {
            if (res.data.status === "Success") {
                console.log(res.data.data[0]);
                localStorage.setItem('orderList', JSON.stringify(res.data.data[0]));
                setTimeout(() => {
                    link.push('/don-hang/chi-tiet');
                }, 100)
            }
        })

    }

    const cancelOrder = (e) => {
        let i = e.currentTarget.dataset.id;
        console.log(i);

        order.cancelOrder(i).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message);
                setTimeout(() => {
                    link.replace('/don-hang');
                }, 400);
            } else {
                message.error(res.data.message);
            }
        }).catch(err => {
            message.error(`${err.response.data.message}`);
        });
    }

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
            render: ngaydat => {
                var date = new Date(ngaydat);
                return (
                    date.toLocaleDateString()
                );
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'tentt',
            key: 'tentt',
        },
        {
            title: 'Mã nhân viên',
            dataIndex: 'manv',
            key: 'manv',
        },
        {
            dataIndex: "madonhang",
            key: "madonhang",
            render: madonhang => (<Button className="detail-btn" data-id={madonhang} onClick={loadDetail} type="primary">Chi tiết</Button>)
        }

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
                    <div className="btn-wrapper" >
                        <Button type="primary">
                            Đơn hàng COD
                        </Button>
                        <Button type="primary">
                            Đơn hàng GHTK
                        </Button>
                    </div>
                </div>
                <Table className="proItem" dataSource={wordSearch} columns={columns} pagination={{ pageSize: `${pageSize}` }} size="middle" />
                {/* <Link to={'/Themnhanvien'}><p className="ant-btn ant-btn-primary" type="primary">Thêm nhân viên</p></Link> */}
            </div>
        </div>
    );
}

export default Order;
