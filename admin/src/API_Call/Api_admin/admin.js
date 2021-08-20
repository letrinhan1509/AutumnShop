import AxiosAdmin from "./AxiosAdmin"

const admin = {
    getAll: () => {
        const url = "/";
        return AxiosAdmin.get(url);
    },
    /* getAlls: (token) => {
        const url = "/";
        return AxiosAdmin.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }, */
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
    //thêm trạng thái đơn hàng
    addSTTorder: (values, token) => {
        const url = "/";
        return AxiosAdmin.post(url, values, token);
    },
    register: (values, token) => {
        const url = "/";
        return AxiosAdmin.post(url, values, token);
    },
    login: (values) => {
        const url = "/dev-dang-nhap";
        return AxiosAdmin.post(url, values);
    },
    updateInfo: (values, token) => {
        const url = "/";
        return AxiosAdmin.put(url, values, token);
    },
    updateStatus: (values, token) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosAdmin.put(url, values, token);
    },
    updateSTTorder: (values, token) => {
        const url = "/trang-thai-don-hang";
        return AxiosAdmin.put(url, values, token);
    },
    updatePassword: (values) => {
        const url = "/doi-mat-khau";
        return AxiosAdmin.put(url, values);
    },
    deleteAdmin: (id, token) => {
        const url = `/${id}`;
        return AxiosAdmin.delete(url, token);
    },
    deleteStatusOrder: (id) => {
        const url = `/trang-thai-don-hang/${id}`;
        return AxiosAdmin.get(url);
    }
};

export default admin;