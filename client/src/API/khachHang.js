import AxiosKhachhang from "./AxiosKhachhang"

const khachHang = {
    getAll: () => {
        const url = '/danh-sach';
        return AxiosKhachhang.get(url);
    },
    get: (id) => {
        const url = `/kh-id/:${id}`;
        return AxiosKhachhang.get(url);
    },
    getRegister: (values) => {
        const url = "/dang-ky";
        return AxiosKhachhang.post(url, values);
    },
    getLogin: (values) => {
        const url = "/dang-nhap";
        return AxiosKhachhang.post(url, values);
    },
    getChangePass: (values) => {
        const url = "/doi-mat-khau";
        return AxiosKhachhang.post(url, values);
    },
    getForgotPass: (values) => {
        const url = "/quen-mat-khau";
        return AxiosKhachhang.post(url, values);
    },
    getUpdateInfo: (values) => {
        const url = "/cap-nhat-tai-khoan";
        return AxiosKhachhang.put(url, values);
    },
    getUpdateStatus: (values) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosKhachhang.put(url, values);
    }
};

export default khachHang;