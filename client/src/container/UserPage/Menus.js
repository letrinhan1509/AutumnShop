import React, { useState } from 'react';
import { Menu } from 'antd';
import { EditOutlined, ProfileOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import "container/components-css/Form.scss";


const Menus = (props) => {
    const history = useHistory();

    const [current, setCurrent] = useState("thong-tin-tai-khoan");
    const handClick = (e) => {
        history.push(`/${e.key}`);
    }

    return (
        <Menu
            onClick={handClick}
            selectedKeys={props.url}
        >
            <Menu.Item key="thong-tin-tai-khoan" icon={<ProfileOutlined />}>
                Thông tin tài khoản
            </Menu.Item>
            <Menu.Item key="thong-tin-tai-khoan/chinh-sua-thong-tin" icon={<EditOutlined />}>
                Chỉnh sửa thông tin
            </Menu.Item>
            <Menu.Item key="thong-tin-tai-khoan/doi-mat-khau" icon={<EditOutlined />}>
                Đổi mật khẩu
            </Menu.Item>
        </Menu>

    );
}

export default Menus;
