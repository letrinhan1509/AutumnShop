import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, message, DatePicker, Radio, Modal, Table } from 'antd';
import Meta from "antd/lib/card/Meta";
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import orders from 'API_Call/Api_order/order';
import moment from 'moment';

const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 22,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 20,
        },
        sm: {
            span: 15,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 9,
        },
    },
};
const EditSale = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { confirm } = Modal;
    const saleID = JSON.parse(localStorage.getItem("saleID"));
    var dateBD = new Date(saleID.ngaybd);
    var dateKT = new Date(saleID.ngaykt);
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");

    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách voucher?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                localStorage.removeItem("saleID");
                history.push('/danh-sach-khuyen-mai');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    function startChange(date) {
        if (saleID !== null) {
            setDateStart(date._d);
        }
    }
    function endChange(date) {
        if (saleID !== null) {
            setDateEnd(date._d);
        }
    }

    const update = (values) => {
        if (dateStart !== "" && dateEnd !== "") {
            values["ngaybd"] = moment(dateStart).format('YYYY-MM-DD');
            values["ngaykt"] = moment(dateEnd).format('YYYY-MM-DD');
        } else {
            values["ngaybd"] = moment(dateBD).format('YYYY-MM-DD');
            values["ngaykt"] = moment(dateKT).format('YYYY-MM-DD');
        }
        values["trangthai"] = title;
        console.log(values);
        /* orders.updateStatus(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                localStorage.removeItem("order");
                setTimeout(() => {
                    history.push('/danh-sach-khuyen-mai');
                }, 2000)
            }
        })
            .catch(err => {
                message.error(`${err.response.data.message}\n Cập nhật đơn hàng thất bại! `);
            }) */
    };
    const [datePickers, setDatePickers] = useState(false);
    const changeDate = () => {
        if (dateStart !== "" || dateEnd !== "") {
            setDateStart("");
            setDateEnd("");
        }
        setDatePickers(!datePickers);
    };

    const [title, setTitle] = useState(saleID.trangthai);
    const selectTitle = (e) => {
        setTitle(e.target.value);
        console.log(title);
    };
    console.log(title);
    const columns = [
        {
          title: 'Mã khuyến mãi',
          dataIndex: 'makm',
          key: 'makm',
        },
        {
          title: 'Chiết khấu',
          dataIndex: 'chietkhau',
          key: 'chietkhau',
        },
        {
            title: 'Mã sản phẩm',
            dataIndex: 'masp',
            key: 'masp',
        },
        {
            title: 'Giá khuyến mãi',
            dataIndex: 'giakm',
            key: 'giakm'
          },
      ];

    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}> Chỉnh sửa thông tin Khuyến mãi</h2>
            <Form
                {...formItemLayout}
                form={form}
                name="update"
                onFinish={update}
                scrollToFirstError
                className="register-form"
                initialValues={{
                    makm: `${saleID.makm}`,
                    tenkm: `${saleID.tenkm}`,
                    ghichu: `${saleID.ghichu}`,
                }}
            >
                <Form.Item
                    name="makm"
                    label="Mã khuyến mãi"
                    rules={[
                        {
                            type: 'string',
                            message: 'Mã khuyến mãi không được để trống!',
                        },
                        {
                            //required: true,
                            message: 'Điền mã khuyến mãi',
                        },
                    ]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="tenkm"
                    label="Tên khuyến mãi"
                    rules={[
                        {
                            type: 'string',
                            message: 'Mã khuyến mãi không được để trống!',
                        },
                        {
                            //required: true,
                            message: 'Điền mã khuyến mãi',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="ghichu"
                    label="Ghi chú"
                    rules={[
                        {
                            type: 'string',
                            message: 'Mã khuyến mãi không được để trống!',
                        },
                        {
                            //required: true,
                            message: 'Điền mã khuyến mãi',
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
                    {datePickers === false ? (<span>{dateBD.toLocaleDateString()}</span>) : (<DatePicker onChange={startChange} />)}
                    <Button type="primary" onClick={changeDate} style={{ marginLeft: 10 }}>Đổi</Button>
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
                    {datePickers === false ? (<span>{dateKT.toLocaleDateString()}</span>) : (<DatePicker onChange={endChange} />)}
                </Form.Item>
                <Form.Item
                    label="Trạng thái"
                >
                    <Radio.Group onChange={selectTitle} value={title}>
                        <Radio value={1}>Hiện</Radio>
                        <Radio value={0}>Ẩn</Radio>
                    </Radio.Group>
                </Form.Item>
                <Table className="item" dataSource={saleID.chitietKM} rowKey="uid" columns={columns} pagination={{ pageSize: `5` }} style={{ padding: 10 }} size="middle" />
                <Form.Item {...tailFormItemLayout}>
                    <Button className="ant-btn ant-btn-dashed" onClick={back} style={{ marginLeft: -30 }}>
                        Trở về
                    </Button>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditSale;
