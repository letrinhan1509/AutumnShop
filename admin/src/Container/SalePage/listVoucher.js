import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, message, Table, Tag, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import "Container/scss/addpro.scss";
import voucher from 'API_Call/Api_discount/discount';

const { Option } = Select;
const ListVoucher = (props) => {
    const [listVoucher, setListVoucher] = useState([]);
    const [a, setA] = useState([]);
    const history = useHistory();
    let user = JSON.parse(localStorage.getItem('user'));

    //API List Voucher:
    useEffect(() => {
        voucher.getAllVoucher().then((res) => {
            setListVoucher(res.data.voucher);
            setWordSearch(res.data.voucher);
        })
    }, []);
    // Sửa voucher:
    const loadEdit = (e) => {
        let id = e.currentTarget.dataset.id;
        console.log(id);
        setA(id);
        console.log(a);
        setTimeout(() => {
            history.push('/danh-sach-voucher/sua-voucher');
        }, 100)
    }
    const [voucherID, setVoucherID] = useState([]);
    useEffect(() => {
        if (a != "") {
            voucher.getVoucherID(a).then((res) => {
                setVoucherID(res.data.voucher);
            });
        }
    }, [a]);
    if (voucherID != '') {
        localStorage.setItem('voucherID', JSON.stringify(voucherID));
    }
    //Cập nhật trạng thái Voucher:
    const unlock = (e) => {
        let id = e.currentTarget.dataset.id;
        //console.log("Id:", id);
        let values = { makm: id, trangthai: 1 };
        voucher.updateSaleStatus(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.go({ pathname: '/danh-sach-voucher' });
                }, 1000);
            }
            else {
                message.error(res.data.message);
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Lỗi...! Mở khoá tài khoản thất bại!\n ${err.response.data.message}`);
            });
    }
    const lock = (e) => {
        let id = e.currentTarget.dataset.id;
        //console.log("Id:", id);
        let values = { makm: id, trangthai: 0 };
        voucher.updateSaleStatus(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message);
                setTimeout(() => {
                    history.go('/danh-sach-voucher');
                }, 1000);
            }
            else {
                message.error(res.data.message);
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`${err.response.data.message}`);
            });
    };



    //Setup trạng thái cho datatable
    listVoucher.forEach(element => {
        if (element.trangthai === 1) {
            element.trangthai = [];
            element.trangthai.stt = ["Hoạt động"];
            element.trangthai.id = element.makm;
        }
        if (element.trangthai === 0) {
            element.trangthai = [];
            element.trangthai.stt = ["Khoá"];
            element.trangthai.id = element.makm;
        }
    })

    const columns = [
        {
            title: 'Mã khuyến mãi',
            dataIndex: 'makm',
            key: 'makm',
        },
        {
            title: 'Tên khuyến mãi',
            dataIndex: 'tenkm',
            key: 'tenkm',
        },
        {
            title: 'Mã voucher',
            dataIndex: 'voucher',
            key: 'voucher',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'ghichu',
            key: 'ghichu',
        },
        {
            title: 'Điều kiện',
            dataIndex: 'dieukien',
            key: 'dieukien',
        },
        {
            title: 'Giá giảm',
            dataIndex: 'giagiam',
            key: 'giagiam',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'ngaybd',
            key: 'ngaybd',
            render: ngaybd => {
                var date = new Date(ngaybd);
                return(
                    date.toLocaleDateString()
                );
            }
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'ngaykt',
            key: 'ngaykt',
            render: ngaykt => {
                var date = new Date(ngaykt);
                return(
                    date.toLocaleDateString()
                );
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangthai',
            key: 'trangthai',
            render: (trangthai) => (
                <>
                    {trangthai.stt.map(tragth => {
                        let color = 'green';
                        if (tragth === 'Khoá') {
                            color = 'red';
                        }
                        return (
                            <Tag color={color} key={tragth}>
                                {tragth.toUpperCase()}
                            </Tag>
                        );
                    })}

                </>
            ),
            filters: [
                { text: "Khoá", value: "Khoá" },
                { text: "Hoạt động", value: "Hoạt động" },
            ],
            onFilter: (value, record) => record.trangthai.stt.includes(value),
        },
        user.permission === 'Admin' ? (
            {
                dataIndex: 'trangthai',
                data: 'makh',
                key: 'trangthai',
                render: (trangthai) => //(<Button data-id={text} type="primary" icon={<LockOutlined />} /* onClick={linkto} */></Button>)
                (
                    <>
                        {trangthai.stt.map(tragth => {
                            if (tragth === 'Khoá') {
                                return (
                                    <Button data-id={trangthai.id} type="primary" icon={<UnlockOutlined />} onClick={unlock}>
                                    </Button>
                                );
                            } else {
                                return (
                                    <Button data-id={trangthai.id} type="danger" icon={<LockOutlined />} onClick={lock}>
                                    </Button>
                                )
                            }
                        })}
                    </>
                )
            }) : (<> </>),
            user.permission === 'Admin' ? ({
            dataIndex: "voucher",
            key: "voucher",
            render: voucher => (<div className="btn-box fix"><Button data-id={voucher} onClick={loadEdit} type="primary">Cập nhật</Button></div>)
        }) : (<> </>)
    ];


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
    let demo = listVoucher;
    const [wordSearch, setWordSearch] = useState([]);
    /* function onChange(e) {
      if (e.target.value !== "") {
        let filter = filterItems(ListUser, e.target.value);
        if (filter !== "") {
          demo = filter;
          setWordSearch(demo);
        } else {
          demo = ListUser;
          setWordSearch(demo);
        }
      } else {
        demo = ListUser;
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

    return (
        <>
            <div className="product-wrapper">
                <h2 style={{ textAlign: 'center', marginTop: "50px" }}>DANH SÁCH VOUCHER</h2>
                <div className="View-layout">
                    <div>
                        <span>Voucher hiển thị: </span>
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
                        <input placeholder='Nhập tên voucher' style={{ width: 300 }} /*onChange={e => onChange(e)}*/ />
                    </div>
                </div>
                <Table className="proItem" dataSource={wordSearch} columns={columns} pagination={{ pageSize: `${pageSize}` }} size="middle" />
                <div className="btn-wrapper">
                    <Link to={'/them-voucher'}>
                        <Button type="primary">
                            Thêm chương trình khuyến mãi
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ListVoucher;