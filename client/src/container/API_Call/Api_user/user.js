import AxiosUser from "./AxiosUser"

const user = {
    getAll: () => {
        const url = '/danh-sach';
        return AxiosUser.get(url);
    },
    get: (id) => {
        const url = `/kh-id/:${id}`;
        return AxiosUser.get(url);
    },
    register: (values) => {
        const url = "/dang-ky";
        return AxiosUser.post(url, values);
    },
    login: (values) => {
        const url = "/dang-nhap";
        return AxiosUser.post(url, values);
    },
    changePass: (values) => {
        const url = "/doi-mat-khau";
        return AxiosUser.post(url, values);
    },
    forgotPass: (values) => {
        const url = "/quen-mat-khau";
        return AxiosUser.post(url, values);
    },
    updateInfo: (values) => {
        const url = "/cap-nhat-tai-khoan";
        return AxiosUser.put(url, values);
    },
    updateStatus: (values) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosUser.put(url, values);
    }
};

export default user;