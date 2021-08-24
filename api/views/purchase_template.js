exports.Purchase = (data) => {

    return `
        <!DOCTYPE html>
        <html lang="en" style="margin: 0; padding: 0;">

        <head>
            <title>Xin kính chào quý khách !</title>
        </head>

        <body style="margin: 0; padding: 0;">
            <br />
            <div>Rất cảm ơn bạn đã tin tưởng và lựa chọn sản phẩm thời trang của cửa hàng chúng tôi.</div>
            <div>Shop mong rằng bạn sẽ có những trải nghiệm tuyệt vời khi sử dụng sản phẩm.</div>
            <br />
            <div>
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; THÔNG TIN ĐƠN HÀNG
            </div>
            <div>
               Mã đơn hàng: ${data.madonhang}, <br />
               Tên khách hàng: ${data.tenkh}, <br />
               Email: ${data.email}, <br />
               Số điện thoại: ${data.sodienthoai}, <br />
               Địa chỉ: ${data.diachi}, <br />
               Tiền ship: ${data.tienship}, <br />
               Tổng tiền thanh toán: ${data.tongtien}, <br />
               Ngày đặt hàng: ${data.ngaydat},
            </div>
            <br />
            <div>
                Quý khách cũng có thể gửi phản hồi về chất lượng sản phẩm, thái độ phục vụ của nhân viên 
                qua gmail của shop: autumnshop180@gmail.com hoặc liên hệ qua số điện thoại và hotline của shop.
            </div>
            <div>Chúc quý khách có nhiều trải nghiệm thú vị trên website của cửa hàng.</div>
            <br />
            <div>Trân trọng cảm ơn!</div>
            <br />
            <br />
            <br />
            <div>Người gửi: AutumnShop</div>
            <br />
            <div>----------------------------------------------------------------------------</div>
            <div>CỬA HÀNG THỜI TRANG AUTUMN</div>
            <div>Địa chỉ: 180 Cao Lỗ, Phường 04, Quận 08, Tp.Hồ Chí Minh</div>
            <div>Điện thoại: 0969362xxx</div>
            <div>Hotline: (028)xxxxxxxx</div>
            <br />
            <br />

        </body>
    `;

}