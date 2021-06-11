import React from "react";
import {  Menu } from 'antd';
import { AppstoreOutlined, AppstoreAddOutlined, SettingOutlined, DashboardOutlined, IdcardOutlined } from '@ant-design/icons';
import { MessageOutlined, ProfileOutlined, OrderedListOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { UnorderedListOutlined, FileAddOutlined, PercentageOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
const { SubMenu } = Menu;
const Navigation = () => {
    let history = useHistory()
    const link = useHistory();
    const linkto = (e)=>{
        link.push(`/${e.key}`);
    }
    const logout = ()=>{
        //localStorage.removeItem("token")
        localStorage.removeItem("user")
        history.push('/');
        window.location.reload();
    }
    let result =JSON.parse(localStorage.getItem('user'))  
    return (
        <>    
            <Router>
                        <Menu
                            /* onClick={this.handleClick} */
                            style={{ width: 256, height: '100%' }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub3', 'sub2']}
                            mode="inline"
                            onClick={linkto}

                            forceSubMenuRender="true">
                            <Menu.Item key="" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
                            <SubMenu key="sub2" icon={<IdcardOutlined />} title=" Quản lý tài khoản">
                                <Menu.Item key="danh-sach-khach-hang" icon={<ProfileOutlined />}>Khách hàng</Menu.Item>
                                <Menu.Item key="danh-sach-admin" icon={<ProfileOutlined />}>Nhân viên</Menu.Item>    
                                {result.permission==='Admin'?( <Menu.Item key="them-nhan-vien" icon={<UserAddOutlined />}>Thêm nhân viên</Menu.Item>):(<p/>)}
                            </SubMenu>
                            <SubMenu key="sub3" icon={<AppstoreOutlined />} title="Quản lý danh mục">
                                <SubMenu key="sub4" icon={<AppstoreOutlined />} title="Quản lý sản phẩm">
                                    <Menu.Item key="tat-ca-san-pham" >Tất cả sản phẩm</Menu.Item>
                                    {result.permission==='Admin'?(<Menu.Item key="them-san-pham" icon={<AppstoreAddOutlined />}>Thêm sản phẩm</Menu.Item>):(<p/>)}
                                </SubMenu>
                                <SubMenu key="sub5" icon={<UnorderedListOutlined />} title="Quản lý loại">
                                    <Menu.Item key="danh-sach-loai" >Danh sách loại</Menu.Item>
                                    {result.permission==='Admin'?(<Menu.Item key="them-loai-san-pham" icon={<FileAddOutlined />}>Thêm loại</Menu.Item>):(<p/>)}
                                </SubMenu>
                                <SubMenu key="sub6" icon={<UnorderedListOutlined />} title="Quản lý nhà sản xuất">
                                    <Menu.Item key ="danh-sach-nha-sx" >Danh sách nhà sản xuất</Menu.Item> 
                                    {result.permission==='Admin'?(<Menu.Item key ="them-nha-san-xuat" icon={<FileAddOutlined />}>Thêm nhà sản xuất</Menu.Item>):(<p/>)}
                                </SubMenu>
                                <SubMenu key="sub7" icon={<UnorderedListOutlined />} title="Quản lý menu">
                                    <Menu.Item key="danh-muc-san-pham" >Danh mục sản phẩm</Menu.Item>
                                    {result.permission==='Admin'?(<Menu.Item key ="them-danh-muc" icon={<FileAddOutlined />}>Thêm danh mục</Menu.Item>):(<p/>)}
                                </SubMenu>
                            </SubMenu>                          
                            <SubMenu key="sub8" icon={<OrderedListOutlined />} title="Quản lý kinh doanh">
                                <Menu.Item key="danh-sach-don-hang">Danh sách đơn hàng</Menu.Item>
                                <SubMenu key="sub9" icon={<PercentageOutlined />} title="Quản lý khuyến mãi">
                                    <Menu.Item key="danh-sach-voucher">Danh sách voucher</Menu.Item>
                                    {result.permission==='Admin'?(<Menu.Item key ="them-voucher" icon={<FileAddOutlined />}>Thêm voucher</Menu.Item>):(<p/>)}
                                    <Menu.Item key="danh-sach-khuyen-mai">Danh sách khuyến mãi</Menu.Item>
                                    {result.permission==='Admin'?(<Menu.Item key ="them-khuyen-mai" icon={<FileAddOutlined />}>Thêm khuyến mãi</Menu.Item>):(<p/>)}
                                </SubMenu>
                            </SubMenu>
                            <SubMenu key="sub10" icon={<MessageOutlined />} title="Quản lý bình luận">
                                <Menu.Item key="danh-sach-binh-luan">Danh sách các bình luận</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub20" icon={<SettingOutlined />} title="Cài đặt">
                                <Menu.Item key="thong-tin-tai-khoan" icon={<ProfileOutlined />}>Thông tin tài khoản</Menu.Item>
                                <Menu.Item onClick={logout} icon={<LogoutOutlined />}>Đăng xuất</Menu.Item>
                            </SubMenu>
                            
                        </Menu>
            </Router>
        </>
    )
}

export default Navigation;