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
    register: (values) => {
        const url = "/";
        return AxiosAdmin.post(url, values);
    },
    login: (values) => {
        const url = "/dev-dang-nhap";
        return AxiosAdmin.post(url, values);
    },
    updateInfo: (values) => {
        const url = "/";
        return AxiosAdmin.put(url, values);
    },
    updateStatus: (values) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosAdmin.put(url, values);
    },
    updateSTTorder: (values) => {
        const url = "/trang-thai-don-hang";
        return AxiosAdmin.put(url, values);
    },
    updatePassword: (values) => {
        const url = "/doi-mat-khau";
        return AxiosAdmin.put(url, values);
    },
    deleteAdmin: (id) => {
        const url = `/${id}`;
        return AxiosAdmin.delete(url);
    }
};

export default admin;