import React, { useRef, useEffect } from 'react'
import { message } from 'antd';
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Paypal(props) {
    const paypal = useRef()
    const history = useHistory();
    console.log(props.order);
    let coin = 0;
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
                console.log(bill);
                let values = [];
                if (bill.status === "COMPLETED") {
                    message.success("Ban da thanh toan thanh cong !!!");
                    values['order'] = props.order;
                    values['note'] = props.notes;
                    values['pay'] = props.payValue;
                    values['ship'] = props.ship;
                    if (props.voucher !== null) {
                        values['sumpay'] = props.ship + Number(props.PriceCart) - Number(props.voucher.giagiam);
                        values['makm'] = props.voucher.makm;
                    } else {
                        values['sumpay'] = props.ship + Number(props.PriceCart);
                    }

                    console.log(values);
                    /* const url = "http://localhost:5000/api/v1/don-hang/tao-don-hang";
                    axios
                        .post(url, values)
                        .then(async (res) => {
                            if (res.data.status === "Success") {
                                console.log(values);
                                message.success(res.data.message);
                                localStorage.removeItem("cart");
                                localStorage.removeItem("order");
                                setTimeout(() => {
                                    history.push("/hoan-tat-don-hang");
                                    window.location.reload();
                                }, 1000);
                            } else {
                                message.error("Đạt hàng thất bại, vui lòng đăng nhập để đặt hàng !");
                            }
                        })
                        .catch((err) => {
                            message.error(
                                `Đạt hàng thất bại, vui lòng đăng nhập để đặt hàng ! \n ${err}`
                            );
                        }); */
                    /* const pay = (values) => {
                        
                    }; */
                }
            },
            onError: (err) => {
                console.log(err);
            }
        }).render(paypal.current)
    }, [])

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}
