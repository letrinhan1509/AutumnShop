import React, { useState, useEffect } from 'react';
import { Image, Row, Col, Input, Button, message, Select, Table } from 'antd';
import Meta from "antd/lib/card/Meta";
import { useHistory, Link } from "react-router-dom";
import "Container/scss/addpro.scss";
import order from 'API_Call/Api_order/order';

const { TextArea } = Input;
const { Option } = Select;
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
const ListOrder = (props) => {
    const link = useHistory();
    const [ListOrder, setListOrder] = useState([]);
    const [a, setA] = useState([]);
    //API List Order:
    useEffect(() => {
        order.getAll().then((res) => {
            setListOrder(res.data.data);
            setWordSearch(res.data.data);
        })
    }, []);


    //Redirect sua-san-pham 
    const loadDetail = (e) => {
        let id = e.currentTarget.dataset.id;
        order.getOrderID(id).then((res) => {
            if (res.data.status === "Success") {
                localStorage.setItem('order', JSON.stringify(res.data.data));
                setTimeout(() => {
                    link.push('/danh-sach-don-hang/chi-tiet');
                }, 100)
            }
        })
    }
    const loadEdit = (e) => {
        let id = e.currentTarget.dataset.id;
        order.getOrderID(id).then((res) => {
            if (res.data.status === "Success") {
                localStorage.setItem('order', JSON.stringify(res.data.data));
                setTimeout(() => {
                    link.push('/danh-sach-don-hang/sua-don-hang');
                }, 100)
            }
        })
    }

    //Tìm kiếm
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



    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'madonhang',
            key: 'madonhang',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'tenkh',
            key: 'tenkh',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sodienthoai',
            key: 'sodienthoai',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'tongtien',
            key: 'tongtien',
        },
        {
            title: 'Hình thức',
            dataIndex: 'hinhthuc',
            key: 'hinhthuc',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'ngaydat',
            key: 'ngaydat',
            render: ngaydat => {
                var date = new Date(ngaydat);
                return(
                    date.toLocaleDateString()
                );
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'tentt',
            key: 'tentt',
        },
        user.permission === "Admin" || user.permission === "NVBH" ? (
        {
            dataIndex: "madonhang",
            key: "madonhang",
            render: madonhang => (<div className="btn-box fix"><Button data-id={madonhang} onClick={loadEdit} type="primary">Sửa</Button></div>)
        }) : (<></>),
        {
            dataIndex: "madonhang",
            key: "madonhang",
            render: madonhang => (<div className="btn-box"><Button data-id={madonhang} onClick={loadDetail} type="primary">Chi tiết</Button></div>)
        }
    ];

    return (
        <div className="product-wrapper" >
            <h2 style={{ textAlign: 'center', marginTop: "20px", marginBottom: "20px" }}>DANH SÁCH ĐƠN HÀNG</h2>
            <div className="View-layout">
                <div>
                    <span>Đơn hàng hiển thị: </span>
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
                {/* <div className="btn-wrapper" >
                    <Button type="primary">
                        Đơn hàng GHTK
                    </Button>
                </div> */}
            </div>
            <Table className="proItem" dataSource={wordSearch} columns={columns} pagination={{ pageSize: `${pageSize}` }} size="middle" />
            {/* <Link to={'/Themnhanvien'}><p className="ant-btn ant-btn-primary" type="primary">Thêm nhân viên</p></Link> */}
        </div>
    );
}

export default ListOrder;
