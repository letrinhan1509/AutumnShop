import React from "react";
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, DashboardOutlined, IdcardOutlined } from '@ant-design/icons';
import { MessageOutlined, ProfileOutlined, OrderedListOutlined, UserAddOutlined, LogoutOutlined, SkinOutlined } from '@ant-design/icons';
import { UnorderedListOutlined, FileAddOutlined, PercentageOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "../Components/scss/nav.scss"


const { SubMenu } = Menu;
const Navigation = () => {
    let history = useHistory()
    const link = useHistory();
    const linkto = (e) => {
        link.push(`/${e.key}`);
    }
    const logout = () => {
        //localStorage.removeItem("token")
        localStorage.removeItem("user")
        history.push('/');
        window.location.reload();
    }
    let result = JSON.parse(localStorage.getItem('user'))
    return (
        <>
            <Menu
                /* onClick={this.handleClick} */
                style={{ width: 256, minHeight: 600 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub3', 'sub2']}
                mode="inline"
                onClick={linkto}
                className="nav"
                forceSubMenuRender="true">
                <Menu.Item key="" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
                <SubMenu key="sub2" icon={<IdcardOutlined />} title=" Quản lý tài khoản">
                    <Menu.Item key="danh-sach-khach-hang" icon={<ProfileOutlined />}>Khách hàng</Menu.Item>
                    <Menu.Item key="danh-sach-admin" icon={<ProfileOutlined />}>Nhân viên</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<AppstoreOutlined />} title="Quản lý danh mục">
                    <Menu.Item key="tat-ca-san-pham" icon={<UnorderedListOutlined />} >Danh sách sản phẩm</Menu.Item>
                    <Menu.Item key="danh-sach-loai" icon={<UnorderedListOutlined />} >Danh sách loại</Menu.Item>
                    <Menu.Item key="danh-sach-nha-sx" icon={<UnorderedListOutlined />} >Danh sách nhà sản xuất</Menu.Item>
                    <Menu.Item key="danh-muc-san-pham" icon={<UnorderedListOutlined />}>Danh mục sản phẩm</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<OrderedListOutlined />} title="Quản lý kinh doanh">
                    <Menu.Item key="danh-sach-don-hang" icon={<ProfileOutlined />} >Danh sách đơn hàng</Menu.Item>
                    <SubMenu key="sub5" icon={<PercentageOutlined />} title="Quản lý khuyến mãi">
                        <Menu.Item key="danh-sach-voucher">Danh sách voucher</Menu.Item>
                        <Menu.Item key="danh-sach-khuyen-mai">Danh sách khuyến mãi</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="sub6" icon={<MessageOutlined />} title="Quản lý bình luận">
                    <Menu.Item key="danh-sach-binh-luan">Danh sách các bình luận</Menu.Item>
                </SubMenu>
                <Menu.Item key="bang-size" icon={<SkinOutlined />}>Bảng size quần áo</Menu.Item>
                <SubMenu key="sub8" icon={<SettingOutlined />} title="Cài đặt">
                    <Menu.Item key="tai-khoan" icon={<ProfileOutlined />}>Thông tin tài khoản</Menu.Item>
                    <Menu.Item onClick={logout} icon={<LogoutOutlined />}>Đăng xuất</Menu.Item>
                </SubMenu>
            </Menu>
        </>
    )
}

export default Navigation;