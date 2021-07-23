import React, { useRef, useEffect } from 'react'
import { message } from 'antd';
import ORDER from 'API_Call/Api_order/order';
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Paypal(props) {
    const paypal = useRef()
    const history = useHistory();
    console.log(props.order);
    let coin = 0;
    let thongbao = "";
    if (props.voucher !== null) {
        coin = ((props.ship + Number(props.PriceCart) - Number(props.voucher.giagiam)) / 23000).toFixed(2);
    } else {
        coin = ((props.ship + Number(props.PriceCart)) / 23000).toFixed(2);
    }

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Cool looking table",
                            amount: {
                                currency_code: "USD",
                                value: 1.00,
                            },
                        },
                    ],
                });
            },
            onApprove: async (data, actions) => {
                message.loading("Dang su li...");
                const bill = await actions.order.capture();
                if (bill.status === "COMPLETED") {
                    message.success("Ban da thanh toan thanh cong !!!");
                    console.log(bill.status);
                    let values = [];
                    values['order'] = props.order;
                    values['note'] = props.notes;
                    values['pay'] = props.payValue;
                    values['ship'] = props.ship;
                    values['delivery'] = props.deliveryValue;
                    if (props.voucher !== null) {
                        values['sumpay'] = props.ship + Number(props.PriceCart) - Number(props.voucher.giagiam);
                        values['makm'] = props.voucher.makm;
                    } else {
                        values['sumpay'] = props.ship + Number(props.PriceCart);
                    }
                    const url = "http://localhost:5000/api/v1/don-hang/tao-don-hang";
                    console.log(values);
                    axios
                      .post(url,{ value: values})
                        .then(async (res) => {
                            if (res.data.status === "Success") {
                                message.success(res.data.message);
                                localStorage.removeItem("cart");
                                localStorage.removeItem("order");
                                setTimeout(() => {
                                    history.push("/hoan-tat-don-hang");
                                    window.location.reload();
                                }, 1000);
                            } else {
                                console.log(res);
                                message.error("Đạt hàng thất bại!");
                            }
                        })
                        .catch((err) => {
                            message.error(
                                `Đạt hàng thất bạiiiiiiii! \n ${err.response.data.message}`
                            );
                        });
                }

            },
            onError: (err) => {
                console.log(err);
            }
        }).render(paypal.current)
    }, [])

    return (
        <div>
            <div htmlType="submit" ref={paypal}></div>
        </div>
    )
}
