import React, { useRef, useEffect, useState } from 'react'
import { message } from 'antd';
import ORDER from 'API_Call/Api_order/order';
import { useHistory } from "react-router-dom";
import axios from "axios";

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
    const payment = JSON.parse(localStorage.getItem("payment"));

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
                message.loading("Dang xu li...");
                const bill = await actions.order.capture();
                console.log(bill);
                console.log(actions);

                if (bill.status === "COMPLETED") {
                    message.success("Ban da thanh toan thanh cong !!!");
                    const url = "http://localhost:5000/api/v1/don-hang/";
                    return axios.post(url,payment)
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
                            console.log(err);
                            message.error(
                                `iiiiiiii! \n ${err.response.data.message}`
                            );
                        });
                }

            },
            onError: (err) => {
                console.log(err);
            }
        }).render(paypal.current)
    }, [payment, coin])

    return (
        <div>
            <div htmlType="submit" ref={paypal}></div>
        </div>
    )
}
