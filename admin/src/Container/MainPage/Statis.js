import React, { useState, useEffect } from 'react';
import { Image, Row, Col, Input, Button, message, Select, Table, Form, Modal } from 'antd';
import Meta from "antd/lib/card/Meta";
import moment from 'moment';
import { useHistory, Link } from "react-router-dom";
import "Container/scss/addpro.scss";
import order from 'API_Call/Api_order/order';
import ghn from 'API_Call/Api_city/city';

const { TextArea } = Input;
const { Option } = Select;
const user = JSON.parse(localStorage.getItem("user"));
const Statis = (props) => {
    const [form] = Form.useForm();
    const link = useHistory();
    const [ListOrder, setListOrder] = useState([]);
    const [wordSearch, setWordSearch] = useState([]);
    const [pickUp, setPickUp] = useState([]);
    //API List Order:
    useEffect(() => {
        order.getAll().then((res) => {
            setListOrder(res.data.data);
            setWordSearch(res.data.data);
            console.log(res.data.data);
        })
        ghn.getAll_pickShiftGHN().then((res) => {
            setPickUp(res.data.pickShift);
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

    //Tìm kiếm
    function removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    function filterItems(arr, query) {
        return arr.filter(function (el) {
            if (removeAccents(el.tenkh.toLowerCase()).indexOf(removeAccents(query.toLowerCase())) !== -1) {
                return el;
            } else {
                return "";
            }
        });
    }
    let demo = ListOrder;
    function onChange(e) {
        if (e.target.value !== "") {
            let filter = filterItems(ListOrder, e.target.value);
            if (filter !== "") {
                demo = filter;
                setWordSearch(demo);
            } else {
                demo = ListOrder;
                setWordSearch(demo);
            }
        } else {
            demo = ListOrder;
            setWordSearch(demo);
        }
        console.log(demo);
    }
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

    const [visible, setVisible] = useState(false);
    const [oderDetail, setOderDetail] = useState([]);
    const [service, setService] = useState([]);
    const TurnOn_GHN = (e) => {
        let id = e.currentTarget.dataset.id;
        order.getOrderID(id).then((res) => {
            if (res.data.status === "Success") {
                setOderDetail(res.data.data);
                console.log(res.data.data);
                let disID = JSON.parse(res.data.data.chitiet);
                ghn.getAll_ServiceGHN(disID.DistrictID).then((res) => {
                    setService(res.data.service);
                })
            }
            setVisible(true)
        });
    }

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
            title: 'Vận chuyển',
            dataIndex: 'vanchuyen',
            key: 'vanchuyen',

        },
        {
            title: 'Ngày đặt',
            dataIndex: 'ngaydat',
            key: 'ngaydat',
            render: ngaydat => {
                return (
                    moment(ngaydat).format('DD/MM/YYYY')
                );
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'tentt',
            key: 'tentt',
        },
        {
            dataIndex: "madonhang",
            key: "madonhang",
            render: madonhang => (<div className="btn-box"><Button data-id={madonhang} onClick={loadDetail} type="primary">Chi tiết</Button></div>)
        }
    ];

    const Months = [
        {
            key: 1,
            value: "01"
        },
        {
            key: 2,
            value: "02"
        },
        {
            key: 3,
            value: "03"
        },
        {
            key: 4,
            value: "04"
        },
        {
            key: 5,
            value: "05"
        },
        {
            key: 6,
            value: "06"
        },
        {
            key: 7,
            value: "07"
        },
        {
            key: 8,
            value: "08"
        },
        {
            key: 9,
            value: "09"
        },
        {
            key: 10,
            value: "10"
        },
        {
            key: 11,
            value: "11"
        },
        {
            key: 12,
            value: "12"
        },
    ];

    const [months, setMonths] = useState([]);
    const changeMonths = (e) => {
        setMonths(e);
    }
    const [years, setYears] = useState("");
    const changeYears = (e) => {
        setYears(e.target.value);
    }
    const searchStatis = () => {
        let values = [];
        values['month'] = months;
        values['year'] = years;
        console.log(values);
        /* order.statistical(values).then((res) => {
            if (res.data.status === "Success") {
                setWordSearch(res.data.data);
                console.log(res.data.data);
            }
            //setVisible(true)
        }); */
    }
                    

    return (
        <>
            <div className="product-wrapper" >
                <h2 style={{ textAlign: 'center', marginTop: "20px", marginBottom: "20px" }}>DANH SÁCH THỐNG KÊ</h2>
                <div className="search-statis">
                    <div className="search1">
                        <span>Nhập tháng: </span>
                        <Select Option style={{ width: 70 }} onChange={changeMonths}>
                            {Months.map((item) => {
                                return (
                                    <>
                                        <Option value={item.value}>{item.value}</Option>
                                    </>
                                )
                            })}
                        </Select>
                    </div>
                    <div className="search2">
                        <span>Nhập năm: </span>
                        <Input style={{width: 100}} onChange={changeYears}/>
                    </div>
                    <Button onClick={searchStatis} type="primary">Tìm</Button>
                    {/* <div className="search-box">
                        <span>Tìm kiếm: </span>
                        <input placeholder='Nhập tên voucher' style={{ width: 300 }} onChange={e => onChange(e)} />
                    </div> */}
                </div>
                <Table className="proItem" dataSource={wordSearch} columns={columns} pagination={{ pageSize: `${pageSize}` }} size="middle" />
            </div> 
        </>
    );
}

export default Statis;
