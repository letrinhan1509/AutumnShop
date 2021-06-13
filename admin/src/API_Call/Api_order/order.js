import AxiosOrder from "./AxiosOrder"

const order = {
    getAll: () => {
        const url = "/danh-sach-dh";
        return AxiosOrder.get(url);
    },
    //(Đơn hàng theo mã đơn hàng)
    getOrderID: (idOrder) => {
        const url = `/id=:${idOrder}`;
        return AxiosOrder.get(url);
    },
    //(Chi tiết đơn hàng theo mã đơn hàng)
    getDetailID: (idOr) => {
        const url = `/chi-tiet-dhang/id=:${idOr}`;
        return AxiosOrder.get(url);
    },
    //(Danh sách đơn hàng theo mã khách hàng)
    getUserID: (idUser) => {
        const url = `/khach-hang/id=:${idUser}`;
        return AxiosOrder.get(url);
    },
    //(tạo 1 đơn hàng)
    addOrder: (values) => {
        const url = "/tao-don-hang";
        return AxiosOrder.post(url, values);
    },
    //(Cập nhật trạng thái đơn hàng)
    updateStatus: (values) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosOrder.put(url, values);
    }
};

export default order;