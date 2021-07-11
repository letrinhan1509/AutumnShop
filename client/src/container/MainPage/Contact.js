import React from "react";
import { useHistory } from "react-router-dom";
import "container/components-css/Register.scss";
import "container/components-css/contact.scss";
import { Form, Input, Button, message } from "antd";
import emailjs from "emailjs-com";
//const swal = require('react-swal');


const layout = {
  labelCol: {
    span: 10,

  },
  wrapperCol: {
    span: 8,
  },

};

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} không khả dụng !',
    number: '${label} không khả dụng!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */



const Contact = () => {
  const history = useHistory();
  function sendemail(e) {
    e.preventDefault();
    emailjs.sendForm('service_fprwdeo', 'template_oqkdp1f', e.target, 'user_I5dii50iWFXQYsKXb4w4W')
      .then((result) => {
        console.log(result.text);
        message.success("Bạn đã gửi Email thành công !!!");
        setTimeout(() => {
          history.push("/");
        }, 1000);
      }, (error) => {
        console.log(error.text);
      });
  }
  return (

    <div className="wrapper">
      <div className="form" >
        <div className="text-contact"> <h1> CONTACT US </h1></div>
        <Form {...layout} onSubmitCapture={sendemail} name="nest-messages">
          <div className="name">Name</div>
          <Form.Item
            name="name"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 2) {
                    return Promise.reject(new Error('Vui lòng nhập đúng!'));
                  }
                },
              },
            ]}
          >
            <Input name="name" />
          </Form.Item>
          <div className="name">Email</div>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input name="email" />
          </Form.Item>
          <div className="name">Subject</div>
          <Form.Item name="subject">
            <Input name="subject"/>
          </Form.Item>
          <div className="mess">Message</div>
          <Form.Item name="message" >
            <Input.TextArea style={{ height: '100px', width: '400px' }} name="message"/>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 1, span: 5 }} >
            <Button type="submit" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>



  );

};


export default Contact;


