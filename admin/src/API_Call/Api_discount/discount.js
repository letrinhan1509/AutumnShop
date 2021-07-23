import AxiosDiscount from "./AxiosDiscount"

const discount = {
    getAll: () => {
        const url = "/";
        return AxiosDiscount.get(url);
    },
    //(Danh sách tất cả các khuyến mãi theo sản phẩm)
    getAllSale: () => {
        const url = "/san-pham";
        return AxiosDiscount.get(url);
    },
    //(Danh sách tất cả các khuyến mãi là voucher)
    getAllVoucher: () => {
        const url = "/voucher";
        return AxiosDiscount.get(url);
    },
    //(Chi tiết của 1 khuyến mãi theo mã khuyến mãi)
    getSaleID: (id) => {
        const url = `/${id}`;
        return AxiosDiscount.get(url);
    },
    //(Chi tiết của 1 voucher theo mã voucher)
    getVoucherID: (id) => {
        const url = `/voucher/${id}`;
        return AxiosDiscount.get(url);
    },
    //(Thêm 1 khuyến mãi theo sản phẩm)
    addSale: (values) => {
        const url = "/san-pham";
        return AxiosDiscount.post(url ,values);
    },
    //(Thêm 1 khuyến mãi là voucher)
    addVoucher: (values) => {
        const url = "/voucher";
        return AxiosDiscount.post(url ,values);
    },
    //(Cập nhật chương trình khuyến mãi theo sản phẩm)
    updateSale: (values) => {
        const url = "/sanpham";
        return AxiosDiscount.put(url ,values);
    },
    //(Cập nhật chương trình khuyến mãi là voucher)
    updateVoucher: (values) => {
        const url = "/voucher";
        return AxiosDiscount.put(url ,values);
    },
    //(Cập nhật trạng thái chương trình khuyến mãi)
    updateStatus: (values) => {
        const url = "/";
        return AxiosDiscount.put(url ,values);
    },
    //(Xoá chương trình khuyến mãi theo sản phẩm)
    deleteSale: (id) => {
        const url = `/${id}`;
        return AxiosDiscount.delete(url);
    },
};

export default discount;