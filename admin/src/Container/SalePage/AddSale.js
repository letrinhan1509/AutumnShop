import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, Select, Checkbox, DatePicker, Space, message, Table, Radio } from 'antd';
import { useHistory, Link } from "react-router-dom"
import "Container/scss/addSale.scss";
import moment from 'moment';
import product from 'API_Call/Api_product/product';
import catalog from 'API_Call/Api_catalog/catalog';

const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        xs: { span: 22 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 20 },
        sm: { span: 15 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 22,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


const AddSale = (props) => {

    const [form] = Form.useForm();
    const history = useHistory();

    const [datestart, setDatestart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    //let a = "";
    function startChange(date) {
        if (date !== null) {
            setDatestart(date._d);

        }
    }
    function endChange(date) {
        if (date !== null) {
            setDateEnd(date._d);
        }
    }
    const [title, setTitle] = useState(true);
    const changett = (e) => {
        setTitle(e.target.value);
    };

    const addProduct = (values) => {
        console.log(datestart.toLocaleDateString());
        values["ngaybd"] = moment(datestart.toLocaleDateString()).format('YYYY-DD-MM');
        values["ngaykt"] = moment(dateEnd.toLocaleDateString()).format('YYYY-DD-MM');
        values["trangthai"] = title;
        values["sanphamCK"] = add;
        console.log(values);

        /* const url = "http://127.0.0.1:5000/api/v1/khuyen-mai/them-voucher"
        axios.post(url, values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/danh-sach-voucher');
                }, 1000)
            } else
                message.error(res.data.message);
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Tạo voucher thất bại !\n ${err.response.data.message}`)
            }); */
    };

    const [listTypes, setListTypes] = useState([]);
    const [listPro, setlistPro] = useState([]);
    useEffect(() => {
        catalog.getAllType().then((res) => {
            setListTypes(res.data.data);
        })
    }, []);
    //Hiển thị loại theo danh mục
    const getSP = (e) => {
        let id = "";
        id = e;
        console.log(id);
        product.getLoai(id).then((res) => {
            setlistPro(res.data.data);

        })
        console.log(listPro);
    };


    const columns = [
        {
            title: 'Mã',
            dataIndex: 'masp',
            key: 'masp',
        },
        {
            title: 'Tên',
            dataIndex: 'tensp',
            key: 'tensp',
        },
        /* {
            title: 'Ảnh',
            dataIndex: 'hinh',
            key: 'hinh',
            render: text => <img src={text} width={70} />,
        }, */
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
            title: 'Giá',
            dataIndex: 'gia',
            key: 'gia',
        },
        {
            title: 'Màu',
            dataIndex: 'mau',
            key: 'mau',
        },
    ];

    const chietkhau = [
        {
            key: 1,
            persen: '20%',

        },
        {
            key: 2,
            persen: '30%',
        },
        {
            key: 3,
            persen: '40%',
        },
    ];

    const [add, setAdd] = useState([]);
    let proSelect = [];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            proSelect = selectedRows;
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selectedRows, changeRows) => {
            console.log(changeRows);
            //proSelect = changeRows;
        },
    };

    let demo = [];
    const thempro = (value) => {
        console.log(proSelect);
        value['sanpham'] = proSelect;
        console.log(value);
        /*         demo.push(value);
                console.log(demo); */
        setAdd([...add, value]);
        console.log(add);
    };

    const lick = () => {

        console.log(demo);

        console.log(add);
    };

    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin voucher</h2>
                <div className="col-wrapper">
                    <div className="col-one">
                        <Form
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={addProduct}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="tenkm"
                                label="Tên khuyến mãi"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên khuyến mãi!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="dieukien"
                                label="Điều kiện"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập điều kiện !',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="giagiam"
                                label="Giá giảm"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập giá được giảm!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="ghichu"
                                label="Ghi chú"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập ghi chú cho khuyến mãi này !',
                                    },
                                ]}
                            >
                                <TextArea rows={3} />
                            </Form.Item>
                            <Form.Item
                                label="Ngày bắt đầu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn ngày bắt đầu!',
                                    },
                                ]}
                            >
                                <DatePicker onChange={startChange} />
                            </Form.Item>
                            <Form.Item
                                label="Ngày kết thúc"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn ngày kết thúc!',
                                    },
                                ]}
                            >
                                <DatePicker onChange={endChange} />
                            </Form.Item>
                            <Form.Item
                                label="Trạng thái"
                            >
                                <Checkbox onChange={changett} value="1">Hiện</Checkbox>
                                <Checkbox onChange={changett} value="0">Ẩn</Checkbox>
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Link to={'/danh-sach-voucher'} >
                                    <Button className="ant-btn ant-btn-dashed " htmlType="submit" style={{ marginLeft: -30 }}>
                                        Trở về
                                    </Button>
                                </Link>
                                <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                                    Thêm voucher
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="col-two">
                        <Form
                            onFinish={thempro}
                        >
                            <Form.Item
                                label="Sản phẩm khuyến mãi"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn loại sản phẩm!',
                                    },
                                ]}
                            >
                                <Select onChange={getSP}>
                                    {listTypes.map((item) => {
                                        return (
                                            <>
                                                <Option value={item.maloai}>{item.tenloai}</Option>
                                            </>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="chietkhau"
                                label="Chiết khấu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn chiết khấu!',
                                    },
                                ]}
                            >
                                <Select>
                                    {chietkhau.map((item) => {
                                        return (
                                            <>
                                                <Option value={item.key}>{item.persen}</Option>
                                            </>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Button htmlType="submit">Thêm</Button>
                            <Table rowSelection={rowSelection} rowKey={listPro => listPro.masp} dataSource={listPro} columns={columns} pagination={{ pageSize: 5 }} />
                            <Row>
                                {add !== "" ? (
                                    <>
                                        {add.map((item) => {
                                            return (
                                                <>
                                                    <Col className="box">
                                                        <Row className="title"><span>Chiết khấu: </span>{item.chietkhau}</Row>
                                                        {item.sanpham.map((sp) => {
                                                            return (
                                                                <Row className="product-inf">
                                                                    <Col><span>Mã: </span>{sp.masp}</Col>
                                                                    <Col><span>Tên: </span>{sp.tensp}</Col>
                                                                    <Col><span>Số lượng: </span>{sp.soluong}</Col>
                                                                    <Col><span>Size: </span>{sp.size}</Col>
                                                                    <Col><span>Giá: </span>{sp.gia}</Col>
                                                                    <Col><span>Màu: </span>{sp.mau}</Col>
                                                                </Row>
                                                            );
                                                        })}
                                                    </Col>
                                                </>
                                            );
                                        })}
                                    </>
                                ) : ("")}
                            </Row>

                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AddSale;
