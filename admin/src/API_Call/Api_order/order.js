import AxiosOrder from "./AxiosOrder"

const order = {
    getAll: () => {
        const url = "/";
        return AxiosOrder.get(url);
    },
    //(Chi tiết 1 đơn hàng theo mã đơn hàng)
    getOrderID: (id) => {
        const url = `/${id}`;
        return AxiosOrder.get(url);
    },
    //(Danh sách chi tiết của 1 đơn hàng theo mã đơn hàng)
    getDetailID: (id) => {
        const url = `/${id}/chi-tiet-dhang`;
        return AxiosOrder.get(url);
    },
    //(Danh sách đơn hàng theo mã khách hàng)
    getUserID: (id) => {
        const url = `/khach-hang/${id}`;
        return AxiosOrder.get(url);
    },
    //(Cập nhật trạng thái đơn hàng)
    updateStatus: (values) => {
        const url = "/";
        return AxiosOrder.put(url, values);
    },
    //(Thống kê doanh thu bán hàng và đơn hàng)
    statistical: () => {
        const url = "/thong-ke";
        return AxiosOrder.get(url);
    }
};

export default order;