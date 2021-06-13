import AxiosAdmin from "./AxiosAdmin"

const admin = {
    getAll: () => {
        const url = "/danh-sach";
        return AxiosAdmin.get(url);
    },
    get: (id) => {
        const url = `/admin-id/:${id}`;
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
    }
};

export default admin;