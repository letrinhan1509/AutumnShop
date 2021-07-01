import AxiosAdmin from "./AxiosAdmin"

const admin = {
    getAll: () => {
        const url = "/";
        return AxiosAdmin.get(url);
    },
    getID: (id) => {
        const url = `/${id}`;
        return AxiosAdmin.get(url);
    },
    getTitle: () => {
        const url = "/trang-thai-don-hang";
        return AxiosAdmin.get(url);
    },
    getTitleID: (id) => {
        const url = `/trang-thai-don-hang/${id}`;
        return AxiosAdmin.get(url);
    },
    register: (values) => {
        const url = "/dang-ky";
        return AxiosAdmin.post(url, values);
    },
    login: (values) => {
        const url = "/dang-nhap";
        return AxiosAdmin.post(url, values);
    },
    updateInfo: (values) => {
        const url = "/cap-nhat-tai-khoan";
        return AxiosAdmin.put(url, values);
    },
    updateStatus: (values) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosAdmin.put(url, values);
    },
    updateSTTorder: (values) => {
        const url = "/cap-nhat/trang-thai-don-hang";
        return AxiosAdmin.put(url, values);
    },
    updatePassword: (values) => {
        const url = "/doi-mat-khau";
        return AxiosAdmin.put(url, values);
    }
};

export default admin;