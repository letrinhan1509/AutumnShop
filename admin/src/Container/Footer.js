import { Row,Divider } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React from 'react';


const footer = () => {
    return (
        <Footer className="footer" >
            <Row>
                
            <Divider className="driver" />
            <p>
                Trường Đại Học Công Nghệ Sài Gòn <br />
                Địa chỉ: 180 Cao Lỗ, Phường 4, Quận 8, Tp.HCM
            </p>
            </Row>
            
          
        </Footer>
    );

};
export default footer;