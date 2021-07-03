import AxiosDiscount from "./AxiosDiscount"

const discount = {
    getAll: () => {
        const url = "/";
        return AxiosDiscount.get(url);
    },
    //(Danh sách tất cả các khuyến mãi là voucher)
    getAllVoucher: () => {
        const url = "/voucher";
        return AxiosDiscount.get(url);
    },
    //(Danh sách tất cả các khuyến mãi theo sản phẩm)
    getAllProduct: () => {
        const url = "/san-pham";
        return AxiosDiscount.get(url);
    },
    //(Chi tiết của 1 khuyến mãi theo mã khuyến mãi)
    getSaleID: (id) => {
        const url = `/voucher/${id}`;
        return AxiosDiscount.get(url);
    },
    //(Chi tiết của 1 voucher theo mã voucher)
    getVoucherID: (id) => {
        const url = `/check-voucher/${id}`;
        return AxiosDiscount.get(url);
    },
    //(Thêm 1 khuyến mãi theo sản phẩm)
    addSale: (values) => {
        const url = "/them-khuyen-mai/san-pham";
        return AxiosDiscount.post(url ,values);
    },
    //(Thêm 1 khuyến mãi là voucher)
    addSale: (values) => {
        const url = "/them-voucher";
        return AxiosDiscount.post(url ,values);
    },
    //(Cập nhật chương trình khuyến mãi theo sản phẩm)
    updateSale: (values) => {
        const url = "/cap-nhat";
        return AxiosDiscount.put(url ,values);
    },
    //(Cập nhật chương trình khuyến mãi theo voucher)
    updateSaleStatus: (values) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosDiscount.put(url ,values);
    },
    //(Xoá chương trình khuyến mãi theo sản phẩm)
    deleteSale: (id) => {
        const url = `/xoa-khuyen-mai/${id}`;
        return AxiosDiscount.delete(url);
    },
    //(Xoá chương trình khuyến mãi theo voucher)
    deleteVoucher: (id) => {
        const url = `/xoa-voucher/${id}`;
        return AxiosDiscount.delete(url);
    }
};

export default discount;