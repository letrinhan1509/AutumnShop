import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form, Input, Button, Select, Checkbox, DatePicker, Space, message, Table, Modal, Radio } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useHistory, Link } from "react-router-dom"
import "Container/scss/addSale.scss";
import moment from 'moment';
import product from 'API_Call/Api_product/product';
import catalog from 'API_Call/Api_catalog/catalog';
import discount from 'API_Call/Api_discount/discount';

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
    const valueOption = useRef(null);
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
    const [title, setTitle] = useState("Hiện");
    const selectTitle = (e) => {
        setTitle(e.target.value);
        console.log(title);
    };

    const addSale = (values) => {
        console.log(moment(datestart).format('YYYY-MM-DD'));

        values["ngaybd"] = moment(datestart).format('YYYY-MM-DD');
        values["ngaykt"] = moment(dateEnd).format('YYYY-MM-DD');
        values["trangthai"] = title;
        values["sanphamCK"] = add;
        console.log(values);

        //const url = "http://127.0.0.1:5000/api/v1/khuyen-mai/them-khuyen-mai/san-pham"
        discount.addSale(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/danh-sach-khuyen-mai');
                }, 1000)
            } else
                message.error(res.data.message);
        })
            .catch(err => {
                console.log(err.response);
                message.error(`${err.response.data.message}\n Tạo khuyến mãi sản phẩm thất bại !`);
            });
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


    const [add, setAdd] = useState([]);
    //const add = [];
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

    //const demo = [];
    const [lenght, setLenght] = useState(0);
    const [id, setID] = useState(0);
    //let id = 0;

    const thempro = () => {
        let tam = id + 1;
        console.log(id);
        let value = []
        let chietkhau = valueOption.current.props.value;
        value['id'] = tam;
        value['sanpham'] = proSelect;
        value['chietkhau'] = chietkhau;
        setAdd([...add, { ...value }]);
        setID(tam);
        //setlistPro([]);
        //document.getElementById("persen").values = "";
    };

    const { confirm } = Modal;
    function showDeleteProduct(item) {
        confirm({
            title: 'Bạn thật sự muốn xóa khuyến mãi này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                setAdd(
                    add.filter((x) => x.id !== item.id)
                );

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách khuyến mãi?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                history.push('/danh-sach-khuyen-mai');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    return (
        <>
            <div className="sale-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin chương trình khuyến mãi</h2>
                <div className="col-box">
                    <div className="col-one">
                        <Form
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={addSale}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="tenkm"
                                label="Tên chương trình"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên chương trình khuyến mãi!',
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
                                <Radio.Group onChange={selectTitle} value={title}>
                                    <Radio value="Hiện">Hiện</Radio>
                                    <Radio value="Ẩn">Ẩn</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button className="ant-btn ant-btn-dashed " onClick={back} style={{ marginLeft: -30 }}>
                                    Trở về
                                </Button>
                                <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                                    Thêm voucher
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="col-two">
                        <Form
                            onFinish={thempro}
                            id="themproduct"
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
                                id="persen"
                                label="Chiết khấu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn chiết khấu!',
                                    },
                                ]}
                            >
                                {/* <Select onChange={plusID}>
                                    {chietkhau.map((item) => {
                                        return (
                                            <>
                                                <Option ref={valueOption} value={item.key}>{item.persen}</Option>
                                            </>
                                        )
                                    })}
                                </Select> */}
                                <Input ref={valueOption} />
                            </Form.Item>
                            <Button onClick={thempro} >Thêm</Button>
                            <Table rowSelection={rowSelection} rowKey={listPro => listPro.masp} dataSource={listPro} columns={columns} pagination={{ pageSize: 5 }} />
                            <Row className="add-sale">
                                {
                                    add !== "" ? (
                                        <>
                                            {add.map((item) => {
                                                return (
                                                    <>
                                                        {/* <Col>
                                                            <Button onClick={() => showDeleteProduct(item)} type="primary" danger>
                                                                <CloseOutlined />
                                                            </Button>
                                                        </Col> */}
                                                        <Col className="box-selected">
                                                            {/* <p>{item.id}</p> */}
                                                            <Row className="title">
                                                                <Col>
                                                                    <Button onClick={() => showDeleteProduct(item)} size="small" type="primary" danger>
                                                                        <CloseOutlined />
                                                                    </Button>
                                                                </Col>
                                                                <Col><span>Chiết khấu: </span>{item.chietkhau}</Col>
                                                            </Row>
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
                                    ) : ("")
                                }
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AddSale;
